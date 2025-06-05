"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield, LogOut } from "lucide-react"
import Image from "next/image"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [activeZone, setActiveZone] = useState<"Zona 1" | "Zona 2">("Zona 1")
  const { user, logout, isAuthenticated } = useAuth()

  // Actualizar el estado basado en el parámetro de URL
  useEffect(() => {
    const zoneParam = searchParams.get("zone")
    if (zoneParam === "2") {
      setActiveZone("Zona 2")
    } else {
      setActiveZone("Zona 1")
    }
  }, [searchParams])

  const handleZoneChange = (zone: "Zona 1" | "Zona 2") => {
    setActiveZone(zone)

    // Actualizar la URL con el parámetro de zona
    const zoneNumber = zone === "Zona 1" ? "1" : "2"

    // Solo actualizar la URL si estamos en la página de equipos
    if (pathname === "/equipos") {
      router.push(`/equipos?zone=${zoneNumber}`)
    } else {
      // Si no estamos en la página de equipos, redirigir a ella con el parámetro
      router.push(`/equipos?zone=${zoneNumber}`)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Equipos", href: "/equipos" },
    { name: "Resultados", href: "/resultados" },
    { name: "Estadísticas", href: "/estadisticas" },
    { name: "Calendario", href: "/calendario" },
    { name: "Noticias", href: "/noticias" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logos/lifus-logo.png" alt="LIFUS Logo" width={50} height={50} className="h-12 w-12" />
            <span className="text-xl font-bold tracking-tight">
              LI<span className="text-red-600">F</span>uS
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-red-600">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden flex-col gap-2 md:flex">
            <button onClick={() => handleZoneChange("Zona 1")} className="flex items-center gap-2">
              <div
                className={`relative h-4 w-4 rounded-full border ${activeZone === "Zona 1" ? "border-red-600" : "border-gray-400"}`}
              >
                <div
                  className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${activeZone === "Zona 1" ? "bg-red-600" : "bg-gray-400"}`}
                ></div>
              </div>
              <span className={`text-xs ${activeZone === "Zona 1" ? "text-red-600 font-medium" : "text-gray-500"}`}>
                Zona 1
              </span>
            </button>
            <button onClick={() => handleZoneChange("Zona 2")} className="flex items-center gap-2">
              <div
                className={`relative h-4 w-4 rounded-full border ${activeZone === "Zona 2" ? "border-red-600" : "border-gray-400"}`}
              >
                <div
                  className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${activeZone === "Zona 2" ? "bg-red-600" : "bg-gray-400"}`}
                ></div>
              </div>
              <span className={`text-xs ${activeZone === "Zona 2" ? "text-red-600 font-medium" : "text-gray-500"}`}>
                Zona 2
              </span>
            </button>
          </div>

          <Link href="/equipos" className="hidden md:inline-flex">
            <Button variant="outline" size="sm">
              Ver Equipos
            </Button>
          </Link>
          <Link href="/calendario" className="hidden md:inline-flex">
            <Button variant="outline" size="sm">
              Calendario
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex items-center gap-1 rounded-full border border-red-600 bg-red-600/10 px-3 py-1">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="text-xs font-medium text-red-600">Admin</span>
              </div>
              <Button size="sm" variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-1 h-4 w-4" />
                Salir
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:inline-flex">
              <Button size="sm">Iniciar Sesión</Button>
            </Link>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                {isAuthenticated && (
                  <div className="flex items-center gap-2 rounded-md border border-red-600 bg-red-600/10 p-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-600">Administrador</span>
                  </div>
                )}

                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 hover:text-red-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Seleccionar Zona:</p>
                  <button
                    onClick={() => {
                      handleZoneChange("Zona 1")
                      setIsOpen(false)
                    }}
                    className="flex w-full items-center gap-2 py-1"
                  >
                    <div
                      className={`relative h-4 w-4 rounded-full border ${activeZone === "Zona 1" ? "border-red-600" : "border-gray-400"}`}
                    >
                      <div
                        className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${activeZone === "Zona 1" ? "bg-red-600" : "bg-gray-400"}`}
                      ></div>
                    </div>
                    <span
                      className={`text-sm ${activeZone === "Zona 1" ? "text-red-600 font-medium" : "text-gray-500"}`}
                    >
                      Zona 1
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleZoneChange("Zona 2")
                      setIsOpen(false)
                    }}
                    className="flex w-full items-center gap-2 py-1"
                  >
                    <div
                      className={`relative h-4 w-4 rounded-full border ${activeZone === "Zona 2" ? "border-red-600" : "border-gray-400"}`}
                    >
                      <div
                        className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${activeZone === "Zona 2" ? "bg-red-600" : "bg-gray-400"}`}
                      ></div>
                    </div>
                    <span
                      className={`text-sm ${activeZone === "Zona 2" ? "text-red-600 font-medium" : "text-gray-500"}`}
                    >
                      Zona 2
                    </span>
                  </button>
                </div>

                <Link
                  href="/equipos"
                  className="flex items-center gap-2 hover:text-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  Ver Equipos
                </Link>
                <Link
                  href="/calendario"
                  className="flex items-center gap-2 hover:text-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  Calendario
                </Link>

                {isAuthenticated ? (
                  <button
                    className="flex items-center gap-2 hover:text-red-600"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                      router.push("/")
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Cerrar Sesión
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 hover:text-red-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
