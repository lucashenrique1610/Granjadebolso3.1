import React from 'react';
import { KnowledgeModule } from '@/types';

interface KnowledgeModulePageProps {
  module: KnowledgeModule;
  onBack: () => void;
}

export default function KnowledgeModulePage({ module, onBack }: KnowledgeModulePageProps) {
  const hasContent =
    module.objective ||
    module.technicalContent.length > 0 ||
    module.importantParameters.length > 0 ||
    module.bestPractices.length > 0 ||
    module.commonProblems.length > 0 ||
    module.commonMistakes.length > 0 ||
    module.managementChecklist.length > 0 ||
    module.technicalSources.length > 0;

  return (
    <div className="app-section">
      <div className="app-section-card">
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Voltar
        </button>
        <div className="app-section-badge">{module.category}</div>
        <h1 className="app-section-title">{module.title}</h1>
        <p className="app-section-description mt-4">{module.summary}</p>

        <div className="mt-8 space-y-10">
          {module.objective && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Objetivo</h2>
              <p className="text-gray-600">{module.objective}</p>
            </section>
          )}

          {module.technicalContent.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Conteúdo Técnico</h2>
              <div className="space-y-3">
                {module.technicalContent.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600">{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {module.importantParameters.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Parâmetros Importantes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parâmetro</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Ideal</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {module.importantParameters.map((param, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{param.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{param.unit || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {param.idealValue || (param.minValue && param.maxValue ? `${param.minValue} - ${param.maxValue}` : '-')}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {module.bestPractices.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Boas Práticas</h2>
              <ul className="space-y-2 list-disc list-inside text-gray-600">
                {module.bestPractices.map((practice, idx) => (
                  <li key={idx}>{practice}</li>
                ))}
              </ul>
            </section>
          )}

          {module.commonProblems.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Problemas e Soluções</h2>
              <div className="space-y-4">
                {module.commonProblems.map((problem, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium text-gray-800 mb-2">{problem.problem}</h3>
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-600 mb-1">Possíveis Causas:</p>
                      <ul className="space-y-1 list-disc list-inside text-sm text-gray-500">
                        {problem.possibleCauses.map((cause, cIdx) => (
                          <li key={cIdx}>{cause}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Soluções Recomendadas:</p>
                      <ul className="space-y-1 list-disc list-inside text-sm text-gray-500">
                        {problem.recommendedSolutions.map((solution, sIdx) => (
                          <li key={sIdx}>{solution}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {module.commonMistakes.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Erros Comuns</h2>
              <ul className="space-y-2 list-disc list-inside text-gray-600">
                {module.commonMistakes.map((mistake, idx) => (
                  <li key={idx}>{mistake}</li>
                ))}
              </ul>
            </section>
          )}

          {module.managementChecklist.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Checklist de Manejo</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequência</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crítico</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {module.managementChecklist.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm text-gray-800">{item.item}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.frequency}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.responsible}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {item.critical ? (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Sim</span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">Não</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {module.technicalSources.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Fontes Técnicas</h2>
              <ul className="space-y-2 list-disc list-inside text-gray-600">
                {module.technicalSources.map((source, idx) => (
                  <li key={idx}>{source}</li>
                ))}
              </ul>
            </section>
          )}

          {!hasContent && (
            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
              <p className="text-gray-500 text-lg">Conteúdo do módulo ainda não adicionado.</p>
              <p className="text-gray-400 mt-2 text-sm">Você pode adicionar o conteúdo aqui quando quiser.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
