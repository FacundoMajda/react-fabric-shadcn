// src/app/modules/design-editor/hooks/useCanvasPan.ts

import { useEffect } from "react";
import type { Canvas } from "fabric";

export function useCanvasPan(canvas: Canvas | null) {
  useEffect(() => {
    if (!canvas) return;

    let isDragging = false;
    let lastPosX = 0;
    let lastPosY = 0;

    const handleMouseDown = (opt: any) => {
      const evt = opt.e;
      // Solo pan con Space + Click o botón central del mouse
      if (evt.button === 1 || evt.shiftKey) {
        isDragging = true;
        lastPosX = evt.clientX;
        lastPosY = evt.clientY;
        canvas.selection = false;
        canvas.defaultCursor = "grabbing";
      }
    };

    const handleMouseMove = (opt: any) => {
      if (!isDragging) return;

      const evt = opt.e;
      const vpt = canvas.viewportTransform;
      if (!vpt) return;

      vpt[4] += evt.clientX - lastPosX;
      vpt[5] += evt.clientY - lastPosY;

      canvas.requestRenderAll();
      lastPosX = evt.clientX;
      lastPosY = evt.clientY;
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      canvas.selection = true;
      canvas.defaultCursor = "default";
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
    };
  }, [canvas]);
}
