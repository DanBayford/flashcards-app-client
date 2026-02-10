import { Progress } from "../ui/progress";
import BrainIcon from "@/assets/img/icon-mastered.svg?react";

export const QuestionConfidence = ({ confidence }: { confidence: number }) => {
  const confidencePercent = confidence * 20;
  const mastereQuestion = confidence === 5;

  return (
    <span
      className={`flex items-center gap-2 text-sm ${mastereQuestion ? "w-36 px-3 py-1 brutal-shadow bg-teal-400 rounded-xl" : ""}`}
    >
      {mastereQuestion ? (
        <span className="flex items-center gap-1">
          <BrainIcon />
          Mastered
        </span>
      ) : (
        <Progress value={confidencePercent} />
      )}
      {confidence}/5
    </span>
  );
};
