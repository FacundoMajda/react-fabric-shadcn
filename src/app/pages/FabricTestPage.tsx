// Test page aislada para verificar Fabric.js v7
import { useEffect, useRef, useState } from 'react';

export default function FabricTestPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<string>('Inicializando...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initCanvas = async () => {
      if (!canvasRef.current) {
        setError('Canvas ref is null');
        return;
      }

      try {
        setStatus('Importando Fabric.js...');
        const { Canvas, Rect, FabricText, Circle } = await import('fabric');

        if (!mounted) return;

        setStatus('Creando canvas...');
        
        // PASO 1: Crear canvas básico
        const canvas = new Canvas(canvasRef.current, {
          width: 800,
          height: 600,
          backgroundColor: '#f0f0f0',
        });

        setStatus('Canvas creado. Configurando dimensiones...');

        // PASO 2: Forzar dimensiones (crítico en v7)
        canvas.setDimensions({ width: 800, height: 600 });

        setStatus('Agregando objetos de prueba...');

        // PASO 3: Agregar objetos de prueba
        const rect = new Rect({
          left: 100,
          top: 100,
          width: 200,
          height: 150,
          fill: '#ff0000',
          stroke: '#000000',
          strokeWidth: 3,
          originX: 'left',
          originY: 'top',
        });

        const text = new FabricText('¡Hola Fabric v7! 🎨', {
          left: 120,
          top: 50,
          fontSize: 32,
          fill: '#0000ff',
          fontFamily: 'Arial',
          originX: 'left',
          originY: 'top',
        });

        const circle = new Circle({
          left: 500,
          top: 300,
          radius: 80,
          fill: '#00ff00',
          stroke: '#000000',
          strokeWidth: 2,
          originX: 'left',
          originY: 'top',
        });

        const successText = new FabricText('✓ Canvas funciona correctamente', {
          left: 100,
          top: 400,
          fontSize: 24,
          fill: '#008800',
          fontFamily: 'Arial',
          originX: 'left',
          originY: 'top',
        });

        canvas.add(rect, text, circle, successText);

        setStatus('Renderizando canvas...');

        // PASO 4: Render final
        canvas.requestRenderAll();

        // PASO 5: Verificación
        setTimeout(() => {
          const objectCount = canvas.getObjects().length;
          const canvasData = canvas.toDataURL();
          
          console.log('🎨 Fabric Test Results:', {
            objectCount,
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
            backgroundColor: canvas.backgroundColor,
            hasData: canvasData.length > 1000,
            canvasDataPreview: canvasData.substring(0, 100),
          });

          if (objectCount === 4) {
            setStatus(`✅ Canvas listo! ${objectCount} objetos renderizados`);
          } else {
            setError(`⚠️ Se esperaban 4 objetos, se encontraron ${objectCount}`);
          }
        }, 500);

      } catch (err) {
        if (mounted) {
          const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
          setError(`❌ Error: ${errorMsg}`);
          console.error('Fabric initialization error:', err);
        }
      }
    };

    initCanvas();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">🧪 Fabric.js v7 - Test Aislado</h1>
          <p className="text-gray-600 mb-4">
            Esta página verifica si Fabric.js v7 funciona correctamente en tu entorno
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Estado:</span>
              <span className={error ? 'text-red-600' : 'text-blue-600'}>
                {error || status}
              </span>
            </div>
          </div>

          <div className="border-4 border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="text-sm text-gray-600 mb-4">
              Canvas test - Los objetos deberían ser visibles abajo:
            </p>
            <div className="flex justify-center">
              <canvas 
                ref={canvasRef}
                className="border-2 border-black"
                width={800}
                height={600}
              />
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
            <h3 className="font-bold mb-2">✅ Qué deberías ver:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Fondo gris claro (#f0f0f0)</li>
              <li>Rectángulo rojo (100, 100)</li>
              <li>Texto azul "¡Hola Fabric v7! 🎨"</li>
              <li>Círculo verde (500, 300)</li>
              <li>Texto de confirmación verde</li>
              <li>Todos los objetos deberían ser seleccionables y arrastrables</li>
            </ul>
          </div>

          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="font-bold mb-2">🔍 Debug Console</h3>
            <p className="text-sm mb-2">Abre la consola del navegador (F12) y ejecuta:</p>
            <code className="block bg-gray-800 text-green-400 p-2 rounded text-xs">
              document.querySelector('.border-black').toDataURL()
            </code>
            <p className="text-xs text-gray-600 mt-2">
              Debería devolver un string largo (base64) con datos del canvas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
