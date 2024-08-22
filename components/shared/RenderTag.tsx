import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
  classname?: string;
}

const RenderTag = ({ _id, name, totalQuestions, showCount, classname }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className={`subtle-medium text-dark100_light900 text-nowrap rounded-md border border-light-3  bg-transparent px-4 py-2  uppercase hover:border-zinc-600 dark:border-dark-4 dark:hover:border-zinc-600 ${classname} `}>
        {name}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
