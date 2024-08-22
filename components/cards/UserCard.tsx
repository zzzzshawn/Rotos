import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  return (
    <Link href={`/profile/${user.clerkId}`} className="">
      <div className="background-light850_dark100 light-border-2 flex min-h-[260px] w-full flex-col items-center justify-center rounded-sm border hover:bg-zinc-200/10 dark:hover:bg-zinc-900/60">
        <Image
          src={user.picture}
          alt="user pfp"
          width={100}
          height={100}
          className="mb-3 rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1 ">
            {user.name}
          </h3>
          <p className="body-regular text-variant ">@{user.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
