import { useCategories } from "@/hooks";
import { CategoryCard } from "./CategoryCard";
export const CategoryList = () => {
  const { categories, categoriesLoading } = useCategories();
  return (
    <ul className="col-span-full flex flex-col gap-4">
      {categories.map((c) => (
        <CategoryCard key={c.id} category={c} />
      ))}
    </ul>
  );
};
