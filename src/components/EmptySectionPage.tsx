import React from 'react';

interface EmptySectionPageProps {
  title: string;
  description?: string;
}

export default function EmptySectionPage({
  title,
  description = 'Seção vazia pronta para edição individual.',
}: EmptySectionPageProps) {
  return (
    <div className="app-section">
      <div className="app-section-card">
        <div className="app-section-badge">Seção ativa</div>
        <h1 className="app-section-title">{title}</h1>
        <p className="app-section-description">{description}</p>
      </div>
    </div>
  );
}
