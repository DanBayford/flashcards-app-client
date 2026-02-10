import { useCategories } from "@/hooks";
import { CategoryCard } from "./CategoryCard";
import { Spinner } from "@/components/ui/spinner";

export const CategoryList = () => {
  const { categories, categoriesLoading, categoriesError } = useCategories();

  if (categoriesLoading) {
    return (
      <div className="col-span-full flex flex-col gap-4 justify-center items-center mt-10">
        <Spinner className="size-8" />
        <p>Loading categories...</p>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <p className="col-span-full mt-4 text-red-500 text-center">
        Error loading categories
      </p>
    );
  }

  return (
    <ul className="col-span-full flex flex-col gap-4">
      {categories.map((c) => (
        <CategoryCard key={c.id} category={c} />
      ))}
    </ul>
  );
};
