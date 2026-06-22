import React, { useState } from 'react';
import { KnowledgeModule } from '@/types';
import { KNOWLEDGE_MODULES } from '@/data/knowledge';
import KnowledgeModulePage from '@/components/KnowledgeModulePage';

export default function ConhecimentoPage() {
  const [selectedModule, setSelectedModule] = useState<KnowledgeModule | null>(null);

  if (selectedModule) {
    return (
      <KnowledgeModulePage
        module={selectedModule}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <div className="app-section">
      <div className="app-section-card">
        <div className="app-section-badge">Seção de Conhecimento</div>
        <h1 className="app-section-title">Biblioteca de Conhecimento</h1>
        <p className="app-section-description">
          Acesse todos os módulos de conhecimento para gerenciar sua granja com sucesso.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KNOWLEDGE_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => setSelectedModule(module)}
              className="group rounded-xl border border-gray-200 bg-white p-5 text-left hover:border-[var(--brand-primary)] hover:shadow-md transition-all duration-200"
            >
              <div className="inline-block mb-2 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                {module.category}
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-[var(--brand-primary)]">
                {module.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{module.summary}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                Acessar →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

