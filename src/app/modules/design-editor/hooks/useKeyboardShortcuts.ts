// src/app/modules/design-editor/hooks/useKeyboardShortcuts.ts

import { useEffect } from "react";

interface ShortcutHandlers {
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onSelectAll?: () => void;
  onDeselect?: () => void;
  onSelectTool?: () => void;
  onImageTool?: () => void;
  onTextTool?: () => void;
  onShapeTool?: () => void;
  onExport?: () => void;
  onToggleGrid?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Evitar shortcuts cuando se está en un input
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }

      // Ctrl/Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              handlers.onRedo?.();
            } else {
              handlers.onUndo?.();
            }
            break;
          case "y":
            e.preventDefault();
            handlers.onRedo?.();
            break;
          case "s":
            e.preventDefault();
            handlers.onSave?.();
            break;
          case "e":
            e.preventDefault();
            handlers.onExport?.();
            break;
          case "c":
            e.preventDefault();
            handlers.onCopy?.();
            break;
          case "v":
            e.preventDefault();
            handlers.onPaste?.();
            break;
          case "a":
            e.preventDefault();
            handlers.onSelectAll?.();
            break;
        }
      } else {
        // Single keys (tool shortcuts)
        switch (e.key.toLowerCase()) {
          case "v":
            e.preventDefault();
            handlers.onSelectTool?.();
            break;
          case "i":
            e.preventDefault();
            handlers.onImageTool?.();
            break;
          case "t":
            e.preventDefault();
            handlers.onTextTool?.();
            break;
          case "s":
            e.preventDefault();
            handlers.onShapeTool?.();
            break;
          case "g":
            e.preventDefault();
            handlers.onToggleGrid?.();
            break;
          case "delete":
          case "backspace":
            e.preventDefault();
            handlers.onDelete?.();
            break;
          case "escape":
            e.preventDefault();
            handlers.onDeselect?.();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
}
