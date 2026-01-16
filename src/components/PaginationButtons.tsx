import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { TPaginationObject } from "@/types";

export const PaginationButtons = ({
  paginationData,
}: {
  paginationData: TPaginationObject;
}) => {
  const { page, totalPages } = paginationData;

  const [searchParams] = useSearchParams();

  // Early return if no pages to paginate
  if (totalPages < 2) return null;

  const categoryIdParams = searchParams.getAll("categoryId");
  const hideMasteredParam = searchParams.get("hideMastered");

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  let otherParams = "";

  if (categoryIdParams.length > 0) {
    categoryIdParams.forEach((categoryId) => {
      otherParams += `&categoryId=${categoryId}`;
    });
  }

  if (hideMasteredParam) {
    otherParams += "&hideMastered=true";
  }

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 ? (
          <PaginationItem>
            <PaginationPrevious
              to={`/questions?page=${page - 1}${otherParams}`}
            />
          </PaginationItem>
        ) : null}
        {hasPreviousPage ? (
          <PaginationItem>
            <PaginationLink to={`/questions?page=${page - 1}${otherParams}`}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationLink
            to={`/questions?page=${page}${otherParams}`}
            className="bg-yellow-400 rounded-full hover:bg-yellow-400/80"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {hasNextPage ? (
          <PaginationItem>
            <PaginationLink to={`/questions?page=${page + 1}${otherParams}`}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        {page < totalPages ? (
          <PaginationItem>
            <PaginationNext to={`/questions?page=${page + 1}${otherParams}`} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};
