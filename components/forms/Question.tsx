"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QusetionsSchema } from "@/lib/validations";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "lucide-react";

interface Props {
  type?: string;
  mongoUserId: string;
  questionData?: string;
}

const Question = ({ type, mongoUserId, questionData }: Props) => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const questionDetails = questionData && JSON.parse(questionData || "");

  const groupTags = questionDetails?.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof QusetionsSchema>>({
    resolver: zodResolver(QusetionsSchema),
    defaultValues: {
      title: questionDetails?.title || "",
      explanation: questionDetails?.content || "",
      tags: groupTags || [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QusetionsSchema>) {
    setIsSubmitting(true);
    try {
      if (type === "Edit") {
        await editQuestion({
          questionId: questionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });

        router.push(`/question/${questionDetails._id}`);
      } else {
        // make a call to API -> to create a question
        // conatins all form data
        // navigate to home page
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });
        // navigate to home
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          // check to see that tagVlaue does not already exist
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-dark100_light900 mt-2.5">
                Be specific and ask the question as if you&apos;re asking it to
                another person
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(_evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur}
                  // ⬆️⬆️ function tht runs when u exit the editor
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={questionDetails?.content || ""}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist | ",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: "oxide",
                    content_css: "light",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular text-dark400_light800 mt-2.5">
                Include as many details as possible. The more you tell us, the
                easier it will be for
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "Edit"}
                    placeholder="Add tags..."
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5 ">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium primary-gradient  text-light400_light500 text-light900_dark100 flex items-center justify-center gap-2 rounded-md border-none p-2 capitalize"
                          onClick={() =>
                            type !== "Edit"
                              ? handleTagRemove(tag, field)
                              : () => {}
                          }
                        >
                          {tag}
                          {type !== "Edit" && (
                            <Image
                              src="/assets/icons/close.svg"
                              alt="close"
                              className="cursor-pointer object-contain invert dark:invert-0"
                              width={12}
                              height={12}
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular text-dark100_light900 mt-2.5">
                Add tags to help others find your question. Press Enter atfer typing each tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient text-light900_dark100 w-fit "
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              {type === "Edit" ? (
                <>
                  <Loader className="text-light900_dark100 my-2 size-4 animate-spin" />
                  Editing...
                </>
              ) : (
                <>
                  <Loader className="text-light900_dark100 my-2 size-4 animate-spin" />
                  Posting...
                </>
              )}
            </>
          ) : (
            <>{type === "Edit" ? "Edit question" : "Post question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
