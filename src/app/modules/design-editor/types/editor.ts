// src/app/modules/design-editor/types/editor.ts

import { Canvas, Object as FabricObject } from "fabric";

export interface EditorProject {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  canvasState?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EditorToolOptions {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  blur?: number;
  hue?: number;
  [key: string]: unknown;
}

export interface EditorConfig {
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;
}

export type ToolType =
  | "adjust"
  | "text"
  | "crop"
  | "resize"
  | "background"
  | null;

export interface EditorContextType {
  canvas: Canvas | null;
  activeObject: FabricObject | null;
  activeTool: ToolType;
  project: EditorProject | null;
  isLoading: boolean;
  error: string | null;
}
