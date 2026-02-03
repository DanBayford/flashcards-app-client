import { QuizContainer, QuizStatistics } from "@/components/quiz";
import { QuizProvider } from "@/contexts/QuizContextProvider";

const QuizPage = () => {
  return (
    <QuizProvider>
      <QuizContainer />
      <QuizStatistics />
    </QuizProvider>
  );
};

export default QuizPage;
