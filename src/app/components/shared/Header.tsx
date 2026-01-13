import { Fragment } from "react"
import { Separator } from "@radix-ui/react-separator"
import { SidebarTrigger } from "../ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { Button } from "../ui/button"
import { useTheme } from "next-themes"
import { Themes } from "@/app/constants"
import { Moon, Sun } from "lucide-react"



export const Header = () => {
    const theme = useTheme()
    const { breadcrumbs } = useBreadcrumbs()

    const toggleTheme = () => {
        theme.setTheme(theme.resolvedTheme === "light" ? "dark" : "light")
    }

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/40 sticky top-0 z-50 border-b backdrop-blur-md  md:rounded-tl-xl md:rounded-tr-xl">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px mx-2 data-[orientation=vertical]:h-4 "
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((crumb, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem className={index === breadcrumbs.length - 1 ? "" : "hidden md:block"}>
                                    {index === breadcrumbs.length - 1 ? (
                                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={crumb.href || "#"}>
                                            {crumb.label}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbs.length - 1 && (
                                    <BreadcrumbSeparator className="hidden md:block" />
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant={'secondary'} onClick={toggleTheme}>
                        {
                            theme.resolvedTheme === Themes.LIGHT ? (
                                <Sun className="size-5" />
                            ) : (
                                <Moon className="size-5" />
                            )
                        }
                        {/* <span className="sr-only">Cambiar</span> */}
                    </Button>
                </div>
            </div>
        </header>
    )
}