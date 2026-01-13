// src/app/modules/design-editor/hooks/useCanvasHistory.ts

import { useCallback, useRef, useState } from "react";
import type { Canvas } from "fabric";

const MAX_HISTORY = 50;

export function useCanvasHistory(canvas: Canvas | null) {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoRef = useRef(false);

  const saveState = useCallback(() => {
    if (!canvas || isUndoRedoRef.current) return;

    const state = JSON.stringify(canvas.toJSON());
    setHistory((prev) => {
      const newHistory = [...prev.slice(0, historyIndex + 1), state];
      return newHistory.slice(-MAX_HISTORY);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [canvas, historyIndex]);

  const undo = useCallback(async () => {
    if (!canvas || historyIndex <= 0) return;

    isUndoRedoRef.current = true;
    const prevState = history[historyIndex - 1];

    await canvas.loadFromJSON(JSON.parse(prevState), () => {
      canvas.requestRenderAll();
      setHistoryIndex((prev) => prev - 1);
      isUndoRedoRef.current = false;
    });
  }, [canvas, history, historyIndex]);

  const redo = useCallback(async () => {
    if (!canvas || historyIndex >= history.length - 1) return;

    isUndoRedoRef.current = true;
    const nextState = history[historyIndex + 1];

    await canvas.loadFromJSON(JSON.parse(nextState), () => {
      canvas.requestRenderAll();
      setHistoryIndex((prev) => prev + 1);
      isUndoRedoRef.current = false;
    });
  }, [canvas, history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory: () => {
      setHistory([]);
      setHistoryIndex(-1);
    },
  };
}
