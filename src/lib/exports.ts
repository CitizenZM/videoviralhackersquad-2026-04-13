import { ExportJob } from "./types";

export type ExportPayload = {
  projectId: string;
  format: ExportJob["format"];
  title?: string;
};

export type ExportResult = ExportJob & {
  downloadUrl?: string;
};

export const exportFormatLabels: Record<ExportJob["format"], string> = {
  pdf: "Executive report",
  slides: "Client presentation",
  csv: "Content library",
  notion: "Notion workspace",
};

export function createExportJob(payload: ExportPayload): ExportResult {
  return {
    id: `export-${Date.now()}`,
    format: payload.format,
    status: "queued",
    createdAt: new Date().toISOString(),
  };
}

export function markExportReady(job: ExportJob, downloadUrl: string): ExportResult {
  return {
    ...job,
    status: "ready",
    downloadUrl,
  };
}
