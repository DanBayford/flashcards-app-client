import { CategorySelect } from "@/components/categories";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const QuestionsListControls = () => {
  return (
    <div className="flex items-center gap-4">
      <CategorySelect />
      <span>
        <Label>
          <Checkbox className="border-black bg-white" />
          Hide mastered
        </Label>
      </span>
    </div>
  );
};
