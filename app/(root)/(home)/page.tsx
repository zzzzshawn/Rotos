import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  let result;

  // ? fetch recomended questions

  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams?.q,
        page: searchParams?.page ? +searchParams?.page : 1,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }
  

  return (
    <div className="px-2 sm:px-12">
      {/* <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        "!" in class makes it important
        <Link href={`/ask-question`} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient text-light900_dark100 min-h-[46px] px-4 py-3">
            Ask a Question
          </Button>
        </Link>
      </div> */}

      <div className="light-border-2 mt-2 flex items-center justify-between gap-5 border-b  py-3 sm:items-center">
        {/* <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions..."
          otherClasses="flex-1"
        /> */}

        <Filter
          filters={HomePageFilters}
          otherClasses="h-[30px] "
          containerClasses="flex w"
          // unless you are on a device bigger keep filters hidden
        />

        <Link href={`/ask-question`} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient text-light900_dark100 px-4">
            Ask a Question
          </Button>
        </Link>
      </div>

      {/* <HomeFilters /> */}

      <div className="mt-2 flex w-full flex-col">
        {result.questions.length > 0 ? (
          // displaying cards
          result.questions.map((question) => (
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
            title="Well... idk man no active users exist on here.. "
            description="Be the first to break the silence 🚀"
            link="/ask-question"
            linkTitle="Ask a Question"
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
