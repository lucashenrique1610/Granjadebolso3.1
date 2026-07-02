import { useState, useMemo, useEffect, useCallback } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number = 20) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const nextPage = useCallback(
    () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
    [totalPages],
  );
  const prevPage = useCallback(
    () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
    [],
  );
  const goToPage = useCallback(
    (page: number) => setCurrentPage(Math.min(Math.max(1, page), totalPages)),
    [totalPages],
  );
  const resetPage = useCallback(() => setCurrentPage(1), []);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
    totalItems: items.length,
  };
}
