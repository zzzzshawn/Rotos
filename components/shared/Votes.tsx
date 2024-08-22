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

interface Props {
  type: string;
  itemId: string;
  userId?: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved,
}: Props) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  const totalVotes = - formatAndDivideNumber(downvotes - upvotes )


  const handleSave = async () => {
    if (userId) {
      await toggleSaveQuestion({
        userId: JSON.parse(userId),
        questionId: JSON.parse(itemId),
        path: pathname,
      });

      return toast({
        title: `Question ${
          !hasSaved ? "Saved in" : "Removed from"
        } your collection`,
        variant: !hasSaved ? "default" : "destructive",
      });
    }

    return toast({
      title: "Please login to save questions",
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please log in",
        description: "You must be logged in to perform this action.",
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
        title: `Upvote ${!hasupVoted ? "Successful" : "Removed"}`,
        variant: !hasdownVoted ? "default" : "destructive",
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
        title: `Downvote ${!hasdownVoted ? "Successful" : "Removed"}`,
        variant: !hasdownVoted ? "default" : "destructive",
      });
    }
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center light-border-2 gap-1.5 rounded-md border p-1">
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
          <div className="flex-center rounded-sm min-w-[15px]">
            <p className=" text-[13px] text-dark400_light900">
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
      </div>
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
  );
};

export default Votes;
