import type { TQuizObject } from "@/types";
import { createContext } from "react";

export type TQuizContext = {
  quizObject: TQuizObject | undefined;
  generateQuiz: (categoryIds: string[], includeMastered: boolean) => void;
};

export const QuizContext = createContext<TQuizContext | undefined>(undefined);
