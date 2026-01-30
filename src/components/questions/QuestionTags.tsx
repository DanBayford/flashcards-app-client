import { Label } from "../ui/label";
import type { TCategory } from "@/types";

export const QuestionTags = ({ tags }: { tags: TCategory[] }) => {
  return (
    <ul className="p-2 flex flex-wrap gap-2">
      {tags
        .sort(({ name: a }, { name: b }) => a.localeCompare(b))
        .map((tag) => (
          <li key={tag.id}>
            <Label className="px-4 py-2 brutal-shadow rounded-2xl ">
              {tag.name}
            </Label>
          </li>
        ))}
    </ul>
  );
};
