// src/hooks/useDesignEditor.ts

import { useState } from "react";
import { useEditor } from "@/app/modules/design-editor/hooks/useEditor";
import { useTool } from "@/app/modules/design-editor/hooks/useTool";
import { useCanvasState } from "@/app/modules/design-editor/hooks/useCanvasState";
import { useCanvasZoom } from "@/app/modules/design-editor/hooks/useCanvasZoom";
import { useCanvasHistory } from "@/app/modules/design-editor/hooks/useCanvasHistory";
import { useCanvasPan } from "@/app/modules/design-editor/hooks/useCanvasPan";
import { useCanvasGrid } from "@/app/modules/design-editor/hooks/useCanvasGrid";
import { useMultiSelect } from "@/app/modules/design-editor/hooks/useMultiSelect";
import { useEditorStore } from "@/stores/editorStore";
import type { EditorConfig } from "@/app/modules/design-editor/types/editor";

/**
 * Hook público para usar el design editor en cualquier componente
 *
 * @example
 * const { canvas, addImage, selectTool, exportJSON } = useDesignEditor();
 */
export function useDesignEditor(config: Partial<EditorConfig> = {}) {
  const finalConfig: EditorConfig = {
    canvasWidth: config.canvasWidth ?? 800,
    canvasHeight: config.canvasHeight ?? 600,
    backgroundColor: config.backgroundColor ?? "#ffffff",
  };

  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(20);

  const editor = useEditor(finalConfig);
  const tool = useTool();
  const state = useCanvasState(editor.canvas);
  const zoom = useCanvasZoom(editor.canvas);
  const history = useCanvasHistory(editor.canvas);
  const store = useEditorStore();

  // Initialize new hooks
  useCanvasPan(editor.canvas);
  useCanvasGrid(editor.canvas, showGrid, gridSize);
  useMultiSelect(editor.canvas);

  return {
    // Canvas
    canvas: editor.canvas,
    canvasRef: editor.canvasRef,
    isLoading: editor.isLoading,
    error: editor.error,
    isInitialized: editor.isInitialized, // BUG #6 FIX

    // Tools
    activeTool: tool.activeTool,
    selectTool: tool.selectTool,
    updateToolOptions: tool.updateToolOptions,
    clearTool: tool.clearTool,

    // Canvas State
    addObject: state.addObject,
    addImage: state.addImage,
    addText: state.addText,
    deleteActive: state.deleteActive,
    exportJSON: state.getCanvasJSON,

    // Zoom
    zoom: zoom.zoom,
    zoomPercentage: zoom.zoomPercentage,
    zoomIn: zoom.zoomIn,
    zoomOut: zoom.zoomOut,
    zoomToFit: zoom.zoomToFit,
    setZoomLevel: zoom.setZoomLevel,

    // History
    undo: history.undo,
    redo: history.redo,
    canUndo: history.canUndo,
    canRedo: history.canRedo,
    saveState: history.saveState,
    clearHistory: history.clearHistory,

    // Grid
    showGrid,
    gridSize,
    toggleGrid: () => setShowGrid(!showGrid),
    setGridSize,

    // Project
    project: store.currentProject,
    setProject: store.setProject,
    processingMessage: store.processingMessage,
    setProcessingMessage: store.setProcessingMessage,
  };
}
