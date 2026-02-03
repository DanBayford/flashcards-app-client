import { useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { CategorySelect } from "../categories";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { TNewQuizParams } from "@/types";
import type { MultiValue } from "react-select";

export const GenerateQuiz = () => {
  const { generateQuiz } = useQuiz();
  const [quizParams, setQuizParams] = useState<TNewQuizParams>({
    categoryIds: [],
    includeMastered: false,
  });

  const checkboxHandler = () =>
    setQuizParams((s) => ({ ...s, includeMastered: !s.includeMastered }));

  const selectHandler = (
    data: MultiValue<{ value: string; label: string }>,
  ) => {
    const categoryIds = data.map((d) => d?.value);
    setQuizParams((s) => ({ ...s, categoryIds }));
  };

  const submitHandler = () => {
    const { categoryIds, includeMastered } = quizParams;
    generateQuiz(categoryIds, includeMastered);
  };

  return (
    <div className="p-4 flex justify-between align-items border-b border-black">
      <div className="flex gap-4 items-center">
        <CategorySelect selectCallback={selectHandler} />
        <Label className="hover:cursor-pointer">
          <Checkbox
            checked={!quizParams.includeMastered}
            onCheckedChange={checkboxHandler}
          />
          Hide mastered
        </Label>
      </div>
      <Button variant={"outline"} onClick={submitHandler}>
        Shuffle
      </Button>
    </div>
  );
};
