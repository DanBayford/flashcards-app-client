import type { TQuizObject } from "@/types";
import { createContext } from "react";

export type TQuizContext = {
  quizObject: TQuizObject | undefined;
  isQuizLoading: boolean;
  currentCardIndex: number;
  showHints: boolean;
  toggleShowHints: () => void;
  incrementCardIndex: () => void;
  decrementCardIndex: () => void;
  isUpdatingQuestionConfidence: boolean;
  updateQuestionConfidence: (questionId: string, newConfidence: number) => void;
  generateQuiz: (categoryIds: string[], includeMastered: boolean) => void;
};

export const QuizContext = createContext<TQuizContext | undefined>(undefined);
