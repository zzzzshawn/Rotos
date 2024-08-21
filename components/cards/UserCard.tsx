import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    picture: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="max-sm:min-w-full sm:w-2/5"
    >
      <div className="background-light850_dark100 light-border-2 flex w-full flex-col items-center justify-center rounded-2xl border px-3 py-8">
        <Image
          src={user.picture}
          alt="user pfp"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1 ">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2 ">
            @{user.username}
          </p>
        </div>

        <div className="mt-5 w-full ">
          {interactedTags.length > 0 ? (
            <div className="flex-center mx-auto w-full gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <div className="flex-center w-full">
              <Badge className="subtle-medium text-dark100_light900 rounded-md border border-light-3 bg-transparent  px-4 py-2 uppercase  hover:border-zinc-600 dark:border-dark-4 dark:hover:border-zinc-600 ">
                No tags yet
              </Badge>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
