export interface Lesson {
  id: number;
  stageNumber: string;
  tag: string;
  timeEstimate: string;
  title: string;
  titleUrdu: string;
  shortDesc: string;
  shortDescUrdu: string;
  task: string;
  taskUrdu: string;
  category: 'foundation' | 'spreadsheets' | 'quality' | 'database' | 'python' | 'visualization' | 'project';
  concepts: string[];
  urduExplanation: string;
  englishExplanation: string;
  realWorldExample: {
    scenario: string;
    scenarioUrdu: string;
    dataSnippet: string;
    lessonTakeaway: string;
  };
  interactiveExercise: {
    type: 'calculation' | 'formula' | 'sql' | 'cleaning' | 'python' | 'insights';
    prompt: string;
    promptUrdu: string;
    hint: string;
    defaultCode?: string;
    solution: string | string[];
    explanation: string;
  };
}

export interface CsvColumnAudit {
  name: string;
  type: 'numeric' | 'text' | 'date' | 'boolean';
  emptyCount: number;
  emptyPercentage: number;
  uniqueCount: number;
  sampleValues: string[];
  stats?: {
    min: number;
    max: number;
    avg: number;
    sum: number;
  };
}

export interface CsvAnalysisResult {
  fileName: string;
  fileSizeBytes: number;
  totalRows: number;
  totalColumns: number;
  headers: string[];
  rows: string[][];
  columnsAudit: CsvColumnAudit[];
  duplicateRowCount: number;
  overallHealthScore: number;
}
