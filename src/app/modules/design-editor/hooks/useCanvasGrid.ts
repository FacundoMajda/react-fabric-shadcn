// src/app/modules/design-editor/hooks/useCanvasGrid.ts

import { useEffect } from "react";
import type { Canvas } from "fabric";

export function useCanvasGrid(
  canvas: Canvas | null,
  enabled: boolean,
  gridSize: number = 20
) {
  useEffect(() => {
    if (!canvas || !enabled) return;

    const drawGrid = () => {
      const ctx = canvas.getContext();
      const width = canvas.width || 0;
      const height = canvas.height || 0;

      ctx.save();
      ctx.strokeStyle = "#e0e0e0";
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.restore();
    };

    canvas.on("after:render", drawGrid);

    return () => {
      canvas.off("after:render", drawGrid);
    };
  }, [canvas, enabled, gridSize]);
}
