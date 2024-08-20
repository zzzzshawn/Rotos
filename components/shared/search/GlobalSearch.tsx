"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get("global");

  const [search, setSearch] = useState(query || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // close modal useEffect
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsModalOpen(false);
        setSearch("");
      }
    };

    setIsModalOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, search, router, pathname, searchParams]);

  return (
    <div
      ref={searchContainerRef}
      className="relative w-full max-w-3xl "
    >
      <div className="background-light800_darkgradient light-border relative flex grow items-center gap-1 rounded-xl border px-4 ">
        <Image
          src="/assets/icons/search.svg"
          width={20}
          height={20}
          alt="search"
          className="cursor-pointer dark:invert"
        />
        <Input
          type="text"
          value={search}
          placeholder="search globally"
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isModalOpen) {
              setIsModalOpen(true);
            }
            if (e.target.value === "" && isModalOpen) {
              setIsModalOpen(false);
            }
          }}
          className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none "
        />
      </div>
      {isModalOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
