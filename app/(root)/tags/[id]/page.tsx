import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";

const TagDetails = async ({ params, searchParams }: URLProps) => {
  const { tagTitle, questions, isNext } = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams?.page ? +searchParams.page : 1,
    searchQuery: searchParams?.q,
  });


  return (
    <div className="mt-10 px-6 sm:px-12">
      <h1 className="h1-bold text-dark100_light900 light-border-2 border-b">
        {tagTitle}
      </h1>


      {/* Card section */}
      <div className="mt-5 flex flex-col gap-6">
        {questions.length > 0 ? (
          questions?.map((question: any) => (
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
            title="Ummm.. no questions on this tags yet..."
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </div>
  );
};
export default TagDetails;
