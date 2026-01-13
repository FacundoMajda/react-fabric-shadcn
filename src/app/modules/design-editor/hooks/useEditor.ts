// src/app/modules/design-editor/hooks/useEditor.ts

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "fabric";
import type { EditorConfig, EditorProject } from "../types/editor";

export function useEditor(config: EditorConfig) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // BUG #3 & #6 FIX

  useEffect(() => {
    let isMounted = true;

    const initializeCanvas = async () => {
      if (!canvasRef.current || fabricCanvasRef.current) return;

      setIsLoading(true);

      try {
        const { Canvas: FabricCanvas, Rect: FabricRect } = await import(
          "fabric"
        );

        if (!isMounted || !canvasRef.current) return;

        // BUG #4 FIX: Solo constructor, NO setDimensions()
        const newCanvas = new FabricCanvas(canvasRef.current, {
          width: config.canvasWidth,
          height: config.canvasHeight,
          backgroundColor: config.backgroundColor || "#ffffff",
          renderOnAddRemove: false, // CRÍTICO para React
          enableRetinaScaling: true,
          selection: true,
          preserveObjectStacking: true,
        } as any);

        // BUG #5 FIX: originX/originY explícitos
        const testRect = new FabricRect({
          left: 100,
          top: 100,
          width: 200,
          height: 100,
          fill: "#ff0000",
          stroke: "#000000",
          strokeWidth: 2,
          originX: "left", // v7 fix
          originY: "top", // v7 fix
          objectCaching: false,
        });

        newCanvas.add(testRect);
        newCanvas.renderAll(); // BUG #1 & #2 FIX: Síncrono después de add()

        fabricCanvasRef.current = newCanvas;
        setIsInitialized(true); // BUG #3 FIX: Solo flag, no setCanvas()
        setError(null);
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Initialization failed"
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initializeCanvas();

    return () => {
      isMounted = false;
      if (fabricCanvasRef.current) {
        const currentCanvas = fabricCanvasRef.current;
        fabricCanvasRef.current = null;
        setIsInitialized(false);
        currentCanvas.dispose();
      }
    };
  }, [config.canvasWidth, config.canvasHeight, config.backgroundColor]);

  // BUG #7 FIX: Método addObject
  const addObject = useCallback(
    async (
      fabricObject: any,
      options?: { center?: boolean; render?: boolean }
    ) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas || !isInitialized) return false;

      // Auto-fix origin si no está definido
      if (!fabricObject.originX) fabricObject.originX = "left";
      if (!fabricObject.originY) fabricObject.originY = "top";

      canvas.add(fabricObject);
      fabricObject.setCoords();

      if (options?.center) {
        canvas.centerObject(fabricObject);
        fabricObject.setCoords();
      }

      if (options?.render !== false) {
        canvas.renderAll(); // Síncrono
      }

      return true;
    },
    [isInitialized]
  );

  const loadProject = useCallback(
    async (project: EditorProject) => {
      const canvas = fabricCanvasRef.current;
      if (!canvas || !project.canvasState || !isInitialized) return false;

      try {
        setIsLoading(true);
        const json = JSON.parse(project.canvasState);
        await canvas.loadFromJSON(json);

        canvas.getObjects().forEach((obj) => {
          obj.set({ objectCaching: false });
          obj.setCoords();
        });

        canvas.renderAll();
        setError(null);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Load failed");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isInitialized]
  );

  const clearCanvas = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !isInitialized) return;
    canvas.clear();
    canvas.renderAll();
  }, [isInitialized]);

  const renderCanvas = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !isInitialized) return;
    canvas.renderAll();
  }, [isInitialized]);

  const dispose = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      fabricCanvasRef.current = null;
      setIsInitialized(false);
      canvas.dispose();
    }
  }, []);

  return {
    canvasRef,
    canvas: fabricCanvasRef.current, // BUG #3 FIX: Desde ref, no state
    isLoading,
    error,
    isInitialized, // BUG #6 FIX
    addObject, // BUG #7 FIX
    loadProject,
    clearCanvas,
    renderCanvas,
    dispose,
  };
}
