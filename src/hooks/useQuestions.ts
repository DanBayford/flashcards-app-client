import { useToast } from "./useToast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

const QUESTION_CACHE_KEY = "questions";

export const useQuestions = (
  pageNumber: number = 1,
  categoryIds: string[] = [],
  hideMastered: boolean = false
) => {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUESTION_CACHE_KEY, pageNumber, categoryIds, hideMastered],
    queryFn: () =>
      api.Questions.getQuestions({
        page: pageNumber,
        categoryIds,
        hideMastered,
      }),
  });

  const useCreateQuestion = (successCallback = () => {}) => {
    return useMutation({
      mutationFn: api.Questions.createQuestion,
      onSuccess: () => {
        // Invalidates all keys inc 'questions'
        queryClient.invalidateQueries({ queryKey: [QUESTION_CACHE_KEY] });
        successToast("New question created");
        // Call appropriate success callback (clear form / close modal)
        successCallback();
      },
      onError: () => {
        errorToast("Error creating question");
      },
    });
  };

  const useUpdateQuestion = (successCallback = () => {}) => {
    return useMutation({
      mutationFn: api.Questions.updateQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUESTION_CACHE_KEY] });
        successToast("Question updated");
        successCallback();
      },
      onError: () => {
        errorToast("Error updating question");
      },
    });
  };

  const useDeleteQuestion = (successCallback = () => {}) => {
    return useMutation({
      mutationFn: api.Questions.deleteQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUESTION_CACHE_KEY] });
        successToast("Question deleted");
        successCallback();
      },
      onError: () => {
        errorToast("Error deleting question");
      },
    });
  };

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
    useCreateQuestion,
    useUpdateQuestion,
    useDeleteQuestion,
  };
};
