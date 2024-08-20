"use client";
import { sidebarLinks } from "@/constants";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";

const LeftSideBar = () => {
  const pathname = usePathname();
  const {userId} = useAuth()

  return (
    <section className=" background-light850_dark100 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[280px]  ">
      <div className="flex flex-1 flex-col gap-3">
        {sidebarLinks.map((item) => {
          // takes array from sideBarLinks and creats a Link for each object in array for the sidebar

          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          // to set a link to Active. It is true when the path name includes value of item route AND when value of route must have some data

          if(item.route === '/profile'){
            if(userId){
              item.route = `${item.route}/${userId}`
            } else{
              return null
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
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              {/* checks if the link is active using isActive if yes apply needed classes */}
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${isActive ? "dark:invert" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        {/* if user is not logged in the content inside this will show */}
        <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
                <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden "
                />
                <span className="primary-text-gradient max-lg:hidden">LogIn</span>
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="signup"
                width={20}
                height={20}
                className="invert-colors lg:hidden "
                />
              <span className="max-lg:hidden">SignUp</span>
              </Button>
            </Link>
         </div>
      </SignedOut>
    </section>
  );
};

export default LeftSideBar;
