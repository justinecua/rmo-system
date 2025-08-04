import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages: number[] = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage === 1) {
      pages.push(1, 2, 3);
    } else if (currentPage === totalPages) {
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }
  }

  // Filter out-of-bounds (e.g. totalPages = 4, currentPage = 4)
  return pages.filter((page) => page >= 1 && page <= totalPages);
};

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <Button
        className="text-sm"
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </Button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(page as number)}
            className="w-8 h-8 p-1 text-sm"
          >
            {page}
          </Button>
        )
      )}

      <Button
        className="text-sm"
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
