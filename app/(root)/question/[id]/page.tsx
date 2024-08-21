import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { auth, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Question details",
  description: "Question page of Dev Overflow",
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
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId }); // gets user from mongodb
  }

  return (
    <div className="sm:px-12 px-6 mt-8">
      <div className="flex-start w-full flex-col">
        <div className="mb-3 flex w-full justify-between flex-row items-center">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="user pfp"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700 ">
              {result.author.name}
            </p>
          </Link>
          <Metric
            imgUrl="/assets/icons/clock.svg"
            alt="clock"
            value={` asked ${getTimestamp(result.createdAt)}`}
            title=""
            textStyles=" small-medium text-dark400_light800  "
          />
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="sm:mb-5 mb-2 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatAndDivideNumber(result.answers.length)}
          title=" "
          textStyles=" small-medium text-dark400_light800  "
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          title=""
          textStyles=" small-medium text-dark400_light800  "
        />
      </div>

      <ParseHTML data={result.content} />
      <div className="flex-between w-full border-b pb-3 light-border-2">
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
        <div className="flex w-max  items-center gap-3 max-sm:justify-start">
          <Votes
            type="Question"
            itemId={JSON.stringify(result._id)}
            userId={JSON.stringify(mongoUser?._id)}
            upvotes={result.upvotes.length}
            hasupVoted={result.upvotes.includes(mongoUser?._id)}
            downvotes={result.downvotes.length}
            hasdownVoted={result.downvotes.includes(mongoUser?._id)}
            hasSaved={mongoUser?.saved.includes(result._id)}
          />
        </div>
      </div>

      {clerkId ? (
        <SignedIn>
          <AllAnswers
            questionId={result._id}
            userId={mongoUser._id}
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
            <div className="w-full mt-3">
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
