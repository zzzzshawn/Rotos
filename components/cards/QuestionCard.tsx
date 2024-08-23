import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import { getTimestamp } from "@/lib/utils";
import { auth, SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";
import Image from "next/image";
import Votes from "../shared/Votes";
import { getUserById } from "@/lib/actions/user.action";

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
  upvotes: any[];
  downvotes: any[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = async(props: QuestionProps) => {
  const {
    _id,
    clerkId,
    title,
    tags,
    author,
    upvotes,
    downvotes,
    views,
    answers,
    createdAt,
  } = props;

  const showActionButtons = clerkId && clerkId === author.clerkId;
  const { userId} = auth(); // user from clerkdb
  let mongoUser;
  if (userId) {
    mongoUser = await getUserById({ userId });
   // gets user from mongodb
  }

  return (
    <div className="card-wrapper light-border-2 border-b px-6 pb-6 pt-5 xs:mt-1 sm:px-10 ">
      <div className="flex flex-col items-start justify-between gap-4">
        <div className="flex-between w-full">
          <Link href={`/profile/${author.clerkId}`} className="flex items-center gap-2  px-2" >
            <Image
              src={author.picture}
              height={22}
              width={22}
              alt={`author`}
              className={`object-contain rounded-full`}
            />
            <p className="text-dark100_light900">{author.name}</p>
          </Link>
          <span className="subtle-regular text-dark400_light700 mt-2 line-clamp-1 flex">
            {getTimestamp(createdAt)}
          </span>
        </div>
        <div className="flex-between w-full">
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1 ">
              {title}
            </h3>
          </Link>
          {/* if signed in add edit , delete options */}
          <SignedIn>
            {showActionButtons && (
              <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </div>
      </div>

      <div className="md:flex-between flex-col md:flex-row flex gap-2 mt-6 w-full">
        <div className="flex md:w-2/3  flex-wrap gap-2">
          {tags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>
        {/* <div className="flex w-max  items-center justify-center gap-2 max-sm:justify-start">
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
        </div> */}
        <Votes 
          type="Question"
          itemId={JSON.stringify(_id)}
          userId={JSON.stringify(mongoUser?._id)}
          answers={answers.length}
          views={views}
          upvotes={upvotes.length}
          hasupVoted={upvotes.includes(mongoUser?._id)}
          downvotes={downvotes?.length}
          hasdownVoted={downvotes?.includes(mongoUser?._id)}
          hasSaved={mongoUser?.saved.includes(_id)}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
