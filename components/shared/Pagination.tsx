"use client";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const nextPageNo = direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNo.toString(),
    });
    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className=" hover: flex cursor-pointer items-center justify-center gap-1 "
      >
        <ChevronLeft className="text-dark200_light800 w-3" />
        <p className="text-dark200_light800 text-base hover:underline">Prev</p>
      </Button>
      <div className="primary-gradient flex items-center justify-center rounded-md px-3.5 py-2">
        <p className="body-semibold text-light900_dark100">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="flex cursor-pointer items-center justify-center gap-1"
      >
        <p className="body-medium text-dark200_light800 hover:underline">
          Next
        </p>
        <ChevronRight className="text-dark200_light800 w-3" />
      </Button>
    </div>
  );
};
export default Pagination;
