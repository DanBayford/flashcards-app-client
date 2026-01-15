import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useQuestions = (
  pageNumber: number,
  categoryIds: string[] | undefined,
  isMastered: boolean = false
) => {
  // Create dynamic cache key based on page, category and mastered state
  const queryKeyParams = [pageNumber];

  if (categoryIds) {
    console.log("categoryId", categoryIds);
  }

  if (isMastered) {
    console.log("isMastered", isMastered);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: [`/questions`, queryKeyParams],
    queryFn: () => api.Questions.getQuestions(pageNumber),
  });

  const paginationData = data
    ? {
        page: data?.page,
        pageSize: data?.pageSize,
        totalCount: data?.totalCount,
        totalPages: data?.totalPages,
      }
    : undefined;

  return {
    questions: data?.questions,
    questionsLoading: isLoading,
    questionsError: isError,
    paginationData,
  };
};
