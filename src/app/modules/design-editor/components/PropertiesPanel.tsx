// src/app/modules/design-editor/components/PropertiesPanel.tsx

import { useEffect, useState } from "react";
import type { Canvas, FabricObject } from "fabric";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Slider } from "@/app/components/ui/slider";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";

interface PropertiesPanelProps {
  canvas: Canvas | null;
}

export function PropertiesPanel({ canvas }: PropertiesPanelProps) {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [properties, setProperties] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    angle: 0,
    opacity: 100,
  });

  useEffect(() => {
    if (!canvas) return;

    const updateProperties = () => {
      const active = canvas.getActiveObject();
      if (active) {
        setSelectedObject(active);
        setProperties({
          left: Math.round(active.left || 0),
          top: Math.round(active.top || 0),
          width: Math.round((active.width || 0) * (active.scaleX || 1)),
          height: Math.round((active.height || 0) * (active.scaleY || 1)),
          angle: Math.round(active.angle || 0),
          opacity: Math.round((active.opacity || 1) * 100),
        });
      } else {
        setSelectedObject(null);
      }
    };

    updateProperties();

    canvas.on("selection:created", updateProperties);
    canvas.on("selection:updated", updateProperties);
    canvas.on("selection:cleared", updateProperties);
    canvas.on("object:modified", updateProperties);
    canvas.on("object:moving", updateProperties);
    canvas.on("object:scaling", updateProperties);
    canvas.on("object:rotating", updateProperties);

    return () => {
      canvas.off("selection:created", updateProperties);
      canvas.off("selection:updated", updateProperties);
      canvas.off("selection:cleared", updateProperties);
      canvas.off("object:modified", updateProperties);
      canvas.off("object:moving", updateProperties);
      canvas.off("object:scaling", updateProperties);
      canvas.off("object:rotating", updateProperties);
    };
  }, [canvas]);

  const updateProperty = (key: string, value: number) => {
    if (!selectedObject || !canvas) return;

    switch (key) {
      case "left":
      case "top":
      case "angle":
        selectedObject.set(key, value);
        break;
      case "opacity":
        selectedObject.set("opacity", value / 100);
        break;
      case "width":
        selectedObject.set("scaleX", value / (selectedObject.width || 1));
        break;
      case "height":
        selectedObject.set("scaleY", value / (selectedObject.height || 1));
        break;
    }

    selectedObject.setCoords();
    canvas.requestRenderAll();
  };

  if (!selectedObject) {
    return (
      <Card className="h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No object selected</p>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Properties</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Position & Size */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">
              Position
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="x" className="text-xs">
                  X
                </Label>
                <Input
                  id="x"
                  type="number"
                  value={properties.left}
                  onChange={(e) =>
                    updateProperty("left", Number(e.target.value))
                  }
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="y" className="text-xs">
                  Y
                </Label>
                <Input
                  id="y"
                  type="number"
                  value={properties.top}
                  onChange={(e) =>
                    updateProperty("top", Number(e.target.value))
                  }
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Size */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">
              Size
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="width" className="text-xs">
                  Width
                </Label>
                <Input
                  id="width"
                  type="number"
                  value={properties.width}
                  onChange={(e) =>
                    updateProperty("width", Number(e.target.value))
                  }
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="height" className="text-xs">
                  Height
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={properties.height}
                  onChange={(e) =>
                    updateProperty("height", Number(e.target.value))
                  }
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Rotation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="rotation" className="text-xs">
                Rotation
              </Label>
              <span className="text-xs text-muted-foreground">
                {properties.angle}°
              </span>
            </div>
            <Slider
              id="rotation"
              min={0}
              max={360}
              step={1}
              value={[properties.angle]}
              onValueChange={([value]) => updateProperty("angle", value)}
            />
          </div>

          <Separator />

          {/* Opacity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="opacity" className="text-xs">
                Opacity
              </Label>
              <span className="text-xs text-muted-foreground">
                {properties.opacity}%
              </span>
            </div>
            <Slider
              id="opacity"
              min={0}
              max={100}
              step={1}
              value={[properties.opacity]}
              onValueChange={([value]) => updateProperty("opacity", value)}
            />
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}
