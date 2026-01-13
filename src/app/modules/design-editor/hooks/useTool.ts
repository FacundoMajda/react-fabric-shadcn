// src/app/modules/design-editor/hooks/useTool.ts

import { useCallback, useState } from "react";
import type { ToolType } from "../types/editor";

export function useTool() {
  const [activeTool, setActiveTool] = useState<ToolType>(null);
  const [toolOptions, setToolOptions] = useState<Record<string, any>>({});

  const selectTool = useCallback((tool: ToolType) => {
    setActiveTool((prev) => (prev === tool ? null : tool));
  }, []);

  const updateToolOptions = useCallback((options: Record<string, any>) => {
    setToolOptions((prev) => ({ ...prev, ...options }));
  }, []);

  const clearTool = useCallback(() => {
    setActiveTool(null);
    setToolOptions({});
  }, []);

  return {
    activeTool,
    toolOptions,
    selectTool,
    updateToolOptions,
    clearTool,
  };
}
