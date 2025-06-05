import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function LatestMatch() {
  return (
    <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur">
      <CardHeader className="bg-muted/50 pb-3">
        <CardTitle className="text-lg">Último Partido</CardTitle>
        <CardDescription>Jornada 5 - 28/04/2024</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col items-center text-center">
              <Image src="/images/logos/itr.png" alt="ITR" width={60} height={60} className="mb-2 rounded-full" />
              <h3 className="text-sm font-medium">ITR</h3>
              <Badge variant="outline" className="mt-1 border-primary text-primary">
                Local
              </Badge>
            </div>

            <div className="mx-4 text-center">
              <div className="text-3xl font-bold">
                <span className="text-primary">3</span>
                <span className="mx-2">-</span>
                <span>1</span>
              </div>
              <Badge variant="secondary" className="mt-1">
                Finalizado
              </Badge>
            </div>

            <div className="flex flex-1 flex-col items-center text-center">
              <Image
                src="/images/logos/santo-tomas.png"
                alt="Santo Tomás"
                width={60}
                height={60}
                className="mb-2 rounded-full"
              />
              <h3 className="text-sm font-medium">Santo Tomás</h3>
              <Badge variant="outline" className="mt-1">
                Visitante
              </Badge>
            </div>
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Goles:</span>
              <span>Martínez (2), González - Pérez</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Tarjetas:</span>
              <span>2 amarillas - 1 amarilla, 1 roja</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link href="/resultados" className="text-sm text-primary hover:underline">
              Ver resumen completo
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
