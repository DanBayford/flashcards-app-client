import { Flashcards, GenerateQuiz } from "@/components/quiz";

export const QuizContainer = () => {
  return (
    <section className="col-span-full md:col-span-6 min-h-140 flex flex-col brutal-shadow bg-white rounded-4xl">
      <GenerateQuiz />
      <Flashcards />
    </section>
  );
};
