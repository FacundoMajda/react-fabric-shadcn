import { useEffect } from 'react'
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs'
import { Container } from '../components/shared/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const ContainerDemoPage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()

    useEffect(() => {
        setBreadcrumbs([{ label: 'Container Demo' }])
    }, [setBreadcrumbs])

    return (
        <div className="p-6 space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Demostración del Componente Container</h1>
                <p className="text-lg text-muted-foreground mb-6">
                    Ejemplos de las diferentes variantes del componente Container.
                </p>
            </div>

            <div className="space-y-8">
                <Container variant="narrowConstrainedPadded">
                    <Card>
                        <CardHeader>
                            <CardTitle>Narrow Constrained Padded (Default)</CardTitle>
                            <CardDescription>
                                Variante por defecto: max-w-3xl con padding responsivo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Este es un ejemplo de contenido dentro del container narrowConstrainedPadded.</p>
                        </CardContent>
                    </Card>
                </Container>

                <Container variant="constrainedPadded">
                    <Card>
                        <CardHeader>
                            <CardTitle>Constrained Padded</CardTitle>
                            <CardDescription>
                                max-w-7xl con padding responsivo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Contenido en constrainedPadded. Más ancho que el default.</p>
                        </CardContent>
                    </Card>
                </Container>

                <Container variant="fullMobileConstrainedPadded">
                    <Card>
                        <CardHeader>
                            <CardTitle>Full Mobile Constrained Padded</CardTitle>
                            <CardDescription>
                                max-w-7xl, sin padding en móvil, con padding en sm y lg.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Ejemplo de fullMobileConstrainedPadded.</p>
                        </CardContent>
                    </Card>
                </Container>

                <Container variant="constrainedBreakpointPadded">
                    <Card>
                        <CardHeader>
                            <CardTitle>Constrained Breakpoint Padded</CardTitle>
                            <CardDescription>
                                max-w-screen-xl con padding responsivo.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Contenido en constrainedBreakpointPadded, aún más ancho.</p>
                        </CardContent>
                    </Card>
                </Container>

                <Container variant="fullMobileConstrainedBreakpointPadded">
                    <Card>
                        <CardHeader>
                            <CardTitle>Full Mobile Constrained Breakpoint Padded</CardTitle>
                            <CardDescription>
                                max-w-screen-xl, sin padding en móvil, con padding en sm y lg.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Último ejemplo: fullMobileConstrainedBreakpointPadded.</p>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    )
}

export default ContainerDemoPage