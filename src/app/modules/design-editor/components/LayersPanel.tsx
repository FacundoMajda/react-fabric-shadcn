// src/app/modules/design-editor/components/LayersPanel.tsx

import { useEffect, useState } from "react";
import type { Canvas, FabricObject } from "fabric";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Eye, EyeOff, Lock, Unlock, Trash2 } from "lucide-react";
import { ScrollArea } from "@/app/components/ui/scroll-area";

interface Layer {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
  object: FabricObject;
}

interface LayersPanelProps {
  canvas: Canvas | null;
  onLayerSelect?: (object: FabricObject) => void;
}

export function LayersPanel({ canvas, onLayerSelect }: LayersPanelProps) {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!canvas) return;

    const updateLayers = () => {
      const objects = canvas.getObjects();
      const newLayers: Layer[] = objects
        .map((obj, index) => ({
          id: `layer-${index}`,
          name: (obj as any).name || `${obj.type} ${index + 1}`,
          type: obj.type || "object",
          visible: obj.visible !== false,
          locked: obj.selectable === false,
          object: obj,
        }))
        .reverse();

      setLayers(newLayers);
    };

    updateLayers();

    canvas.on("object:added", updateLayers);
    canvas.on("object:removed", updateLayers);
    canvas.on("object:modified", updateLayers);
    canvas.on("selection:created", (e) => {
      if (e.selected?.[0]) {
        const index = canvas.getObjects().indexOf(e.selected[0]);
        setSelectedId(`layer-${index}`);
      }
    });
    canvas.on("selection:updated", (e) => {
      if (e.selected?.[0]) {
        const index = canvas.getObjects().indexOf(e.selected[0]);
        setSelectedId(`layer-${index}`);
      }
    });
    canvas.on("selection:cleared", () => setSelectedId(null));

    return () => {
      canvas.off("object:added", updateLayers);
      canvas.off("object:removed", updateLayers);
      canvas.off("object:modified", updateLayers);
    };
  }, [canvas]);

  const toggleVisibility = (layer: Layer) => {
    if (!canvas) return;
    layer.object.set("visible", !layer.visible);
    canvas.requestRenderAll();
  };

  const toggleLock = (layer: Layer) => {
    if (!canvas) return;
    layer.object.set("selectable", layer.locked);
    canvas.requestRenderAll();
  };

  const deleteLayer = (layer: Layer) => {
    if (!canvas) return;
    canvas.remove(layer.object);
    canvas.requestRenderAll();
  };

  const selectLayer = (layer: Layer) => {
    if (!canvas || layer.locked) return;
    canvas.setActiveObject(layer.object);
    canvas.requestRenderAll();
    onLayerSelect?.(layer.object);
    setSelectedId(layer.id);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Layers</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {layers.map((layer) => (
            <div
              key={layer.id}
              onClick={() => selectLayer(layer)}
              className={`
                flex items-center gap-2 p-2 rounded cursor-pointer
                hover:bg-accent transition-colors
                ${
                  selectedId === layer.id
                    ? "bg-accent border-l-2 border-primary"
                    : ""
                }
              `}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate capitalize">
                  {layer.name}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  {layer.type}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleVisibility(layer);
                  }}
                >
                  {layer.visible ? (
                    <Eye className="h-3 w-3" />
                  ) : (
                    <EyeOff className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLock(layer);
                  }}
                >
                  {layer.locked ? (
                    <Lock className="h-3 w-3" />
                  ) : (
                    <Unlock className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLayer(layer);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          {layers.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-8">
              No layers yet
            </p>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
