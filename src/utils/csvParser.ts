import { CsvAnalysisResult, CsvColumnAudit } from '../types';

export function parseCsvText(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(cell.trim());
      // Only add non-empty rows
      if (row.some((val) => val !== '')) {
        rows.push(row);
      }
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  // Final cell
  row.push(cell.trim());
  if (row.some((val) => val !== '')) {
    rows.push(row);
  }

  return rows;
}

export function analyzeCsvData(fileName: string, fileSizeBytes: number, text: string): CsvAnalysisResult {
  const rawRows = parseCsvText(text);

  if (rawRows.length === 0) {
    throw new Error('CSV file appears to be completely empty.');
  }

  const headers = rawRows[0].map((h, i) => (h ? h.trim() : `Column_${i + 1}`));
  const dataRows = rawRows.slice(1);
  const totalColumns = headers.length;
  const totalRows = dataRows.length;

  // Duplicate row detection
  const rowStringCounts = new Map<string, number>();
  let duplicateRowCount = 0;

  dataRows.forEach((r) => {
    const key = r.join('|||');
    const existing = rowStringCounts.get(key) || 0;
    if (existing > 0) {
      duplicateRowCount++;
    }
    rowStringCounts.set(key, existing + 1);
  });

  // Column-level audit
  let totalCells = 0;
  let totalEmptyCells = 0;

  const columnsAudit: CsvColumnAudit[] = headers.map((colName, colIdx) => {
    let emptyCount = 0;
    const values: string[] = [];
    const numericValues: number[] = [];

    dataRows.forEach((r) => {
      totalCells++;
      const val = r[colIdx] !== undefined ? String(r[colIdx]).trim() : '';
      if (!val) {
        emptyCount++;
        totalEmptyCells++;
      } else {
        values.push(val);
        // Check if numeric
        const cleanedNum = val.replace(/,/g, '');
        const num = Number(cleanedNum);
        if (!isNaN(num) && cleanedNum !== '') {
          numericValues.push(num);
        }
      }
    });

    const isNumeric = values.length > 0 && numericValues.length / values.length >= 0.8;
    const isDate =
      values.length > 0 &&
      values.every((v) => !isNaN(Date.parse(v)) && (v.includes('-') || v.includes('/')));
    const isBoolean =
      values.length > 0 &&
      values.every((v) => ['true', 'false', '0', '1', 'yes', 'no'].includes(v.toLowerCase()));

    let colType: 'numeric' | 'text' | 'date' | 'boolean' = 'text';
    if (isNumeric) colType = 'numeric';
    else if (isDate) colType = 'date';
    else if (isBoolean) colType = 'boolean';

    const uniqueSet = new Set(values);

    let stats: { min: number; max: number; avg: number; sum: number } | undefined;
    if (isNumeric && numericValues.length > 0) {
      const sum = numericValues.reduce((acc, curr) => acc + curr, 0);
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);
      const avg = sum / numericValues.length;
      stats = { min, max, avg: Math.round(avg * 100) / 100, sum: Math.round(sum * 100) / 100 };
    }

    return {
      name: colName,
      type: colType,
      emptyCount,
      emptyPercentage: totalRows > 0 ? Math.round((emptyCount / totalRows) * 100) : 0,
      uniqueCount: uniqueSet.size,
      sampleValues: values.slice(0, 3),
      stats,
    };
  });

  // Calculate Health Score (100 minus penalties for missing cells and duplicates)
  const emptyRatio = totalCells > 0 ? totalEmptyCells / totalCells : 0;
  const duplicateRatio = totalRows > 0 ? duplicateRowCount / totalRows : 0;
  const healthScore = Math.max(0, Math.min(100, Math.round(100 - emptyRatio * 60 - duplicateRatio * 40)));

  return {
    fileName,
    fileSizeBytes,
    totalRows,
    totalColumns,
    headers,
    rows: dataRows,
    columnsAudit,
    duplicateRowCount,
    overallHealthScore: healthScore,
  };
}
