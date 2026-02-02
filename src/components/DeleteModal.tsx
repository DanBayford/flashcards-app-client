import { Button } from "@/components/ui/button";

export const DeleteModal = ({
  id,
  resourceType,
  toggleDeleteConfirmView,
  deleteMutation,
  deletePending,
}: {
  id: string;
  resourceType: string;
  toggleDeleteConfirmView: () => void;
  deleteMutation: (id: string) => void;
  deletePending: boolean;
}) => {
  const deleteHandler = () => {
    deleteMutation(id);
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <p className="text-lg text-center font-semibold">
        Are you sure you want to delete this {resourceType}?
      </p>
      <div className="flex justify-between">
        <Button onClick={toggleDeleteConfirmView} disabled={deletePending}>
          Back to edit
        </Button>
        <Button
          variant="destructive"
          onClick={deleteHandler}
          disabled={deletePending}
        >
          Delete {resourceType}
        </Button>
      </div>
    </div>
  );
};
