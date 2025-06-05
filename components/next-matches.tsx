import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function NextMatches() {
  const matches = [
    {
      id: 1,
      home: "Domingo Savio",
      away: "Instituto Villada",
      date: "05/05/2024",
      time: "15:00",
      venue: "Estadio Municipal",
    },
    {
      id: 2,
      home: "Gabriel Taborin",
      away: "Sagrada Familia",
      date: "05/05/2024",
      time: "17:30",
      venue: "Campo Deportivo Norte",
    },
    {
      id: 3,
      home: "Luis Manuel Robles",
      away: "ITR",
      date: "06/05/2024",
      time: "16:00",
      venue: "Complejo Deportivo Este",
    },
  ]

  return (
    <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur">
      <CardHeader className="bg-muted/50 pb-3">
        <CardTitle className="text-lg">Próximos Partidos</CardTitle>
        <CardDescription>Jornada 6</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {matches.map((match) => (
            <div key={match.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-1 flex-col items-center text-center">
                  <Image
                    src={`/images/logos/${match.home === "Gabriel Taborin" ? "sagrada-familia" : match.home.toLowerCase().replace(" ", "-")}.png`}
                    alt={match.home}
                    width={40}
                    height={40}
                    className="mb-1 rounded-full"
                  />
                  <h3 className="text-xs font-medium">{match.home}</h3>
                </div>

                <div className="mx-2 text-center">
                  <div className="text-sm font-medium">VS</div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {match.time}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col items-center text-center">
                  <Image
                    src={`/images/logos/${match.away === "Gabriel Taborin" ? "sagrada-familia" : match.away.toLowerCase().replace(" ", "-")}.png`}
                    alt={match.away}
                    width={40}
                    height={40}
                    className="mb-1 rounded-full"
                  />
                  <h3 className="text-xs font-medium">{match.away}</h3>
                </div>
              </div>

              <div className="mt-2 text-center text-xs text-muted-foreground">
                <p>
                  {match.date} - {match.venue}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4 text-center">
          <Link href="/calendario" className="text-sm text-primary hover:underline">
            Ver calendario completo
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
