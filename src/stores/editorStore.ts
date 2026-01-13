// src/stores/editorStore.ts

import { create } from "zustand";
import type { EditorProject } from "@/app/modules/design-editor/types/editor";

interface EditorState {
  currentProject: EditorProject | null;
  history: string[];
  historyIndex: number;
  processingMessage: string | null;

  // Actions
  setProject: (project: EditorProject | null) => void;
  addHistory: (state: string) => void;
  clearHistory: () => void;
  setProcessingMessage: (message: string | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentProject: null,
  history: [],
  historyIndex: -1,
  processingMessage: null,

  setProject: (project) => set({ currentProject: project }),

  addHistory: (state) =>
    set((st) => ({
      history: [...st.history.slice(0, st.historyIndex + 1), state],
      historyIndex: st.historyIndex + 1,
    })),

  clearHistory: () =>
    set({
      history: [],
      historyIndex: -1,
    }),

  setProcessingMessage: (message) => set({ processingMessage: message }),
}));
