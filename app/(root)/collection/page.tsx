import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

import { QuestionFilters } from "@/constants/filters";

import { SearchParamsProps } from "@/types";

import { auth } from "@clerk/nextjs";

import type { Metadata } from "next";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getSavedQuestions } from "@/lib/actions/user.action";
import Pagination from "@/components/shared/Pagination";

export const metadata: Metadata = {
  title: "Collections",
  description: "Collections page",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div className="mt-10 px-6 sm:px-12">
      <h1 className="h1-bold text-dark100_light900">Collections</h1>
      <div className="mt-6 flex justify-between gap-2 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search in collections..."
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-5 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="Well... you haven't saved anything yet.."
            description="💡 When you find a question you want to keep handy, just click the save button, and it'll appear here."
            link="/"
            linkTitle="Home"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
}
