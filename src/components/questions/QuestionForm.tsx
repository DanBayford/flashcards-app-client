import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelect } from "@/components/categories";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { TQuestionFormValues, TQuestion } from "@/types";

const schema = yup.object({
  prompt: yup.string().required("A question is required"),
  hint: yup
    .string()
    .transform((value) => value ?? "") // Force to "" if undefined
    .default(""),
  answer: yup.string().required("An answer is required"),
  categories: yup
    .array()
    .min(1, "At least one category ois required")
    .required(),
});

export const QuestionForm = ({ question }: { question?: TQuestion }) => {
  console.log("question to edit", question);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TQuestionFormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      prompt: question?.prompt ?? "",
      hint: question?.hint ?? "",
      answer: question?.answer ?? "",
      categories: question?.categories ?? [],
    },
  });

  const selectHandler = () => {};

  const onSubmitHandler = handleSubmit(async (values) => {
    console.log("values", values);
  });

  return (
    <section className="col-span-full brutal-shadow bg-white rounded-4xl">
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
            placeholder="e.g., What does HTTP stand for?"
            {...register("prompt")}
          />
        </div>
        <div>
          <span className="flex gap-2">
            <Label className="mb-2 text-xl">Hint</Label>
            <p className="text-sm mt-1 text-gray-400">(optional)</p>
          </span>
          <Input
            id="hint"
            type="text"
            placeholder="e.g., It is a type of protocol"
            {...register("hint")}
          />
        </div>
        <div>
          <Label className="mb-2 text-xl">Answer</Label>
          <Textarea
            id="hint"
            placeholder="e.g., HyperText Transfer Protocol"
            {...register("hint")}
          />
        </div>
        <div>
          <Label className="mb-2 text-xl">Categories</Label>
          <CategorySelect
            selectCallback={selectHandler}
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
        </div>
        <Button className="mt-4 w-[140px]">Create Card</Button>
      </form>
    </section>
  );
};
