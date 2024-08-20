"use client";
import { useTheme } from "@/context/ThemeProvider";
import React from "react";
import Image from "next/image";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"; // for menu bar component froom shadcn
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="min-w-10 cursor-pointer">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              width={24}
              height={24}
              alt="sun"
              className="dark:invert"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              width={24}
              height={24}
              alt="moon"
              className="dark:invert"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="background-light900_dark200 absolute -right-12 mt-3 min-w-[120px] rounded border bg-light-900 py-2 dark:border-dark-400  dark:bg-dark-300">
          {themes.map(
            (
              item // imported themes which has info on different linnks on the toggle mode menu.
            ) => (
              // we iterated thru themes(array) using map function and displayed every item as menuItem
              <MenubarItem
                key={item.value}
                onClick={() => {
                  setMode(item.value); // mode will turn to value of item i.e: light or dark

                  if (item.value !== "system") {
                    localStorage.theme = item.value;
                  } else {
                    localStorage.removeItem("theme");
                  }
                }}
                className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              >
                <Image
                  src={item.icon}
                  width={16}
                  height={16}
                  alt={item.value}
                  className={`${mode === item.value && "active-theme"}`}
                />
                <p
                  className={`body-semibold text-light-500 ${mode === item.value ? "text-primary-500" : "text-dark100_light900"}`}
                >
                  {item.label}
                </p>
              </MenubarItem>
            )
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
