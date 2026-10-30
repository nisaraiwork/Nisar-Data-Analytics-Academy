import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Database,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { analyzeCsvData } from '../utils/csvParser';
import { CsvAnalysisResult } from '../types';
import { SAMPLE_DATASETS, SampleDataset } from '../data/sampleDatasets';

export const CsvCheckerLab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<CsvAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'audit' | 'preview' | 'stats'>('audit');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const PAGE_SIZE = 6;

  const handleFileUpload = (selectedFile: File) => {
    setErrorMsg(null);

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMsg('File too large. Maximum supported size is 5 MB.');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const result = analyzeCsvData(selectedFile.name, selectedFile.size, text);
        setFile(selectedFile);
        setAnalysis(result);
        setCurrentPage(1);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Could not read this file as CSV.';
        setErrorMsg(message);
      } finally {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setErrorMsg('Failed to read the local file.');
      setIsProcessing(false);
    };

    reader.readAsText(selectedFile);
  };

  const handleLoadSample = (sample: SampleDataset) => {
    setErrorMsg(null);
    setIsProcessing(true);
    try {
      const blob = new Blob([sample.content], { type: 'text/csv' });
      const syntheticFile = new File([blob], sample.fileName, { type: 'text/csv' });
      const result = analyzeCsvData(sample.fileName, blob.size, sample.content);
      setFile(syntheticFile);
      setAnalysis(result);
      setCurrentPage(1);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to parse sample dataset.';
      setErrorMsg(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Filtered rows for the preview tab
  const filteredRows = analysis
    ? analysis.rows.filter((row) =>
        row.some((cell) => cell.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE) || 1;
  const paginatedRows = filteredRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleDownloadCleaned = () => {
    if (!analysis) return;
    // Remove duplicates
    const uniqueRowMap = new Map<string, string[]>();
    analysis.rows.forEach((r) => {
      const key = r.map((c) => c.trim()).join('|||');
      if (!uniqueRowMap.has(key)) {
        uniqueRowMap.set(key, r);
      }
    });

    const cleanLines = [
      analysis.headers.join(','),
      ...Array.from(uniqueRowMap.values()).map((r) =>
        r.map((c) => (c.includes(',') ? `"${c.replace(/"/g, '""')}"` : c.trim())).join(',')
      ),
    ];

    const cleanBlob = new Blob([cleanLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(cleanBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned_${analysis.fileName}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="csv-lab" className="bg-[#101d30] border border-[#263b55] rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#35d5e8]" />
            <h2 className="text-xl font-bold text-white tracking-tight">🧪 Practice Lab: CSV Checker</h2>
          </div>
          <p className="text-xs text-[#9db0c8] mt-1">
            Upload a CSV file to inspect its rows, columns, and empty cells. Your file stays in this browser; it is not uploaded to a server.
          </p>
        </div>

        {/* Quick Sample datasets picker */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <span className="text-[11px] text-[#9db0c8] font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#35d5e8]" />
            Practice samples:
          </span>
          {SAMPLE_DATASETS.map((ds) => (
            <button
              key={ds.id}
              onClick={() => handleLoadSample(ds)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#14243a] hover:bg-[#203650] text-[#35d5e8] border border-[#263b55] transition-colors whitespace-nowrap cursor-pointer"
              title={ds.description}
            >
              {ds.id === 'retail_sales' ? 'Karachi Mart' : ds.id === 'ecommerce_orders' ? 'E-Com Orders' : 'Store Expenses'}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="md:col-span-2">
          <input
            ref={fileInputRef}
            type="file"
            id="csvFile"
            accept=".csv,text/csv"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#35516f] hover:border-[#35d5e8] bg-[#091626]/80 hover:bg-[#0b1c30] rounded-xl p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1.5 min-h-[96px]"
          >
            <UploadCloud className="w-6 h-6 text-[#35d5e8]" />
            <div className="text-xs font-medium text-[#edf5ff]">
              {file ? (
                <span className="text-[#35d5e8] font-semibold">{file.name}</span>
              ) : (
                <span>Click or drop a CSV file here (up to 5 MB)</span>
              )}
            </div>
            <span className="text-[11px] text-[#9db0c8]">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Spreadsheet data is parsed locally in browser memory'}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-[#091626] border border-[#263b55] rounded-xl p-3.5">
          <div className="text-xs text-[#9db0c8] space-y-1">
            <span className="text-xs font-semibold text-white block">Audit Invariants:</span>
            <div className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#46d39a]" />
              <span>Null value detection</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#46d39a]" />
              <span>Duplicate row counts</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#46d39a]" />
              <span>Numerical aggregations</span>
            </div>
          </div>
          <button
            id="analyzeBtn"
            onClick={() => {
              if (fileInputRef.current?.files?.[0]) {
                handleFileUpload(fileInputRef.current.files[0]);
              } else if (!analysis) {
                // If nothing is selected, load the default store dataset
                handleLoadSample(SAMPLE_DATASETS[0]);
              }
            }}
            disabled={isProcessing}
            className="w-full mt-2 py-2 px-3 rounded-lg bg-[#35d5e8] hover:bg-[#20c8dc] text-[#05202b] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{isProcessing ? 'Analyzing...' : analysis ? 'Re-Analyze CSV' : 'Analyze Sample CSV'}</span>
          </button>
        </div>
      </div>

      {/* Error state */}
      {errorMsg && (
        <div className="p-3 mb-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Analysis Output Section */}
      {analysis ? (
        <div className="mt-4 space-y-4">
          {/* Quick Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3">
              <span className="text-[11px] text-[#9db0c8] block">Data Rows</span>
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                {analysis.totalRows}
              </span>
            </div>
            <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3">
              <span className="text-[11px] text-[#9db0c8] block">Columns</span>
              <span className="text-xl font-bold font-mono text-[#35d5e8] tabular-nums">
                {analysis.totalColumns}
              </span>
            </div>
            <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3">
              <span className="text-[11px] text-[#9db0c8] block">Duplicate Rows</span>
              <span
                className={`text-xl font-bold font-mono tabular-nums ${
                  analysis.duplicateRowCount > 0 ? 'text-amber-400' : 'text-[#46d39a]'
                }`}
              >
                {analysis.duplicateRowCount}
              </span>
            </div>
            <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3">
              <span className="text-[11px] text-[#9db0c8] block">Dataset Health</span>
              <span className="text-xl font-bold font-mono text-[#46d39a] tabular-nums">
                {analysis.overallHealthScore}/100
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-between border-b border-[#263b55] pb-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'audit'
                    ? 'bg-[#203650] text-[#35d5e8]'
                    : 'text-[#9db0c8] hover:text-white'
                }`}
              >
                Inspection Report
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-[#203650] text-[#35d5e8]'
                    : 'text-[#9db0c8] hover:text-white'
                }`}
              >
                Data Table ({analysis.rows.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'stats'
                    ? 'bg-[#203650] text-[#35d5e8]'
                    : 'text-[#9db0c8] hover:text-white'
                }`}
              >
                Column Breakdown
              </button>
            </div>

            {analysis.duplicateRowCount > 0 && (
              <button
                onClick={handleDownloadCleaned}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#46d39a] hover:text-emerald-300 font-medium px-2 py-1 rounded bg-[#091626] border border-[#263b55]"
                title="Download version with duplicates removed"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Clean & Export</span>
              </button>
            )}
          </div>

          {/* Tab 1: Inspection Output (Matches prototype output format exactly + clean styling) */}
          {activeTab === 'audit' && (
            <div className="bg-[#091626] border border-[#263b55] rounded-xl p-4 font-mono text-xs text-[#cfe4f7] leading-relaxed">
              <div className="pb-2 mb-3 border-b border-[#263b55] flex items-center justify-between">
                <span className="font-bold text-[#35d5e8]">
                  File: {analysis.fileName} ({(analysis.fileSizeBytes / 1024).toFixed(1)} KB)
                </span>
                <span className="text-[11px] text-[#9db0c8]">
                  Data rows: {analysis.totalRows} | Columns: {analysis.totalColumns}
                </span>
              </div>

              <div className="text-[#9db0c8] mb-2 font-semibold">Columns and empty cells:</div>
              <div className="space-y-1 mb-4">
                {analysis.columnsAudit.map((col, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                    <span className="text-white">
                      {col.name || `(unnamed_${idx + 1})`}:
                    </span>
                    <span
                      className={`font-semibold ${
                        col.emptyCount > 0 ? 'text-amber-400' : 'text-[#46d39a]'
                      }`}
                    >
                      {col.emptyCount} empty ({col.emptyPercentage}%)
                    </span>
                  </div>
                ))}
              </div>

              {analysis.duplicateRowCount > 0 && (
                <div className="p-2.5 rounded bg-amber-950/30 border border-amber-800 text-amber-300 text-[11px] mb-3">
                  ⚠️ Note: Detected {analysis.duplicateRowCount} duplicate row(s). In data cleaning, de-duplication prevents inflating your financial and sales totals.
                </div>
              )}

              <div className="text-[11px] text-[#9db0c8] pt-2 border-t border-[#263b55]/60">
                Note: This is an in-browser CSV inspection, not a full statistical audit.
              </div>
            </div>
          )}

          {/* Tab 2: Interactive Data Table */}
          {activeTab === 'preview' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9db0c8]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search records..."
                    className="w-full bg-[#091626] border border-[#263b55] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#9db0c8] focus:outline-none focus:border-[#35d5e8]"
                  />
                </div>
                <div className="text-xs text-[#9db0c8]">
                  Showing {paginatedRows.length} of {filteredRows.length} rows
                </div>
              </div>

              <div className="overflow-x-auto border border-[#263b55] rounded-xl bg-[#091626]">
                <table className="w-full text-left text-xs text-[#cfe4f7]">
                  <thead className="bg-[#14243a] text-white font-semibold border-b border-[#263b55]">
                    <tr>
                      <th className="py-2.5 px-3 text-[#9db0c8] w-10">#</th>
                      {analysis.headers.map((h, i) => (
                        <th key={i} className="py-2.5 px-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#263b55]/60 font-mono text-[11px]">
                    {paginatedRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#101d30] transition-colors">
                        <td className="py-2 px-3 text-[#9db0c8]">
                          {(currentPage - 1) * PAGE_SIZE + rIdx + 1}
                        </td>
                        {row.map((val, cIdx) => (
                          <td key={cIdx} className="py-2 px-3 whitespace-nowrap">
                            {val === '' ? (
                              <span className="text-amber-400/80 italic font-sans text-[10px]">
                                (empty)
                              </span>
                            ) : (
                              val
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between text-xs text-[#9db0c8] pt-1">
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1 rounded bg-[#14243a] hover:bg-[#203650] disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1 rounded bg-[#14243a] hover:bg-[#203650] disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Column Breakdown & Numerical Stats */}
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.columnsAudit.map((col, idx) => (
                <div
                  key={idx}
                  className="bg-[#091626] border border-[#263b55] rounded-xl p-3.5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{col.name}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#14243a] text-[#35d5e8]">
                      {col.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#9db0c8] py-1 border-y border-[#263b55]/60">
                    <div>
                      Empty: <span className="text-white font-mono">{col.emptyCount}</span> ({col.emptyPercentage}%)
                    </div>
                    <div>
                      Unique values: <span className="text-white font-mono">{col.uniqueCount}</span>
                    </div>
                  </div>

                  {col.stats && (
                    <div className="bg-[#101d30] rounded-lg p-2 text-[11px] font-mono grid grid-cols-2 gap-x-2 gap-y-1">
                      <div className="text-[#9db0c8]">
                        Min: <span className="text-white">{col.stats.min.toLocaleString()}</span>
                      </div>
                      <div className="text-[#9db0c8]">
                        Max: <span className="text-white">{col.stats.max.toLocaleString()}</span>
                      </div>
                      <div className="text-[#9db0c8]">
                        Avg: <span className="text-[#35d5e8]">{col.stats.avg.toLocaleString()}</span>
                      </div>
                      <div className="text-[#9db0c8]">
                        Sum: <span className="text-[#46d39a]">{col.stats.sum.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-[#9db0c8] truncate">
                    Sample: {col.sampleValues.join(', ') || 'No non-empty values'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          id="csvOutput"
          className="bg-[#091626] border border-[#263b55] p-5 rounded-xl text-center text-xs text-[#9db0c8]"
        >
          <Database className="w-8 h-8 text-[#35516f] mx-auto mb-2" />
          <p className="font-medium text-white">Choose a CSV file or load a sample above to begin analysis.</p>
          <p className="text-[11px] text-[#9db0c8] mt-1">
            Tests column counts, missing cells, row sizes, duplicates, and numerical summaries.
          </p>
        </div>
      )}
    </div>
  );
};
