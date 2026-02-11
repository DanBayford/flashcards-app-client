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
  const [isQuizLoading, setIsQuizLoading] = useState<boolean>(false);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [showHints, setShowHints] = useState<boolean>(false);

  const [isUpdatingQuestionConfidence, setIsUpdatingQuestionConfidence] =
    useState<boolean>(false);

  const incrementCardIndex = () => setCurrentCardIndex((s) => s + 1);
  const decrementCardIndex = () => setCurrentCardIndex((s) => s - 1);

  const toggleShowHints = () => setShowHints((s) => !s);

  const generateQuiz = async (
    categoryIds: string[] = [],
    includeMastered: boolean = false,
  ) => {
    setIsQuizLoading(true);
    try {
      const questions = await api.Quiz.generateQuiz(
        categoryIds,
        includeMastered,
      );

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
      setCurrentCardIndex(0);
    } catch (e) {
      errorToast("Error generating quiz");
      console.error("Error generating quiz", e);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const updateQuestionConfidence = async (
    questionId: string,
    updatedConfidenceLevel: number,
  ) => {
    setIsUpdatingQuestionConfidence(true);

    // Optimistic UI update before server request
    let previousQuiz: TQuizObject | null = null;
    setQuizObject((prev) => {
      if (!prev) return prev;
      // Make copy of current state for rollback
      previousQuiz = prev;

      // Copy question array
      const questions =
        prev.questions?.map((q) =>
          q.id === questionId
            ? { ...q, confidence: updatedConfidenceLevel }
            : q,
        ) ?? [];

      // Update quiz metadata
      const totalMastered = questions.filter((q) => q.confidence === 5).length;
      const totalInProgress = questions.filter(
        (q) => q.confidence > 0 && q.confidence < 5,
      ).length;
      const totalNotStarted = questions.filter(
        (q) => q.confidence === 0,
      ).length;

      // Return new object (ie no references to previousQuiz)
      return {
        ...prev,
        questions,
        totalMastered,
        totalInProgress,
        totalNotStarted,
      };
    });

    try {
      // Update API
      await api.Quiz.updateQuiz([
        { questionId, newConfidenceLevel: updatedConfidenceLevel },
      ]);
    } catch (e) {
      console.error("Error updating server", e);
      errorToast("Error updating question");
      if (previousQuiz) setQuizObject(previousQuiz);
    } finally {
      setIsUpdatingQuestionConfidence(false);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizObject,
        generateQuiz,
        isQuizLoading,
        showHints,
        toggleShowHints,
        currentCardIndex,
        incrementCardIndex,
        decrementCardIndex,
        updateQuestionConfidence,
        isUpdatingQuestionConfidence,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
