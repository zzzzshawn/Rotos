import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp } from "@/lib/utils";
import { auth, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Viewed from "@/components/shared/Viewed";

export const metadata: Metadata = {
  title: "Question details",
  description: "Question page ",
};

interface QuestionDetailsProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
}

const page = async ({ params, searchParams }: QuestionDetailsProps) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth(); // user from clerkdb
  let mongoUser: any;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
    // gets user from mongodb
  }

  return (
    <div className="mt-8 px-6 sm:px-12">
      <div className="flex-start w-full flex-col">
        <div className="mb-3 flex w-full flex-row items-center justify-between">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <div className="size-[22px] overflow-hidden rounded-full">
              <Image
                src={result.author.picture}
                alt="user pfp"
                width={22}
                height={22}
                className="size-full object-cover"
              />
            </div>
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>

          <span className="subtle-regular text-dark400_light700 mt-2 line-clamp-1 flex">
            {getTimestamp(result.createdAt)}
          </span>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <ParseHTML data={result.content} />
      <div className="md:flex-between mt-6 flex w-full flex-col items-start gap-2 md:flex-row">
        <div className="flex w-2/3  flex-wrap gap-2">
          {result.tags.map((tag: any) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              showCount={false}
            />
          ))}
        </div>
        <div className="flex w-full items-center gap-3 max-sm:justify-start">
          <Votes
            type="Question"
            itemId={JSON.stringify(result._id)}
            userId={JSON.stringify(mongoUser?._id)}
            answers={result.answers.length}
            views={result.views}
            upvotes={result.upvotes.length}
            hasupVoted={result.upvotes.includes(mongoUser?._id)}
            downvotes={result.downvotes.length}
            hasdownVoted={result.downvotes.includes(mongoUser?._id)}
            hasSaved={mongoUser?.saved.includes(result._id)}
          />
          <Viewed
            itemId={JSON.stringify(result._id)}
            userId={JSON.stringify(mongoUser?._id)}
          />
        </div>
      </div>

      {clerkId ? (
        <SignedIn>
          <AllAnswers
            questionId={result._id}
            userId={mongoUser._id}
            clerkId={mongoUser.clerkId}
            totalAnswers={result.answers.length}
            page={searchParams?.page ? +searchParams?.page : 1}
            filter={searchParams?.filter}
          />

          <Answer
            question={result.content}
            questionId={JSON.stringify(result._id)}
            authorId={JSON.stringify(mongoUser?._id)}
          />
        </SignedIn>
      ) : (
        <SignedOut>
          <Link href="/sign-in">
            <div className="mt-3 w-full">
              <Button className="primary-gradient text-light900_dark100 mx-auto ">
                Sign in to contribute
              </Button>
            </div>
          </Link>
        </SignedOut>
      )}
    </div>
  );
};

export default page;
