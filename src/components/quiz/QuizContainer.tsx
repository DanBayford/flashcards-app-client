import { Flashcards } from "@/components/quiz";

export const QuizContainer = () => {
  // Fetch quiz data here
  return (
    <section className="col-span-full md:col-span-6 brutal-shadow bg-white rounded-4xl">
      <Flashcards />
    </section>
  );
};
