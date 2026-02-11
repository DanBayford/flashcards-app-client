import { useState } from "react";
import { Flashcards, GenerateQuiz } from "@/components/quiz";

export const CurrentView = {
  Question: "QUESTION",
  Answer: "ANSWER",
} as const;

type CurrentView = (typeof CurrentView)[keyof typeof CurrentView];

export const QuizContainer = () => {
  const [currentView, setCurrentView] = useState<CurrentView>(
    CurrentView.Question,
  );

  const toggleCurrentView = () => {
    setCurrentView((s) => {
      if (s === CurrentView.Answer) {
        return CurrentView.Question;
      } else {
        return CurrentView.Answer;
      }
    });
  };

  const resetView = () => setCurrentView(CurrentView.Question);

  return (
    <section className="col-span-full md:col-span-6 min-h-140 flex flex-col brutal-shadow bg-white rounded-4xl">
      <GenerateQuiz resetView={resetView} />
      <Flashcards
        currentView={currentView}
        toggleCurrentView={toggleCurrentView}
        resetView={resetView}
      />
    </section>
  );
};
