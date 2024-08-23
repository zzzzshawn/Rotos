import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getTopQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.actions";

const RightSideBar = async () => {
  const topQuestions = await getTopQuestions();
  const popularTags = await getTopPopularTags();

  return (
    <section className=" background-light850_dark100 light-border sticky right-0 top-0 flex h-screen w-[310px]  flex-col overflow-y-auto p-6 pt-36 max-xl:hidden">
      <div className="light-border-2 rounded-lg border px-3 py-4">
        <h3 className="h3-bold text-dark200_light900 ">Top questions</h3>
        <div className="mt-7 flex w-full flex-col gap-2">
          {topQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className=" flex cursor-pointer items-center justify-between gap-3 rounded-md  p-2 hover:bg-zinc-200/30 dark:hover:bg-dark-4/60"
            >
              <p className="text-dark100_light900 line-clamp-2 w-full text-sm underline underline-offset-4">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="light-border-2 mt-4 rounded-lg border px-3 py-4">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
