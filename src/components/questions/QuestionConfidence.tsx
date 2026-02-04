import { Progress } from "../ui/progress";

export const QuestionConfidence = ({ confidence }: { confidence: number }) => {
  const confidencePercent = confidence * 20;

  return (
    <span className="flex items-center gap-2 text-sm">
      <Progress value={confidencePercent} />
      {confidence} / 5
    </span>
  );
};
