import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeleteModal } from "@/components";
import { CategorySelect } from "@/components/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuestions } from "@/hooks";
import * as yup from "yup";
import type { TNewQuestionForm, TQuestion } from "@/types";

const schema = yup.object({
  prompt: yup.string().required("A question is required"),
  hint: yup
    .string()
    .transform((value) => value ?? "") // Force to "" if undefined
    .default(""),
  answer: yup.string().required("An answer is required"),
  categories: yup
    .array()
    .min(1, "At least one category is required")
    .required(),
});

export const QuestionForm = ({
  questionToEdit,
  closeDialogCallback,
}: {
  questionToEdit?: TQuestion;
  closeDialogCallback?: () => void;
}) => {
  const isEditingQuestion = !!questionToEdit;

  const {
    register,
    handleSubmit,
    reset: resetForm,
    setValue,
    formState: { errors },
  } = useForm<TNewQuestionForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      prompt: questionToEdit?.prompt ?? "",
      hint: questionToEdit?.hint ?? "",
      answer: questionToEdit?.answer ?? "",
      categories: questionToEdit?.categories ?? [],
    },
  });

  // State for edit form confidence radio selects
  const [confidence, setConfidence] = useState<string | undefined>(
    questionToEdit?.confidence.toString() || undefined
  );
  // Toggle edit modal view
  const [showDeleteConfirmView, setShowDeleteConfirmView] =
    useState<boolean>(false);
  // Key to force select to remount and clear internal state
  const [selectKey, setSelectKey] = useState(0);

  const { useCreateQuestion, useUpdateQuestion, useDeleteQuestion } =
    useQuestions();

  const formResetHandler = () => {
    // Clear prompt, hint and answer
    resetForm();
    // Reset categories
    setValue("categories", [], { shouldValidate: false });
    // Force category select to remount and clear
    setSelectKey((k) => k + 1);
  };

  // Appropriate callback for a successful question submission (editing / creating)
  const successCallback = isEditingQuestion
    ? closeDialogCallback
    : formResetHandler;

  const createQuestionMutation = useCreateQuestion(successCallback);
  const updateQuestionMutation = useUpdateQuestion(successCallback);
  const deleteQuestionMutation = useDeleteQuestion(successCallback);

  // Determine if any category options should be already selected
  const alreadySelectedIds = questionToEdit
    ? questionToEdit.categories.map((c) => c.id)
    : [];

  const toggleDeleteConfirmView = () => setShowDeleteConfirmView((s) => !s);

  const confidenceRadioHandler = (confidenceLevel: string) =>
    setConfidence(confidenceLevel);

  // Monitor category select input
  const selectHandler = (
    selectedCategories: { value: string; label: string }[]
  ) => {
    const newCategories = selectedCategories.map((c) => ({
      id: c.value,
      name: c.label,
    }));
    setValue("categories", newCategories, { shouldValidate: true });
  };

  // Form submission handlers
  const onSubmitHandler = handleSubmit(async (values) => {
    const { prompt, hint, answer, categories } = values;
    const categoryIds = categories.map((c) => c.id);
    if (isEditingQuestion) {
      await updateQuestionMutation.mutateAsync({
        id: questionToEdit.id,
        prompt,
        hint,
        answer,
        confidence: parseInt(confidence || "1"),
        categoryIds,
      });
    } else {
      await createQuestionMutation.mutateAsync({
        prompt,
        hint,
        answer,
        categoryIds,
      });
    }
  });

  return (
    <section className="col-span-full brutal-shadow bg-white rounded-4xl">
      {showDeleteConfirmView && questionToEdit && closeDialogCallback ? (
        <DeleteModal
          id={questionToEdit.id}
          resourceType={"question"}
          toggleDeleteConfirmView={toggleDeleteConfirmView}
          deleteMutation={deleteQuestionMutation.mutateAsync}
          deletePending={deleteQuestionMutation.isPending}
        />
      ) : (
        <form
          onSubmit={onSubmitHandler}
          noValidate
          className="p-6 flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="question" className="mb-2 text-xl">
              Question
            </Label>
            <Input
              id="prompt"
              type="text"
              placeholder={
                isEditingQuestion ? "" : "e.g., What does HTTP stand for?"
              }
              {...register("prompt")}
            />
            {errors.prompt && (
              <p role="alert">
                {errors.prompt.message || "Error with question"}
              </p>
            )}
          </div>
          <div>
            <span className="flex gap-2">
              <Label className="mb-2 text-xl">Hint</Label>
              <p className="text-sm mt-1 text-gray-400">(optional)</p>
            </span>
            <Input
              id="hint"
              type="text"
              placeholder={
                isEditingQuestion ? "" : "e.g., It is a type of protocol"
              }
              {...register("hint")}
            />
            {errors.hint && (
              <p role="alert">{errors.hint.message || "Error with hint"}</p>
            )}
          </div>
          <div>
            <Label className="mb-2 text-xl">Answer</Label>
            <Textarea
              id="hint"
              placeholder={
                isEditingQuestion ? "" : "e.g., HyperText Transfer Protocol"
              }
              {...register("answer")}
            />
            {errors.answer && (
              <p role="alert">{errors.answer.message || "Error with answer"}</p>
            )}
          </div>
          <div>
            <Label className="mb-2 text-xl">Categories</Label>
            <CategorySelect
              selectCallback={selectHandler}
              alreadySelectedIds={alreadySelectedIds}
              questionToEdit={questionToEdit}
              key={selectKey}
              customControlStyles={{
                border: "1px solid #EBEBEB",
                borderRadius: "8px",
                boxShadow: "2px 2px 0px rgba(235, 235, 235, 1)",
                "&:hover": {
                  border: "1px solid #EBEBEB",
                  boxShadow: "2px 2px 0px rgba(235, 235, 235, 1)",
                },
              }}
              customMenuStyles={{
                border: "1px solid #EBEBEB",
                boxShadow: "2px 2px 0px rgba(235, 235, 235, 1)",
              }}
              customMultiValueStyles={{
                border: "1px solid #E1E1E1",
                boxShadow: "",
              }}
            />
            {errors.categories && (
              <p role="alert">
                {errors.categories.message || "Error with categories"}
              </p>
            )}
          </div>
          {isEditingQuestion ? (
            <div>
              <Label className="mb-2 text-xl">Confidence</Label>
              <RadioGroup
                className="flex justify-evenly"
                defaultValue={confidence}
                onValueChange={confidenceRadioHandler}
              >
                {["1", "2", "3", "4", "5"].map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <RadioGroupItem value={c} id={c} />
                    <Label htmlFor={c}>{c}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : null}
          <div className="flex justify-between">
            <Button
              type="submit"
              disabled={createQuestionMutation.isPending}
              className="mt-4 w-35"
            >
              {`${isEditingQuestion ? "Update" : "Create"} card`}
            </Button>
            {isEditingQuestion && (
              <Button
                onClick={toggleDeleteConfirmView}
                variant="secondary"
                className="mt-4 w-35"
              >
                Delete card
              </Button>
            )}
          </div>
        </form>
      )}
    </section>
  );
};
