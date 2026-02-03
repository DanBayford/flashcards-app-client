import { useContext } from "react";
import { QuizContext, type TQuizContext } from "@/contexts/QuizContext";

export const useQuiz = () => {
  const context = useContext<TQuizContext | undefined>(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used within QuizContextProvider");
  }

  return context;
};
