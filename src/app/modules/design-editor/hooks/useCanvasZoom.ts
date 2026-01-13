// src/app/modules/design-editor/hooks/useCanvasZoom.ts

import { useCallback, useEffect, useState } from "react";
import type { Canvas } from "fabric";
import { Point } from "fabric";

const ZOOM_STEP = 0.1;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

export function useCanvasZoom(canvas: Canvas | null) {
  const [zoom, setZoom] = useState(1);

  // Mouse wheel zoom
  useEffect(() => {
    if (!canvas) return;

    const handleWheel = (opt: any) => {
      const delta = opt.e.deltaY;
      let newZoom = canvas.getZoom();
      newZoom *= 0.999 ** delta;

      if (newZoom > MAX_ZOOM) newZoom = MAX_ZOOM;
      if (newZoom < MIN_ZOOM) newZoom = MIN_ZOOM;

      // Zoom hacia el puntero del mouse
      canvas.zoomToPoint(new Point(opt.e.offsetX, opt.e.offsetY), newZoom);

      setZoom(newZoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    };

    canvas.on("mouse:wheel", handleWheel);

    return () => {
      canvas.off("mouse:wheel", handleWheel);
    };
  }, [canvas]);

  const handleZoom = useCallback(
    (delta: number) => {
      if (!canvas) return;

      const newZoom = Math.min(Math.max(zoom + delta, MIN_ZOOM), MAX_ZOOM);
      setZoom(newZoom);
      canvas.setZoom(newZoom);
      canvas.requestRenderAll();
    },
    [canvas, zoom]
  );

  const zoomIn = useCallback(() => {
    handleZoom(ZOOM_STEP);
  }, [handleZoom]);

  const zoomOut = useCallback(() => {
    handleZoom(-ZOOM_STEP);
  }, [handleZoom]);

  const zoomToFit = useCallback(() => {
    if (!canvas) return;
    const newZoom = 1;
    setZoom(newZoom);
    canvas.setZoom(newZoom);
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    canvas.requestRenderAll();
  }, [canvas]);

  const setZoomLevel = useCallback(
    (level: number) => {
      if (!canvas) return;
      const newZoom = Math.min(Math.max(level, MIN_ZOOM), MAX_ZOOM);
      setZoom(newZoom);
      canvas.setZoom(newZoom);
      canvas.requestRenderAll();
    },
    [canvas]
  );

  return {
    zoom,
    zoomIn,
    zoomOut,
    zoomToFit,
    setZoomLevel,
    zoomPercentage: Math.round(zoom * 100),
  };
}
