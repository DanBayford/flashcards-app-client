import { useQuestions } from "@/hooks/useQuestions";
import { QuestionCard } from "./QuestionCard";
import { PaginationButtons } from "../PaginationButtons";
import { Spinner } from "../ui/spinner";

export const QuestionsList = ({
  pageNumber,
  categoryIds,
  hideMastered,
}: {
  pageNumber: number;
  categoryIds: string[];
  hideMastered: boolean;
}) => {
  const { questions, questionsLoading, questionsError, paginationData } =
    useQuestions(pageNumber, categoryIds, hideMastered);

  if (questionsLoading) {
    return (
      <div className="col-span-full flex flex-col gap-4 sjustify-center items-center mt-30">
        <Spinner className="size-8" />
        <p>Loading questions...</p>
      </div>
    );
  }

  if (questionsError) {
    return (
      <p className="col-span-full mt-4 text-center">Error loading questions</p>
    );
  }

  return (
    <section className="col-span-full px-2 flex flex-col gap-2">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions
          ? questions.map((q) => <QuestionCard key={q.id} question={q} />)
          : null}
      </ul>
      {paginationData ? (
        <PaginationButtons paginationData={paginationData} />
      ) : null}
    </section>
  );
};
