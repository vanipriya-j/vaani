import type { ReactNode } from "react";
export type PresenterNotesData = {
  whatToSay: string;
  questionToAsk?: string;
  expectedResponse?: string;
  transition: string;
};

export type SlideDefinition = {
  id: string;
  notes: PresenterNotesData;
  /** Number of progressive reveal steps after the base slide content */
  reveals: number;
  content: ReactNode;
};

export type TeachingDeckProps = {
  title: string;
  sessionLabel: string;
  slides: SlideDefinition[];
  basePath: string;
};