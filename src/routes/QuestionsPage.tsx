import { useSearchParams, Link } from "react-router";
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
      <div className="col-span-full flex justify-between items-center">
        <QuestionsListControls />
        <Link
          to="/categories"
          className="h-[50px] px-4 py-3 flex justify-center items-center rounded-full bg-yellow-400 font-semibold hover:bg-yellow-400/80 hover:cursor-pointer"
        >
          Categories
        </Link>
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
