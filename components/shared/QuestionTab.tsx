import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface QuestionTabProps {
  userId: string;
  clerkId?: string | null;
  searchParams?: { [key: string]: string | undefined };
}

const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionTabProps) => {
  const { userQuestions, isNextQuestion } = await getUserQuestions({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  const pageNumber = searchParams?.page ? +searchParams?.page : 1;

  return (
    <>
      {userQuestions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          downvotes={question.downvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination pageNumber={pageNumber} isNext={isNextQuestion} />
      </div>
    </>
  );
};
export default QuestionTab;
