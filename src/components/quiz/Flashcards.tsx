import { useState } from "react";
import { Link } from "react-router";
import { useQuiz } from "@/hooks";
import { QuestionConfidence, QuestionTags } from "@/components/questions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FlashcardPagination } from "./FlashcardPagination";

const CurrentView = {
  Question: "QUESTION",
  Answer: "ANSWER",
} as const;

type CurrentView = (typeof CurrentView)[keyof typeof CurrentView];

export const Flashcards = () => {
  const {
    quizObject,
    currentCardIndex,
    showHints,
    toggleShowHints,
    updateQuestionConfidence,
    isUpdatingQuestionConfidence,
  } = useQuiz();

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

  if (quizObject === undefined) {
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        <h2 className="text-2xl font-semibold">Time to study!</h2>
        <p className="text-gray-500">Shuffle the deck to generate a quiz</p>
      </div>
    );
  }

  // Check for no questions
  if (quizObject?.questions.length === 0) {
    return (
      <div className="h-full flex flex-col gap-2 justify-center items-center">
        <h2 className="text-2xl font-semibold">
          That shuffle didn't return any questions!
        </h2>
        <p className="text-gray-500">
          Try again or{" "}
          <Link
            to="/questions"
            className="font-semibold underline hover:cursor-pointer"
          >
            add some more
          </Link>
        </p>
      </div>
    );
  }

  const resetConfidenceHandler = () => {
    const currentQuestion = quizObject.questions[currentCardIndex];
    updateQuestionConfidence(currentQuestion.id, 0);
  };

  const incrementConfidenceHandler = () => {
    const currentQuestion = quizObject?.questions[currentCardIndex];
    updateQuestionConfidence(
      currentQuestion.id,
      currentQuestion.confidence + 1,
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="grow flex flex-col gap-4 p-4">
        <div
          className={`grow flex flex-col items-center justify-between p-2 brutal-shadow rounded-xl ${currentView === CurrentView.Question ? "bg-pink-500" : "bg-blue-400"}`}
        >
          <QuestionTags
            tags={quizObject.questions[currentCardIndex].categories}
          />
          <div className="flex flex-col gap-2 text-center">
            {currentView === CurrentView.Question ? (
              <>
                <h1 className="text-4xl font-bold">
                  {quizObject.questions[currentCardIndex].prompt}
                </h1>
                {showHints && quizObject.questions[currentCardIndex].hint ? (
                  <p>{quizObject.questions[currentCardIndex].hint}</p>
                ) : null}
                <p onClick={toggleCurrentView}>Click to reveal answer</p>
              </>
            ) : (
              <>
                <p>Answer:</p>
                <p className="text-lg font-semibold">
                  {quizObject.questions[currentCardIndex].answer}
                </p>
                <p onClick={toggleCurrentView}>Back to question</p>
              </>
            )}
          </div>
          <QuestionConfidence
            confidence={quizObject.questions[currentCardIndex].confidence}
          />
        </div>
        <div className="relative flex justify-evenly sm:justify-center gap-4">
          <Label className="sm:absolute left-0 top-4 hover:cursor-pointer">
            <Checkbox checked={showHints} onCheckedChange={toggleShowHints} />
            <span>Hints</span>
          </Label>
          <Button
            onClick={incrementConfidenceHandler}
            className="brutal-shadow"
            disabled={
              quizObject.questions[currentCardIndex].confidence === 5 ||
              isUpdatingQuestionConfidence
            }
          >
            I know this
          </Button>
          <Button
            onClick={resetConfidenceHandler}
            className="bg-white brutal-shadow"
            disabled={
              quizObject.questions[currentCardIndex].confidence === 0 ||
              isUpdatingQuestionConfidence
            }
          >
            Reset progress
          </Button>
        </div>
      </div>
      <FlashcardPagination resetView={resetView} />
    </div>
  );
};
