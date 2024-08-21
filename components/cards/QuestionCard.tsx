import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = (props: QuestionProps) => {
  const {
    _id,
    clerkId,
    title,
    tags,
    author,
    upvotes,
    views,
    answers,
    createdAt,
  } = props;

  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper light-border-2 border-b px-6 pb-6 pt-5 xs:mt-1 sm:px-10 ">
      <div className="flex flex-col items-start justify-between gap-5">
        <div className="flex-between w-full">
          <Metric
            imgUrl={author.picture}
            alt="user"
            value={author.name}
            title={``}
            href={`/profile/${author._id}`}
            isAuthor
            textStyles="text-dark400_light700  "
          />
          <span className="subtle-regular text-dark400_light700 mt-2 line-clamp-1 flex">
            {getTimestamp(createdAt)}
          </span>
        </div>
        <div className="w-full">
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1 ">
              {title}
            </h3>
          </Link>
        </div>

        {/* if signed in add edit , delete options */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full">
        <div className="flex w-2/3  flex-wrap gap-2">
          {tags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>
        <div className="flex w-max  items-center gap-3 max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title=""
            textStyles=" small-medium text-dark400_light800  "
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="answers"
            value={formatAndDivideNumber(answers.length)}
            title=""
            textStyles=" small-medium text-dark400_light800  "
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title=""
            textStyles=" small-medium text-dark400_light800  "
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
