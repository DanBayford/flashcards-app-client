import { useState } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { CategorySelect } from "@/components/categories";
import { ShuffleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { TNewQuizParams } from "@/types";
import type { MultiValue } from "react-select";

export const GenerateQuiz = ({ resetView }: { resetView: () => void }) => {
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
    resetView();
  };

  return (
    <div className="p-4 flex justify-between items-start md:items-center border-b border-black">
      <div className="flex flex-col md:flex-row gap-2 sm:gap-4 items-start md:items-center">
        <CategorySelect
          selectCallback={selectHandler}
          customControlStyles={{ maxWidth: "370px" }}
        />
        <Label className="pl-1 pt-1 md:pl-0 md:pt-0 hover:cursor-pointer">
          <Checkbox
            checked={!quizParams.includeMastered}
            onCheckedChange={checkboxHandler}
          />
          Hide mastered
        </Label>
      </div>
      <Button variant={"outline"} onClick={submitHandler}>
        <span className="hidden sm:inline-block">Shuffle</span>
        <span className="sm:hidden">
          <ShuffleIcon className="block size-5" />
        </span>
      </Button>
    </div>
  );
};
