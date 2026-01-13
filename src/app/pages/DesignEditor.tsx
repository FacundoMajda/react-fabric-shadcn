// src/app/pages/DesignEditor.tsx

import { useDesignEditor } from "@/hooks/useDesignEditor";
import { Button } from "@/app/components/ui/button";
import { Image, Type, AlertCircle, Loader2, Square } from "lucide-react";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import {
  LayersPanel,
  PropertiesPanel,
  EditorToolbar,
  GridControls,
} from "@/app/modules/design-editor/components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { toast } from "sonner";
import { useEffect } from "react";

export default function DesignEditorPage() {
  const {
    canvasRef,
    canvas,
    isLoading,
    error,
    addImage,
    addText,
    exportJSON,
    zoomPercentage,
    zoomIn,
    zoomOut,
    zoomToFit,
    undo,
    redo,
    canUndo,
    canRedo,
    saveState,
    showGrid,
    gridSize,
    toggleGrid,
    setGridSize,
  } = useDesignEditor({
    canvasWidth: 800,
    canvasHeight: 600,
    backgroundColor: "#ffffff",
  });

  const handleSave = () => {
    // TODO: Implement save to backend
    toast.success("Project saved locally");
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl) {
      addImage(imageUrl);
      toast.success("Image added");
    }
  };

  const handleAddText = () => {
    const text = prompt("Enter text:", "Edit me");
    if (text) {
      addText(text);
      toast.success("Text added");
    }
  };

  const handleAddShape = () => {
    // TODO: Implement shape tool
    toast.info("Shape tool coming soon");
  };

  const handleExport = (format: "json" | "png") => {
    if (format === "json") {
      const json = exportJSON();
      if (json) {
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `design-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Exported as JSON");
      }
    } else if (format === "png") {
      if (!canvas) return;
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2,
      });
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = `design-${Date.now()}.png`;
      a.click();
      toast.success("Exported as PNG");
    }
  };

  // Save state after modifications
  useEffect(() => {
    if (!canvas) return;

    const handleModification = () => {
      saveState();
    };

    canvas.on("object:added", handleModification);
    canvas.on("object:modified", handleModification);
    canvas.on("object:removed", handleModification);

    return () => {
      canvas.off("object:added", handleModification);
      canvas.off("object:modified", handleModification);
      canvas.off("object:removed", handleModification);
    };
  }, [canvas, saveState]);

  return (
    <div className="h-full w-full">
      {/* Toolbar */}
      <div className="mb-4">
        <EditorToolbar
          zoomPercentage={zoomPercentage}
          canUndo={canUndo}
          canRedo={canRedo}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onZoomFit={zoomToFit}
          onUndo={undo}
          onRedo={redo}
          onSave={handleSave}
          onExport={handleExport}
        />
      </div>

      <div className="flex gap-4 h-[calc(100vh-12rem)]">
        {/* Main Canvas Area */}
        <div className="flex-1 flex items-center justify-center bg-muted/20 rounded-lg border overflow-hidden">
          <div className="relative" style={{ width: "800px", height: "600px" }}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10 rounded-lg">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {error && (
              <Alert
                variant="destructive"
                className="absolute top-4 left-4 right-4 z-20"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {/* BUG #8 FIX: Remove Tailwind CSS classes from canvas element */}
            <canvas ref={canvasRef} width={800} height={600} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 flex flex-col">
          <Tabs defaultValue="layers" className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="layers" className="flex-1">
                Layers
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex-1">
                Properties
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex-1">
                Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="layers" className="flex-1 m-0 p-0">
              <LayersPanel canvas={canvas} />
            </TabsContent>

            <TabsContent
              value="properties"
              className="flex-1 m-0 p-0 overflow-auto"
            >
              <div className="p-4 space-y-4">
                <PropertiesPanel canvas={canvas} />
              </div>
            </TabsContent>

            <TabsContent value="tools" className="flex-1 m-0 p-0 overflow-auto">
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    Grid Settings
                  </h3>
                  <GridControls
                    showGrid={showGrid}
                    gridSize={gridSize}
                    onToggleGrid={toggleGrid}
                    onIncreaseGridSize={() =>
                      setGridSize(Math.min(gridSize + 10, 100))
                    }
                    onDecreaseGridSize={() =>
                      setGridSize(Math.max(gridSize - 10, 10))
                    }
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button
                      onClick={handleAddImage}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Add Image (I)
                    </Button>
                    <Button
                      onClick={handleAddText}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Type className="h-4 w-4 mr-2" />
                      Add Text (T)
                    </Button>
                    <Button
                      onClick={handleAddShape}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Square className="h-4 w-4 mr-2" />
                      Add Shape (S)
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
