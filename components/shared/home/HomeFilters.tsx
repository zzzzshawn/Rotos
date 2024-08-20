"use client";

import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("filter");

  const [active, setActive] = useState(query || "");

  const handleFilterClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => {
        return (
          <Button
            key={item.value}
            onClickCapture={() => handleFilterClick(item.value)}
            className={`${
              active === item.value
                ? "bg-dark-4 font-bold text-light-1 hover:bg-dark-2 dark:bg-light-1 dark:text-dark-2 dark:hover:bg-light-1"
                : "bg-dark-4 text-light-1 hover:bg-light-800 dark:bg-light-1 dark:text-dark-2 dark:hover:bg-light-1 dark:hover:text-dark-2"
            } body-medium rounded-lg px-6 py-3 capitalize shadow-none`}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilters;
