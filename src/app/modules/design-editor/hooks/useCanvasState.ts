// src/app/modules/design-editor/hooks/useCanvasState.ts

import { useCallback } from "react";
import { Canvas, FabricImage, FabricText } from "fabric";

export function useCanvasState(canvas: Canvas | null) {
  const getCanvasJSON = useCallback(() => {
    if (!canvas) return null;
    return JSON.stringify(canvas.toJSON());
  }, [canvas]);

  // BUG #7 FIX: Añadir método addObject
  const addObject = useCallback(
    async (obj: any) => {
      if (!canvas) return;

      // Auto-fix origin
      if (!obj.originX) obj.originX = "left";
      if (!obj.originY) obj.originY = "top";

      canvas.add(obj);
      obj.setCoords();
      canvas.renderAll(); // Síncrono
    },
    [canvas]
  );

  const addImage = useCallback(
    async (imageUrl: string) => {
      if (!canvas) {
        console.warn("Canvas not initialized");
        return;
      }

      console.log("Adding image to canvas:", imageUrl);
      try {
        const img = await FabricImage.fromURL(imageUrl, {
          crossOrigin: "anonymous",
        });

        // Set position with explicit origin (v7 fix)
        img.set({
          left: 100,
          top: 100,
          originX: "left",
          originY: "top",
          scaleX: 0.5,
          scaleY: 0.5,
          objectCaching: false,
        });

        console.log("Image loaded:", img);
        canvas.add(img);

        // Manual render required when renderOnAddRemove: false
        canvas.renderAll();

        canvas.setActiveObject(img);
        canvas.renderAll();
        console.log(
          "Canvas after adding image:",
          canvas.getObjects().length,
          "objects"
        );
      } catch (err) {
        console.error("Error adding image:", err);
      }
    },
    [canvas]
  );

  const addText = useCallback(
    (text: string = "Edit me", options: any = {}) => {
      if (!canvas) {
        console.warn("Canvas not initialized");
        return;
      }

      console.log("Adding text to canvas:", text);
      try {
        // Random position to avoid overlapping
        const randomX = 50 + Math.random() * 200;
        const randomY = 50 + Math.random() * 200;

        const textObj = new FabricText(text, {
          left: randomX,
          top: randomY,
          fontSize: 32,
          fill: "#FF0000", // Red color to make it super visible
          originX: "left", // v7 changed default to 'center'
          originY: "top", // Must be explicit now
          objectCaching: false, // Disable caching for immediate rendering
          ...options,
        });

        console.log("Text object created:", textObj);
        canvas.add(textObj);

        // Manual render required when renderOnAddRemove: false
        canvas.renderAll();

        canvas.setActiveObject(textObj);
        textObj.setCoords();
        canvas.renderAll();

        console.log("Canvas after adding text:", {
          objectCount: canvas.getObjects().length,
          canvasElement: canvas.getElement(),
          upperCanvas: canvas.upperCanvasEl,
          textBounds: textObj.getBoundingRect(),
          textVisible: textObj.visible,
          textOpacity: textObj.opacity,
        });
      } catch (err) {
        console.error("Error adding text:", err);
      }
    },
    [canvas]
  );

  const deleteActive = useCallback(() => {
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (active) {
      canvas.remove(active);
      canvas.renderAll();
    }
  }, [canvas]);

  const undo = useCallback(() => {
    // TODO: Implementar con history stack
    console.log("Undo not implemented yet");
  }, []);

  const redo = useCallback(() => {
    // TODO: Implementar con history stack
    console.log("Redo not implemented yet");
  }, []);

  return {
    getCanvasJSON,
    addObject, // BUG #7 FIX
    addImage,
    addText,
    deleteActive,
    undo,
    redo,
  };
}
