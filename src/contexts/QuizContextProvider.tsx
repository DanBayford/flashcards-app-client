import { useState, type ReactNode } from "react";
import { QuizContext } from "./QuizContext";
import { useToast } from "@/hooks";
import api from "@/lib/api";
import type { TQuizObject } from "@/types";
export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const { errorToast } = useToast();
  const [quizObject, setQuizObject] = useState<TQuizObject | undefined>(
    undefined,
  );

  const generateQuiz = async (
    categoryIds: string[] = [],
    includeMastered: boolean = false,
  ) => {
    try {
      const questions = await api.Quiz.generateQuiz(
        categoryIds,
        includeMastered,
      );
      console.log("questions", questions);

      let totalCards = 0,
        totalMastered = 0,
        totalInProgress = 0,
        totalNotStarted = 0;

      questions.forEach((q) => {
        switch (q.confidence) {
          case 0:
            totalNotStarted++;
            break;
          case 5:
            totalMastered++;
            break;
          default:
            totalInProgress++;
        }
        totalCards++;
      });

      setQuizObject({
        questions,
        includeMastered,
        totalCards,
        totalMastered,
        totalInProgress,
        totalNotStarted,
      });
    } catch (e) {
      errorToast("Error generating quiz");
      console.error(e);
    }
  };

  return (
    <QuizContext.Provider value={{ quizObject, generateQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
