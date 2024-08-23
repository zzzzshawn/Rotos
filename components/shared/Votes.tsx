"use client";

import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import Metric from "./Metric";
import { Check, X } from "lucide-react";

interface Props {
  type: string;
  itemId: string;
  userId?: string;
  answers?: number;
  views?: number;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
  isAnswer?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  answers,
  views,
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved,
  isAnswer,
}: Props) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  const totalVotes = -formatAndDivideNumber(downvotes - upvotes);

  const handleSave = async () => {
    if (userId) {
      await toggleSaveQuestion({
        userId: JSON.parse(userId),
        questionId: JSON.parse(itemId),
        path: pathname,
      });

      return toast({
        icon: !hasSaved ? <Check className="text-green"/> : <X className="text-red"/>,
        title: `${
          !hasSaved ? "Saved" : "Unsaved"
        }`,
      });
    }

    return toast({
      icon: <X className="text-red"/>,
      title: "Login to save",
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        icon: <X className="text-red"/>,
        title: "Login to vote",
      });
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }

      return toast({
        icon: !hasupVoted ? <Check className="text-green"/> : <X className="text-red"/>,
        title: ` ${!hasupVoted ? "Upvoted" : "Vote removed"}`,
      });
    }

    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }

      // show a toast
      return toast({
        icon: !hasdownVoted ? <Check className="text-green"/> : <X className="text-red"/>,
        title: `${!hasdownVoted ? "Downvoted" : "Vote removed"}`,
      });
    }
  };

  // useEffect(() => {
  //   viewQuestion({
  //     questionId: JSON.parse(itemId),
  //     userId: userId ? JSON.parse(userId) : undefined,
  //   });
  // }, [itemId, userId, pathname, router]);

  return (
    <div className="flex gap-5">
      <div className="flex gap-1.5 md:gap-2.5">
        <div className="flex-center light-border-2 gap-1 rounded-md border p-1 px-2 md:px-3">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={22}
            height={22}
            className={`cursor-pointer ${!hasupVoted && "invert dark:invert-0"}`}
            alt="upvote"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center min-w-[18px] rounded-sm">
            <p
              className={`${totalVotes > 0 ? "text-[#08f71c]" : "text-red"}  text-[13px] font-semibold ${totalVotes === 0 && "text-dark400_light900"}`}
            >
              {totalVotes}
            </p>
          </div>
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={22}
            height={22}
            className={`cursor-pointer ${!hasdownVoted && "invert dark:invert-0"}`}
            alt="downvote"
            onClick={() => handleVote("downvote")}
          />
        </div>
        {!isAnswer && (
          <div className="flex w-max  items-center gap-1.5 max-sm:justify-start md:gap-2.5">
            <Metric
              imgUrl="/assets/icons/like.svg"
              alt="upvotes"
              value={formatAndDivideNumber(totalVotes)}
              title=""
              textStyles=" small-medium text-dark400_light800  "
            />
            <Metric
              imgUrl="/assets/icons/message.svg"
              alt="answers"
              value={formatAndDivideNumber(answers)}
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
        )}
        {/* <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            className={`cursor-pointer ${!hasdownVoted && "invert dark:invert-0"}`}
            alt="downvote"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div> */}
        {type === "Question" && (
          <Image
            src={
              hasSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
            width={22}
            height={22}
            className={`cursor-pointer ${!hasSaved && "invert dark:invert-0"}`}
            alt="star"
            onClick={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default Votes;
