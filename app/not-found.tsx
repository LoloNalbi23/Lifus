import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary neon-text">404</h1>
        <h2 className="mt-4 text-2xl font-bold">Página no encontrada</h2>
        <p className="mt-2 text-muted-foreground">Lo sentimos, la página que estás buscando no existe.</p>
        <div className="mt-6">
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
