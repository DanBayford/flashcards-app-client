import { useSearchParams } from "react-router";
import {
  QuestionForm,
  QuestionsList,
  QuestionsListControls,
} from "@/components/questions";

const QuestionsPage = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page") || "1");
  const categoryIds = searchParams.getAll("categoryId") || [];
  const hideMastered = !!searchParams.get("hideMastered") || false;

  return (
    <>
      <QuestionForm />
      <div className="col-span-full">
        <QuestionsListControls />
      </div>
      <QuestionsList
        pageNumber={pageNumber}
        categoryIds={categoryIds}
        hideMastered={hideMastered}
      />
    </>
  );
};

export default QuestionsPage;
