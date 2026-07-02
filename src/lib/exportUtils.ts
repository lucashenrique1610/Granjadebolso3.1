export function downloadFile(fileName: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportRowsToExcel(fileName: string, headers: string[], rows: string[][]) {
  const table = `
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell ?? ''}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  `;

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 16px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
          th { background: #eff6ff; }
        </style>
      </head>
      <body>${table}</body>
    </html>
  `;

  downloadFile(`${fileName}.xls`, html, 'application/vnd.ms-excel;charset=utf-8;');
}

export function exportRowsToPdf(title: string, headers: string[], rows: string[][]) {
  const popup = window.open('', '_blank', 'width=1200,height=800');
  if (!popup) {
    window.alert('Não foi possível abrir a janela de impressão para gerar o PDF.');
    return;
  }

  popup.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
          h1 { font-size: 22px; margin-bottom: 8px; }
          p { color: #6b7280; margin-bottom: 24px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; font-size: 12px; }
          th { background: #eff6ff; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p>Exportado em ${new Date().toLocaleString('pt-BR')}</p>
        <table>
          <thead><tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr></thead>
          <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell ?? ''}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </body>
    </html>
  `);
  popup.document.close();
  popup.focus();
  popup.print();
}
