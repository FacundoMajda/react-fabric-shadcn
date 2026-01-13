import { useEffect } from 'react'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const HomePage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()

    useEffect(() => {
        setBreadcrumbs([{ label: 'Home' }])
    }, [setBreadcrumbs])

    return (
        <div className="p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Bienvenido al Template React + Shadcn</h1>
                <p className="text-lg text-muted-foreground mb-6">
                    Un punto de partida moderno para tus aplicaciones React con TypeScript y componentes UI elegantes.
                </p>
                <Button size="lg">Comenzar</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Componentes UI</CardTitle>
                        <CardDescription>
                            Colección completa de componentes accesibles y personalizables.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Ver componentes</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Routing</CardTitle>
                        <CardDescription>
                            Navegación fluida con React Router configurada.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Explorar rutas</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Estado Global</CardTitle>
                        <CardDescription>
                            Gestión de estado con Zustand y React Query.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Ver estado</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default HomePage