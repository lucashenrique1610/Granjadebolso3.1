import React from 'react';

interface EmptySectionPageProps {
  title: string;
  description?: string;
}

export default function EmptySectionPage({
  title,
  description = 'Esta funcionalidade está em desenvolvimento e estará disponível em breve.',
}: EmptySectionPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] p-8 text-center bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm m-4 md:m-8">
      <div className="w-16 h-16 mb-6 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
        <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-primary uppercase bg-brand-primary/10 rounded-full">
        Em Breve
      </div>
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">{title}</h1>
      <p className="max-w-md text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
