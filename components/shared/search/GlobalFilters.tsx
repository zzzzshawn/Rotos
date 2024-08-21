"use client";

import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");

  const handleFilterClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex flex-col items-start gap-2 px-2 max-sm:hidden">
      <p className="text-dark400_light900 text-sm font-light">Filters: </p>
      <div className="flex flex-wrap gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`text-dark100_light900 rounded-md border border-light-3 bg-transparent  px-2 py-1 font-medium  hover:border-zinc-600 dark:border-dark-4 dark:hover:border-zinc-600 ${
              active === item.value
                ? "border-zinc-600 dark:border-zinc-600"
                : ""
            }`}
            onClick={() => handleFilterClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default GlobalFilters;
