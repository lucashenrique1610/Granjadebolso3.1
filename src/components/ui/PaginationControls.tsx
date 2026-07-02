import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onNext: () => void;
  onPrev: () => void;
}

export function PaginationControls({ currentPage, totalPages, totalItems, onNext, onPrev }: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 sm:px-6 mt-4">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Mostrando página <span className="font-bold text-[#0f1c2b]">{currentPage}</span> de <span className="font-bold text-[#0f1c2b]">{totalPages}</span> 
          <span className="text-gray-500 ml-1">({totalItems} registros)</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onPrev}
          disabled={currentPage === 1}
          icon={<ChevronLeft size={16} />}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onNext}
          disabled={currentPage === totalPages}
          icon={<ChevronRight size={16} />}
          iconPosition="right"
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
