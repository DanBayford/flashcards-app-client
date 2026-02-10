import { useQuiz } from "@/hooks";
import { Button } from "@/components/ui/button";
import LeftChevron from "@/assets/img/icon-chevron-left.svg?react";
import RightChevron from "@/assets/img/icon-chevron-right.svg?react";

export const FlashcardPagination = ({
  resetView,
}: {
  resetView: () => void;
}) => {
  const {
    quizObject,
    currentCardIndex,
    incrementCardIndex,
    decrementCardIndex,
  } = useQuiz();

  const isFirstCard = currentCardIndex === 0;
  const isLastCard = currentCardIndex + 1 === quizObject?.totalCards;

  const incrementHandler = () => {
    resetView();
    incrementCardIndex();
  };

  const decrementHandler = () => {
    resetView();
    decrementCardIndex();
  };

  return (
    <div className="flex justify-between items-center p-4 border-t border-black">
      <Button
        className=""
        variant="outline"
        onClick={decrementHandler}
        disabled={isFirstCard}
      >
        <LeftChevron />
        <span className="hidden sm:inline-block">Previous</span>
      </Button>
      <span className="text-gray-500">
        Card {currentCardIndex + 1} of {quizObject?.totalCards}
      </span>
      <Button
        className=""
        variant="outline"
        onClick={incrementHandler}
        disabled={isLastCard}
      >
        <span className="hidden sm:inline-block">Next</span>
        <RightChevron />
      </Button>
    </div>
  );
};
