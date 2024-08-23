import Link from "next/link";

import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";
import Image from "next/image";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  downvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="light-border-2 border-b px-6 sm:px-12 ">
      <div className="flex-between mt-6 w-full flex-wrap gap-3 ">
        <Link
          href={`/profile/${author.clerkId}`}
          className="flex items-center gap-2 px-2"
        >
          <div className="size-[22px] overflow-hidden rounded-full">
            <Image
              src={author.picture}
              height={22}
              width={22}
              alt={`author`}
              className="size-full object-cover"
            />
          </div>
          <p className="text-dark100_light900">{author.name}</p>
        </Link>

        <div className="flex-center gap-3">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-5 py-3 sm:py-5">
        <div className="w-[93%]">
          <Link href={`/question/${question._id}/#${_id}`} className="">
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className=" mb-3 flex w-full items-center justify-start">
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="like icon"
          value={formatAndDivideNumber(upvotes + downvotes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default AnswerCard;
