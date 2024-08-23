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
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { mobileSidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface UserParams {
  user?: {
    name?: string;
    username?: string;
    picture?: any;
  };
  popularTags?: string | undefined;
}

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="light-border mt-5 flex flex-col gap-3 border-t pt-4">
      <h2 className="text-dark300_light900 base-bold">Discover</h2>
      {mobileSidebarLinks.map((item) => {
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
                width={30}
                height={30}
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
  const { userId } = useAuth();
  const pTags = popularTags ? JSON.parse(popularTags) : [];
  const tags = pTags?.length > 10 ? pTags?.slice(0, 10) : pTags || [];

  return (
    <Sheet>
      <SheetTrigger asChild className="min-w-8">
        {/* acts as child */}
        <Image
          src="/assets/icons/hamburger.svg"
          width={32}
          height={32}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light850_dark100 border-none font-spaceGrotesk"
      >
        <Link href="/" className="flex items-center gap-1">
          {/* shows logo in mobile nav */}
          <Image
            src="/site-logo.svg"
            width={28}
            height={28}
            alt="Rotōs"
            className="size-9 invert-0 dark:invert"
          />
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 ">
            Rotōs
          </p>
        </Link>

        <SignedIn>
          <SheetClose asChild>
            <Link href={`/profile/${userId}`}>
              <div className="light-border-2 background-light850_dark100 mt-8 flex w-full items-center justify-start gap-5 rounded-lg border p-3  shadow-lg dark:shadow-lg dark:shadow-zinc-900">
                {/* <SignedIn> is a clerk functionality that checks if user is authenticated, if yes then show content inside <SignedIn>   */}
                <div className="size-[66px] overflow-hidden rounded-full ">
                  <Image
                    src={user?.picture}
                    height={66}
                    width={66}
                    alt={`author`}
                    className="size-full object-cover"
                  />
                </div>
                <div className="text-dark100_light900 flex flex-col">
                  <p className="base-bold">{user?.name}</p>
                  <p className="dark:text-zinc-600">@{user?.username}</p>
                </div>
              </div>
            </Link>
          </SheetClose>
        </SignedIn>

        <div className="flex  flex-col justify-between gap-8 pb-10 ">
          <div className="">
            <SheetClose asChild className="">
              {/* nav links */}
              <NavContent />
            </SheetClose>

            <SignedIn>
              {tags && (
                <div className=" light-border border-t pt-5">
                  <h2 className="text-dark300_light900 base-bold">Tags</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags?.map((tag: any) => (
                      <SheetClose asChild key={tag._id}>
                        <Link
                          href={`/tags/${tag._id}`}
                          className="flex justify-between gap-2"
                        >
                          <Badge className="subtle-medium text-dark100_light900 rounded-md border border-light-3 bg-transparent  px-4 py-2 uppercase  dark:border-dark-4">
                            {tag.name}
                          </Badge>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              )}
            </SignedIn>
          </div>

          <SignedIn>
            <SignOutButton>
              <Button className="small-medium primary-gradient flex min-h-[41px] w-full items-center justify-center gap-2 rounded-lg px-4 py-3 shadow-none ">
                <Image
                  src="/assets/icons/logout.svg"
                  alt="login"
                  width={26}
                  height={26}
                  className="invert dark:invert-0 lg:hidden "
                />
                <span className="text-light-1 dark:text-dark-1 ">Sign-out</span>
              </Button>
            </SignOutButton>
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
