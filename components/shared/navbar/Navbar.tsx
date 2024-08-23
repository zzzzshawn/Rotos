import { auth, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";
import { getUserById } from "@/lib/actions/user.action";
import { getAllTags } from "@/lib/actions/tag.actions";

const Navbar = async () => {
  const { userId } = auth();

  const allTags = await getAllTags({});

  const result = await getUserById({ userId });
  const user = {
    name: result?.name,
    username: result?.username,
    picture: result?.picture,
  };

  return (
    <nav className="flex-between fixed left-1/2 top-2 z-50 w-[95%] max-w-6xl -translate-x-1/2 gap-5 rounded-xl  bg-zinc-300/40 px-4 py-2 shadow-light-300 backdrop-blur-md backdrop-saturate-150 dark:bg-dark-4/70 dark:shadow-none max-sm:w-[98%] max-sm:gap-1 sm:px-7">
      <Link href="/">
        <div className="flex min-w-11 items-center gap-1 sm:min-w-32">
          <Image
            src="/site-logo.svg"
            width={28}
            height={28}
            alt="Rotōs"
            className="size-9 invert-0 dark:invert"
          />
          <p className="max-sm::hidden font-spaceGrotesk text-2xl text-dark-100 dark:text-light-900 max-sm:hidden">
            Rotōs
          </p>
        </div>
      </Link>
      <GlobalSearch />
      <div className="flex-center gap-3 ">
        <Theme />
        <MobileNav user={user} popularTags={JSON.stringify(allTags?.tags)} />
      </div>
      <div className="flex-between gap-5 max-sm:hidden">
        <SignedIn>
          {/* <SignedIn> is a clerk functionality that checks if user is authenticated, if yes then show content inside <SignedIn>   */}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                // sets height and width for user profile button
                avatarBox: "size-9",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
