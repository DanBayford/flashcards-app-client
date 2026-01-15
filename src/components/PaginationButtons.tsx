import type { TPaginationObject } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationButtons = ({
  paginationData,
}: {
  paginationData: TPaginationObject;
}) => {
  const { page, totalPages } = paginationData;
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 ? (
          <PaginationItem>
            <PaginationPrevious to={`/questions?page=${page - 1}`} />
          </PaginationItem>
        ) : null}
        {hasPreviousPage ? (
          <PaginationItem>
            <PaginationLink to={`/questions?page=${page - 1}`}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationLink
            to={`/questions?page=${page}`}
            className="bg-yellow-400 rounded-full hover:bg-yellow-400/80"
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {hasNextPage ? (
          <PaginationItem>
            <PaginationLink to={`/questions?page=${page + 1}`}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        {page < totalPages ? (
          <PaginationItem>
            <PaginationNext to={`/questions?page=${page + 1}`} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};
