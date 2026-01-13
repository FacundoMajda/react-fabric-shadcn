// src/app/modules/design-editor/hooks/useMultiSelect.ts

import { useEffect } from "react";
import type { Canvas, FabricObject, TPointerEventInfo } from "fabric";
import { ActiveSelection } from "fabric";

export function useMultiSelect(canvas: Canvas | null) {
  useEffect(() => {
    if (!canvas) return;

    const handleMouseDown = (opt: TPointerEventInfo) => {
      const evt = opt.e;

      // Check if Ctrl/Cmd key is pressed
      if (!(evt.ctrlKey || evt.metaKey)) return;

      const target = opt.target;

      if (!target) return;

      const activeObject = canvas.getActiveObject();

      if (!activeObject) {
        // No selection, select the clicked object
        canvas.setActiveObject(target);
      } else if (activeObject.type === "activeSelection") {
        // Active selection exists
        const selection = activeObject as ActiveSelection;
        const objects = selection.getObjects();

        if (objects.includes(target as FabricObject)) {
          // Remove from selection
          selection.remove(target as FabricObject);
          if (selection.size() === 0) {
            canvas.discardActiveObject();
          }
        } else {
          // Add to selection
          selection.add(target as FabricObject);
        }
      } else {
        // Single object selected, create multi-selection
        const selection = new ActiveSelection(
          [activeObject, target as FabricObject],
          {
            canvas: canvas,
          }
        );
        canvas.setActiveObject(selection);
      }

      canvas.requestRenderAll();
      evt.preventDefault();
      evt.stopPropagation();
    };

    canvas.on("mouse:down", handleMouseDown);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
    };
  }, [canvas]);
}
