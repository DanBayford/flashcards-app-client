import { useState } from "react";
import {
  QuestionConfidence,
  QuestionForm,
  QuestionTags,
} from "@/components/questions";
import { PaginationEllipsis } from "@/components/ui/pagination";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import type { TQuestion } from "@/types";

export const QuestionCard = ({ question }: { question: TQuestion }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialogCallback = () => setIsDialogOpen(false);

  return (
    <li className="flex flex-col brutal-shadow bg-white rounded-xl">
      <div className="p-3 border-b border-black font-bold text-lg">
        {question.prompt}
      </div>
      <div className="grow p-3 border-b border-black">
        <span className="text-gray-400 font-semibold text-sm">Answer:</span>
        <p className="mt-2">{question.answer}</p>
      </div>
      <div className="border-b border-black">
        <QuestionTags tags={question.categories} />
      </div>
      <div className="flex">
        <span className="basis-4/5 p-3 border-r border-black">
          <QuestionConfidence confidence={question.confidence} />
        </span>
        <span className="basis-1/5 flex justify-center items-center">
          <Dialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            aria-describedby="question-modal"
          >
            <DialogTrigger>
              <PaginationEllipsis className="hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent id="edit-question">
              <DialogHeader>
                <DialogTitle>Edit your card</DialogTitle>
              </DialogHeader>
              <QuestionForm
                questionToEdit={question}
                closeDialogCallback={closeDialogCallback}
              />
            </DialogContent>
          </Dialog>
        </span>
      </div>
    </li>
  );
};
