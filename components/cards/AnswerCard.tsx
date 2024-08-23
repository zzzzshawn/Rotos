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
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="">
      <div className="flex-between mt-6 w-full flex-wrap gap-3 px-4">
        <Link
          href={`/profile/${author.clerkId}`}
          className="flex items-center gap-2 px-2"
        >
          <div className="overflow-hidden w-[22px] h-[22px] rounded-full">
            <Image
              src={author.picture}
              height={22}
              width={22}
              alt={`author`}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-dark100_light900">{author.name}</p>
        </Link>

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-around gap-5">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link
            href={`/question/${question._id}/#${_id}`}
            className="rounded-[10px] px-11 py-9"
          >
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
    </div>
  );
};

export default AnswerCard;
