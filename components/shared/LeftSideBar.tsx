"use client";
import { sidebarLinks } from "@/constants";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

const LeftSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const [links, setLinks] = useState(sidebarLinks);

  useEffect(() => {
    if (userId) {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.route === "/profile"
            ? { ...link, route: `${link.route}/${userId}` }
            : link
        )
      );
    } else {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.route.includes("/profile")
            ? { ...link, route: "/profile" }
            : link
        )
      );

      // Redirect to home if on the profile page and userId is null
      if (pathname.includes("/profile")) {
        router.push("/"); // Redirect to home
      }
    }
  }, [userId, pathname, router]);

  return (
    <section className=" background-light850_dark100 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-x p-6 pt-36 max-sm:hidden lg:w-[280px]  ">
      <div className="flex flex-1 flex-col gap-4">
        {links.map((item) => {
          // takes array from sideBarLinks and creats a Link for each object in array for the sidebar

          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          // to set a link to Active. It is true when the path name includes value of item route AND when value of route must have some data

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? " primary-gradient rounded-lg text-light-1 dark:text-dark-1"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-2 bg-transparent px-4 py-3`}
            >
              {/* checks if the link is active using isActive if yes apply needed classes */}
              <Image
                src={item.imgURL}
                width={30}
                height={30}
                alt={item.label}
                className={`${isActive ? "dark:invert" : "invert-colors"}`}
              />
              <p
                className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedIn>
        <SignOutButton>
          <Button className="small-medium primary-gradient min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
            <Image
              src="/assets/icons/logout.svg"
              alt="login"
              width={26}
              height={26}
              className="invert dark:invert-0 lg:hidden "
            />
            <span className="text-light-1 dark:text-dark-1 max-lg:hidden">
              Sign-out
            </span>
          </Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        {/* if user is not logged in the content inside this will show */}
        <div className="flex flex-col gap-3">
          <SignInButton mode="modal">
            <Button className="small-medium primary-gradient min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={26}
                height={26}
                className="invert-0 dark:invert lg:hidden "
              />
              <span className="text-light-1 dark:text-dark-1 max-lg:hidden">
                LogIn
              </span>
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button className="small-medium light-border-2 primary-gradient  min-h-[41px] w-full rounded-lg px-4 py-3 text-light-1 shadow-none dark:text-dark-1">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="signup"
                width={26}
                height={26}
                className="invert-0 dark:invert lg:hidden "
              />
              <span className="max-lg:hidden">SignUp</span>
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSideBar;
