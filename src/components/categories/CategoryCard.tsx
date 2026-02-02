import { useState } from "react";
import { CategoryForm } from "@/components/categories";
import { PaginationEllipsis } from "@/components/ui/pagination";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import type { TCategory } from "@/types";

export const CategoryCard = ({ category }: { category: TCategory }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialogCallback = () => setIsDialogOpen(false);

  return (
    <li className="flex justify-between items-center brutal-shadow bg-white rounded-xl text-xl">
      <p className="p-2">{category.name}</p>
      <span className="p-2 border-l border-black">
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          aria-describedby="category-modal"
        >
          <DialogTrigger>
            <PaginationEllipsis className="hover:cursor-pointer" />
          </DialogTrigger>
          <DialogContent id="edit-category">
            <DialogHeader>
              <DialogTitle>Edit category</DialogTitle>
            </DialogHeader>
            <CategoryForm
              categoryToEdit={category}
              closeDialogCallback={closeDialogCallback}
            />
          </DialogContent>
        </Dialog>
      </span>
    </li>
  );
};
