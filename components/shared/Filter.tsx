"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramsFilter = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative  ${containerClasses} `}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramsFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular background-light850_dark100 text-dark100_light900 min-w-16 border-none px-5   sm:w-full`}
        >
          <div className=" flex-1 text-nowrap text-left">
            <SelectValue placeholder="Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark100_light900 small-regular border-none bg-light-1 dark:bg-dark-2  ">
          <SelectGroup>
            {filters.map((filter) => {
              return (
                <SelectItem
                  key={filter.value}
                  value={filter.value}
                  className="cursor-pointer focus:bg-light-2 dark:focus:bg-dark-4"
                >
                  {filter.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
