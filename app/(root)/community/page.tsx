import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Community page",
};

const Community = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });



  return (
    <div className="px-6 sm:px-12 ">
      <div className="light-border-2 mt-2 flex items-center justify-between gap-5 border-b  py-3 sm:items-center">
        <Filter
          filters={UserFilters}
          otherClasses="h-[30px] "
          containerClasses="flex"
          // unless you are on a device bigger keep filters hidden
        />
      </div>


      <h1 className="h1-bold text-dark100_light900 mt-5">Community</h1>

      <section className="mt-5  grid w-full grid-cols-2 gap-3 max-sm:gap-1 md:grid-cols-3 ">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>

      
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
};

export default Community;
