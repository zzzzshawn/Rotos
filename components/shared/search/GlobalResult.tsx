"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";
import { ChevronRightIcon, Loader } from "lucide-react";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState([
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  // global search useEffect
  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        // fetch everything everywhere all at once => globalSearch, filter
        const res = await globalSearch({
          query: global,
          type,
        });

        setResult(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;

      case "answer":
        return `/question/${id}`;

      case "tag":
        return `/tags/${id}`;

      case "user":
        return `/profile/${id}`;

      default:
        return "/";
    }
  };

  return (
    <div className="background-light850_dark100 absolute top-full z-10 mt-3 w-full rounded-xl py-5 shadow-lg dark:border dark:border-dark-4 dark:shadow-light-100">
      <p className="text-dark400_light900 paragraph-semibold px-5">
        <GlobalFilters />
      </p>
      <div className="my-4 h-px bg-light-700/50 dark:bg-dark-500/50 max-sm:hidden" />
      <div className="space-y-2.5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Matches
        </p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <Loader className="text-dark400_light900 my-2 size-10 animate-spin" />
            <p className="text-dark200_light800 body-regular">Searching..</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="mx-2 flex w-[97%] cursor-pointer items-start gap-3 rounded-lg px-5 py-2.5 hover:bg-zinc-100/50 hover:dark:bg-dark-500/50 max-sm:px-1"
                >
                  <ChevronRightIcon className="dark:invert max-sm:min-w-5" />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-dark200_light800 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Result not found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default GlobalResult;
