import { useToast } from "./useToast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

const CATEGORY_CACHE_KEY = "categories";

export const useCategories = () => {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: [CATEGORY_CACHE_KEY],
    queryFn: () => api.Categories.getCategories(),
  });

  const useCreateCategory = (successCallback = () => {}) => {
    return useMutation({
      mutationFn: api.Categories.createCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CATEGORY_CACHE_KEY] });
        successToast("New category created");
        successCallback();
      },
      onError: () => {
        errorToast("Error creating category");
      },
    });
  };

  const useUpdateCategory = (successCallback = () => {}) => {
    return useMutation({
      mutationFn: api.Categories.updateCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CATEGORY_CACHE_KEY] });
        successToast("Category updated");
        successCallback();
      },
      onError: () => {
        errorToast("Error updating category");
      },
    });
  };

  const useDeleteCategory = (successCallback = () => {}) => {
    return useMutation({
      mutationFn: api.Categories.deleteCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CATEGORY_CACHE_KEY] });
        successToast("Category deleted");
        successCallback();
      },
      onError: () => {
        errorToast("Error deleting category");
      },
    });
  };

  return {
    categories:
      data?.sort(({ name: a }, { name: b }) => a.localeCompare(b)) || [],
    categoriesLoading: isLoading,
    categoriesError: isError,
    useCreateCategory,
    useUpdateCategory,
    useDeleteCategory,
  };
};
