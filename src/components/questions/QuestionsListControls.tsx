import { useSearchParams } from "react-router";
import { CategorySelect } from "@/components/categories";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { MultiValue } from "react-select";

export const QuestionsListControls = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hideMastered = !!searchParams.get("hideMastered");

  const checkboxHandler = (isChecked: boolean) => {
    // Make copy of any existing other params
    // Note page is not persisted so as to reset new pagination set
    const categoryIds = searchParams.getAll("categoryId");

    const updatedParams = new URLSearchParams();

    // Set search params as required
    if (categoryIds.length > 0) {
      categoryIds.forEach((id) => {
        updatedParams.append("categoryId", id);
      });
    }

    if (!isChecked) {
      updatedParams.delete("hideMastered");
    } else {
      updatedParams.set("hideMastered", "true");
    }

    setSearchParams(updatedParams);
  };

  const selectHandler = (
    data: MultiValue<{ value: string; label: string }>
  ) => {
    const hideMasteredParam = searchParams.get("hideMastered");

    const updatedParams = new URLSearchParams();

    if (data.length > 0) {
      data.forEach((category) => {
        updatedParams.append("categoryId", category.value);
      });
    }

    if (hideMasteredParam) {
      updatedParams.set("hideMastered", "true");
    }

    setSearchParams(updatedParams);
  };

  return (
    <div className="flex items-center gap-4">
      <CategorySelect
        selectCallback={selectHandler}
        customStyles={{ minWidth: "200px", maxWidth: "500px" }}
      />
      <span>
        <Label>
          <Checkbox
            checked={!!hideMastered}
            onCheckedChange={checkboxHandler}
            className="border-black bg-white"
          />
          Hide mastered
        </Label>
      </span>
    </div>
  );
};
