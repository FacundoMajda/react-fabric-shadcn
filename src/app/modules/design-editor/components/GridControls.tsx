// src/app/modules/design-editor/components/GridControls.tsx

import { Grid, Minus, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

interface GridControlsProps {
  showGrid: boolean;
  gridSize: number;
  onToggleGrid: () => void;
  onIncreaseGridSize: () => void;
  onDecreaseGridSize: () => void;
}

export function GridControls({
  showGrid,
  gridSize,
  onToggleGrid,
  onIncreaseGridSize,
  onDecreaseGridSize,
}: GridControlsProps) {
  return (
    <Card className="p-2">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={showGrid ? "default" : "outline"}
                size="sm"
                onClick={onToggleGrid}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Grid (G)</p>
            </TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onDecreaseGridSize}
                disabled={!showGrid || gridSize <= 10}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Decrease Grid Size</p>
            </TooltipContent>
          </Tooltip>

          <span className="text-sm font-medium w-12 text-center">
            {gridSize}px
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onIncreaseGridSize}
                disabled={!showGrid || gridSize >= 100}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Increase Grid Size</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
}
