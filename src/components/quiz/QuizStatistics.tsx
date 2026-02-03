import { useQuiz } from "@/hooks";
import { StatCard } from "@/components/quiz";
import TotalCards from "@/assets/img/icon-stats-total.svg?react";
import MasteredCards from "@/assets/img/icon-stats-mastered.svg?react";
import InProgressCards from "@/assets/img/icon-stats-in-progress.svg?react";
import NotStartedCards from "@/assets/img/icon-stats-not-started.svg?react";

export const QuizStatistics = () => {
  const { quizObject } = useQuiz();
  return (
    <section className="col-span-4 md:col-span-3 min-h-140 brutal-shadow bg-white rounded-4xl">
      {quizObject ? (
        <div className="p-4 flex flex-col gap-2 h-full">
          <h2 className="text-xl font-semibold">Study Statistics</h2>
          <ul className="flex flex-col grow justify-between">
            <StatCard>
              <StatCard.Info
                title={"Total Cards"}
                count={quizObject.totalCards}
              />
              <StatCard.Icon icon={<TotalCards />} color={"bg-blue-400"} />
            </StatCard>
            <StatCard>
              <StatCard.Info
                title={"Mastered"}
                count={quizObject.totalMastered}
              />
              <StatCard.Icon icon={<MasteredCards />} color={"bg-teal-400"} />
            </StatCard>
            <StatCard>
              <StatCard.Info
                title={"In Progress"}
                count={quizObject.totalInProgress}
              />
              <StatCard.Icon icon={<InProgressCards />} color={"bg-pink-700"} />
            </StatCard>
            <StatCard>
              <StatCard.Info
                title={"Not Started"}
                count={quizObject.totalNotStarted}
              />
              <StatCard.Icon icon={<NotStartedCards />} color={"bg-pink-500"} />
            </StatCard>
          </ul>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          Please generate a quiz for stats
        </div>
      )}
    </section>
  );
};
