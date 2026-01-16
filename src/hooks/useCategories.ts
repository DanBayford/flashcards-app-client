import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useCategories = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.Categories.getCategories(),
  });

  return {
    categories: data || [],
    categoriesLoading: isLoading,
    categoriesError: isError,
  };
};
