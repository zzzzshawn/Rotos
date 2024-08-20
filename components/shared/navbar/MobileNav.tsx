"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import RenderTag from "../RenderTag";

interface UserParams {
  user?: {
    name?: string;
    username?: string;
  };
  popularTags?: any[] | undefined;
}

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="light-border mt-5 flex flex-col gap-2 border-t pt-4">
      <h2 className="text-dark300_light900 base-bold">Discover</h2>
      {sidebarLinks.map((item) => {
        // takes array from sideBarLinks and creats a Link for each object in array for the sidebar

        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        // to set a link to Active. It is true when the path name includes value of item route AND when value of route must have some data

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light900_dark100 rounded-lg "
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent px-4 py-1.5`}
            >
              {/* checks if the link is active using isActive if yes apply needed classes */}
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${isActive ? "dark:invert" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = ({ user, popularTags }: UserParams) => {
  const tags =
    popularTags?.length > 10 ? popularTags?.slice(0, 10) : popularTags || [];

  return (
    <Sheet>
      <SheetTrigger asChild className="min-w-9">
        {/* acts as child */}
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light850_dark100 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          {/* shows logo in mobile nav */}
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevThreads"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev <span className="text-primary-500">Threads</span>
          </p>
        </Link>
        <SignedIn>
          <div className="light-border background-light850_dark100 mt-8 flex w-full items-center justify-start gap-5 rounded-full border p-1 shadow-lg dark:shadow-md dark:shadow-zinc-900">
            {/* <SignedIn> is a clerk functionality that checks if user is authenticated, if yes then show content inside <SignedIn>   */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  // sets height and width for user profile button
                  avatarBox: "size-14",
                },
                variables: {
                  colorPrimary: "#ff7000",
                },
              }}
            />

            <div className="text-dark100_light900 flex flex-col">
              <p className="base-bold">{user?.name}</p>
              <p className="dark:text-zinc-600">@{user?.username}</p>
            </div>
          </div>
        </SignedIn>
        <div className="flex h-full flex-col justify-start gap-8 pb-10 ">
          <SheetClose asChild className="">
            {/* nav links */}
            <NavContent />
          </SheetClose>

          <SignedIn>
            <div className=" light-border border-t pt-5">
              <h2 className="text-dark300_light900 base-bold">Popular Tags</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags?.map((tag) => (
                  <SheetClose key={tag._id} asChild>
                    <RenderTag
                      _id={tag._id}
                      name={tag.name}
                      totalQuestions={tag.numberOfQuestions}
                    />
                  </SheetClose>
                ))}
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            {/* if user is not logged in the content inside this will show */}
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium primary-gradient min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
                    <span className="text-light-1 dark:text-dark-1">LogIn</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 primary-gradient  min-h-[41px] w-full rounded-lg px-4 py-3 text-light-1 shadow-none dark:text-dark-1">
                    <span className="text-light-1 dark:text-dark-1">
                      SignUp
                    </span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
