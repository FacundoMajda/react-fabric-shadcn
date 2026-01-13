// src/app/modules/design-editor/components/AlignmentTools.tsx

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import type { Canvas } from "fabric";
import {
  AlignEndVertical,
  AlignHorizontalJustifyCenter,
  AlignLeft,
  AlignRight,
  AlignStartVertical,
  AlignVerticalJustifyCenter,
} from "lucide-react";

interface AlignmentToolsProps {
  canvas: Canvas | null;
}

export function AlignmentTools({ canvas }: AlignmentToolsProps) {
  const alignLeft = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    activeObject.set("left", 0);
    activeObject.setCoords();
    canvas.requestRenderAll();
  };

  const alignCenter = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const objWidth = (activeObject.width || 0) * (activeObject.scaleX || 1);
    activeObject.set("left", (canvas.width || 0) / 2 - objWidth / 2);
    activeObject.setCoords();
    canvas.requestRenderAll();
  };

  const alignRight = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const objWidth = (activeObject.width || 0) * (activeObject.scaleX || 1);
    activeObject.set("left", (canvas.width || 0) - objWidth);
    activeObject.setCoords();
    canvas.requestRenderAll();
  };

  const alignTop = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    activeObject.set("top", 0);
    activeObject.setCoords();
    canvas.requestRenderAll();
  };

  const alignMiddle = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const objHeight = (activeObject.height || 0) * (activeObject.scaleY || 1);
    activeObject.set("top", (canvas.height || 0) / 2 - objHeight / 2);
    activeObject.setCoords();
    canvas.requestRenderAll();
  };

  const alignBottom = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const objHeight = (activeObject.height || 0) * (activeObject.scaleY || 1);
    activeObject.set("top", (canvas.height || 0) - objHeight);
    activeObject.setCoords();
    canvas.requestRenderAll();
  };

  return (
    <Card className="p-3">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
        Alignment
      </h4>
      <TooltipProvider>
        <div className="grid grid-cols-3 gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={alignLeft}
              >
                <AlignLeft className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={alignCenter}
              >
                <AlignHorizontalJustifyCenter className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Center Horizontally</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={alignRight}
              >
                <AlignRight className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={alignTop}
              >
                <AlignStartVertical className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Top</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={alignMiddle}
              >
                <AlignVerticalJustifyCenter className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Center Vertically</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={alignBottom}
              >
                <AlignEndVertical className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Bottom</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </Card>
  );
}
