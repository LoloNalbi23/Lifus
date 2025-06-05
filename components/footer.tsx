import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logos/lifus-logo.png" alt="LIFUS Logo" width={30} height={30} className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight">
                LI<span className="text-red-600">F</span>uS
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">Liga Intercolegial de Fútbol Secundaria</p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/equipos" className="text-muted-foreground hover:text-red-600">
                  Equipos
                </Link>
              </li>
              <li>
                <Link href="/resultados" className="text-muted-foreground hover:text-red-600">
                  Resultados
                </Link>
              </li>
              <li>
                <Link href="/estadisticas" className="text-muted-foreground hover:text-red-600">
                  Estadísticas
                </Link>
              </li>
              <li>
                <Link href="/calendario" className="text-muted-foreground hover:text-red-600">
                  Calendario
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-muted-foreground hover:text-red-600">
                  Noticias
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">Equipos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/equipos?zone=2" className="text-muted-foreground hover:text-red-600">
                  Zona 2
                </Link>
              </li>
              <li>
                <Link href="/equipos?zone=1" className="text-muted-foreground hover:text-red-600">
                  Zona 1
                </Link>
              </li>
              <li>
                <Link href="/equipos/itr" className="text-muted-foreground hover:text-red-600">
                  ITR
                </Link>
              </li>
              <li>
                <Link href="/equipos/santo-tomas" className="text-muted-foreground hover:text-red-600">
                  Santo Tomás
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: contacto@lifus.edu</li>
              <li className="text-muted-foreground">Teléfono: +54 351 123 4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Liga Intercolegial de Fútbol Secundaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
