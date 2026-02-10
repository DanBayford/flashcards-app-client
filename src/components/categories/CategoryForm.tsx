import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeleteModal } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useCategories } from "@/hooks";
import * as yup from "yup";
import type { TCategory, TCreateCategory } from "@/types";

const schema = yup.object({
  name: yup.string().required("A category name is required"),
});

export const CategoryForm = ({
  categoryToEdit,
  closeDialogCallback,
}: {
  categoryToEdit?: TCategory;
  closeDialogCallback?: () => void;
}) => {
  const isEditingCategory = !!categoryToEdit;

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<TCreateCategory>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: categoryToEdit?.name ?? "",
    },
  });

  // Toggle edit modal view
  const [showDeleteConfirmView, setShowDeleteConfirmView] =
    useState<boolean>(false);

  const { useCreateCategory, useUpdateCategory, useDeleteCategory } =
    useCategories();

  const formResetHandler = () => {
    resetForm();
  };

  // Appropriate callback for a successful category submission (editing / creating)
  const successCallback = isEditingCategory
    ? closeDialogCallback
    : formResetHandler;

  const createCategoryMutation = useCreateCategory(successCallback);
  const updateCategoryMutation = useUpdateCategory(successCallback);
  const deleteCategoryMutation = useDeleteCategory(successCallback);

  const toggleDeleteConfirmView = () => setShowDeleteConfirmView((s) => !s);

  // Form submission handlers
  const onSubmitHandler = handleSubmit(async (values) => {
    const { name } = values;
    if (isEditingCategory) {
      await updateCategoryMutation.mutateAsync({
        id: categoryToEdit.id,
        name,
      });
    } else {
      await createCategoryMutation.mutateAsync({ name });
    }
  });
  return (
    <section className="col-span-full brutal-shadow bg-white rounded-4xl">
      {showDeleteConfirmView && categoryToEdit && closeDialogCallback ? (
        <DeleteModal
          id={categoryToEdit.id}
          resourceType={"category"}
          toggleDeleteConfirmView={toggleDeleteConfirmView}
          deleteMutation={deleteCategoryMutation.mutateAsync}
          deletePending={deleteCategoryMutation.isPending}
        />
      ) : (
        <form
          onSubmit={onSubmitHandler}
          noValidate
          className="p-6 flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="name" className="mb-2 text-xl">
              Category
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={isEditingCategory ? "" : "Description of category"}
              {...register("name")}
            />
            {errors.name && (
              <p role="alert">
                {errors.name.message || "Error with category name"}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <Button
              type="submit"
              disabled={createCategoryMutation.isPending}
              className="mt-4 w-40"
            >
              {`${isEditingCategory ? "Update" : "Create"} category`}
            </Button>
            {isEditingCategory && (
              <Button
                onClick={toggleDeleteConfirmView}
                variant="secondary"
                className="mt-4 w-40"
              >
                Delete category
              </Button>
            )}
          </div>
        </form>
      )}
    </section>
  );
};
