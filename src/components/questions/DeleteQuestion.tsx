import { useQuestions } from "@/hooks";
import { Button } from "@/components/ui/button";

export const DeleteQuestion = ({
  id,
  toggleDeleteConfirmView,
  successCallback,
}: {
  id: string;
  toggleDeleteConfirmView: () => void;
  successCallback: () => void;
}) => {
  const { useDeleteQuestion } = useQuestions();

  const deleteMutation = useDeleteQuestion(successCallback);

  const deleteHandler = async () => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <p className="text-lg text-center font-semibold">
        Are you sure you want to delete this card?
      </p>
      <div className="flex justify-between">
        <Button
          onClick={toggleDeleteConfirmView}
          disabled={deleteMutation.isPending}
        >
          Back to edit
        </Button>
        <Button
          variant="destructive"
          onClick={deleteHandler}
          disabled={deleteMutation.isPending}
        >
          Delete card
        </Button>
      </div>
    </div>
  );
};
