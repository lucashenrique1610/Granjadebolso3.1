import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

export function Modal({ isOpen, onClose, title, children, maxWidth = 'lg' }: ModalProps) {
  // Previne rolagem do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in-up overflow-y-auto">
      <div className={`bg-white rounded-3xl w-full ${maxWidthMap[maxWidth]} p-6 md:p-8 animate-scale-in my-auto shadow-xl`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0f1c2b]">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="!p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </Button>
        </div>
        
        {children}
      </div>
    </div>
  );
}
