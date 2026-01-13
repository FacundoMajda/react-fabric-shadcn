import { useEffect, useState } from 'react'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Switch } from '../components/ui/switch'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { GenericFileUpload } from '../components/shared/GenericFileUpload'
import { Activity, Users, FileText, TrendingUp, Settings } from 'lucide-react'

const FeaturePage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [isUploading, setIsUploading] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)

    useEffect(() => {
        setBreadcrumbs([{ label: 'Features' }])
    }, [setBreadcrumbs])

    const handleFileSelect = async (file: File) => {
        setIsUploading(true)
        setUploadedFile(file)

        // Simular subida de archivo
        setTimeout(() => {
            setIsUploading(false)
            console.log('Archivo subido:', file.name)
        }, 2000)
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Características</h1>
                <p className="text-muted-foreground">Explora las funcionalidades disponibles</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de Ejemplo</CardTitle>
                        <CardDescription>
                            Demostración de componentes de formulario
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" placeholder="Ingresa tu nombre" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="tu@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Mensaje</Label>
                            <Textarea id="message" placeholder="Tu mensaje aquí..." />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="notifications" />
                            <Label htmlFor="notifications">Recibir notificaciones</Label>
                        </div>
                        <Button className="w-full">Enviar</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Acciones Rápidas</CardTitle>
                        <CardDescription>
                            Botones y controles interactivos
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="default">Primario</Button>
                            <Button variant="secondary">Secundario</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                        </div>
                        <div className="space-y-2">
                            <Button variant="destructive" className="w-full">Eliminar</Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Este template incluye una amplia gama de componentes UI listos para usar.
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Subida de Archivos</CardTitle>
                        <CardDescription>
                            Componente de drag & drop para subir archivos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GenericFileUpload
                            onFileSelect={handleFileSelect}
                            isUploading={isUploading}
                        />
                        {uploadedFile && !isUploading && (
                            <div className="mt-4 p-4 bg-muted rounded-lg">
                                <p className="text-sm font-medium">Archivo subido exitosamente:</p>
                                <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>


            {/* Nueva sección: Estadísticas y métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,543</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+12.5%</span> desde el mes pasado
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Archivos Procesados</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600">+8.2%</span> desde la semana pasada
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Actividad Diaria</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">89.4%</div>
                        <p className="text-xs text-muted-foreground">
                            Tasa de actividad promedio
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+23.1%</div>
                        <p className="text-xs text-muted-foreground">
                            Comparado con el trimestre anterior
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Nueva sección: Componentes avanzados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Progreso y Estados</CardTitle>
                        <CardDescription>
                            Barras de progreso y badges para mostrar estados
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Progreso de carga</span>
                                <span>75%</span>
                            </div>
                            <Progress value={75} className="w-full" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Procesamiento de datos</span>
                                <span>45%</span>
                            </div>
                            <Progress value={45} className="w-full" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="default">Activo</Badge>
                            <Badge variant="secondary">Pendiente</Badge>
                            <Badge variant="destructive">Error</Badge>
                            <Badge variant="outline">Completado</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Controles Interactivos</CardTitle>
                        <CardDescription>
                            Selectores y pestañas para navegación
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="category">Categoría</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="docs">Documentación</SelectItem>
                                    <SelectItem value="tutorials">Tutoriales</SelectItem>
                                    <SelectItem value="examples">Ejemplos</SelectItem>
                                    <SelectItem value="api">API</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="overview">Vista General</TabsTrigger>
                                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                <TabsTrigger value="settings">Configuración</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Información general del sistema y métricas principales.
                                </p>
                            </TabsContent>
                            <TabsContent value="analytics" className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Datos analíticos y reportes de rendimiento.
                                </p>
                            </TabsContent>
                            <TabsContent value="settings" className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Configuraciones y preferencias del usuario.
                                </p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Nueva sección: Información del sistema */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Información del Sistema
                    </CardTitle>
                    <CardDescription>
                        Detalles técnicos y estado del template
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Tecnologías</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>• React 19 + TypeScript</p>
                                <p>• Vite + Tailwind CSS</p>
                                <p>• Shadcn/UI Components</p>
                                <p>• React Router + React Query</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Estado</h4>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm">Sistema operativo</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm">Base de datos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span className="text-sm">Cache</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Última actualización</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Versión: 1.0.0</p>
                                <p>Fecha: {new Date().toLocaleDateString()}</p>
                                <p>Estado: Estable</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FeaturePage