import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";
import EditDeleteAction from "./EditDeleteAction";

interface Props {
  questionId: string;
  userId: string;
  clerkId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  clerkId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-3">
      <div
        className={
          result.answers.length > 0
            ? "flex items-center justify-start gap-3"
            : "hidden"
        }
      >
        <h3 className="text-dark100_light900">Answers</h3>
        <Filter
          filters={AnswerFilters}
          containerClasses="border rounded-md light-border"
        />
      </div>

      <div className="">
        {result.answers.map((answer) => (
          <div key={answer._id} className="py-5">
            <div className="mb-8 flex flex-row items-center justify-between gap-5 sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <div className="size-[18px] overflow-hidden rounded-full">
                  <Image
                    src={answer.author.picture}
                    alt="pfp"
                    width={18}
                    height={18}
                    className="rounded-full object-cover size-full max-sm:mt-0.5"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                    <span className="mx-2 max-sm:hidden">
                      {" "}
                      {getTimestamp(answer.createdAt)}{" "}
                    </span>
                  </p>
                </div>
              </Link>
              <div className="flex items-center justify-end gap-2.5">
                <Votes
                  type="Answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasdownVoted={answer.downvotes.includes(userId)}
                  isAnswer={true}
                />
                {clerkId && clerkId === answer.author.clerkId && (
                  <div className="light-border-2 rounded-md border px-2 py-1 hover:bg-light-3/40 dark:hover:bg-dark-4/70">
                    <EditDeleteAction
                      type="Answer"
                      itemId={JSON.stringify(answer._id)}
                    />
                  </div>
                )}
              </div>
            </div>
            <ParseHTML
              data={answer.content}
              classname={"border-b light-border-2"}
            />
          </div>
        ))}
      </div>
      <div className="mt-5 w-full">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
