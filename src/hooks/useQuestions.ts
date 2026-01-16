import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const useQuestions = (
  pageNumber: number,
  categoryIds: string[],
  hideMastered: boolean = false
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`/questions`, pageNumber, categoryIds, hideMastered],
    queryFn: () =>
      api.Questions.getQuestions({
        page: pageNumber,
        categoryIds,
        hideMastered,
      }),
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
