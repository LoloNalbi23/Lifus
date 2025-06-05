"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

function getTeamLogoPath(teamName: string): string {
  const teamMap: Record<string, string> = {
    "Equipo 1": "/images/logos/itr.png",
    "Equipo 2": "/images/logos/santo-tomas.png",
    "Equipo 3": "/images/logos/domingo-savio.png",
    "Equipo 4": "/images/logos/villada.png",
    "Equipo 5": "/images/logos/sagrada-familia.png",
    "Equipo 6": "/images/logos/robles.png",
    ITR: "/images/logos/itr.png",
    "Santo Tomás": "/images/logos/santo-tomas.png",
    "Domingo Savio": "/images/logos/domingo-savio.png",
    "Instituto Villada": "/images/logos/villada.png",
    "Sagrada Familia": "/images/logos/sagrada-familia.png",
    "Gabriel Taborin": "/images/logos/taborin.png",
    "Luis Manuel Robles": "/images/logos/robles.png",
  }

  return teamMap[teamName] || "/placeholder.svg?height=60&width=60"
}

// Datos de ejemplo para las jornadas
const matchesByJourneys = [
  // Jornada 1
  {
    number: 1,
    date: "31/03/2024",
    matches: [
      {
        homeTeam: "ITR",
        awayTeam: "Santo Tomás",
        homeScore: 2,
        awayScore: 0,
        homeGoals: "Martínez L. (2)",
        awayGoals: "-",
        homeCards: "1 amarilla",
        awayCards: "2 amarillas",
        stadium: "Estadio Municipal",
      },
      {
        homeTeam: "Domingo Savio",
        awayTeam: "Instituto Villada",
        homeScore: 1,
        awayScore: 1,
        homeGoals: "González M.",
        awayGoals: "Pérez J.",
        homeCards: "1 amarilla",
        awayCards: "1 amarilla",
        stadium: "Campo Deportivo Norte",
      },
      {
        homeTeam: "Gabriel Taborin",
        awayTeam: "Luis Manuel Robles",
        homeScore: 3,
        awayScore: 0,
        homeGoals: "López A. (2), Fernández R.",
        awayGoals: "-",
        homeCards: "sin tarjetas",
        awayCards: "1 roja",
        stadium: "Complejo Deportivo Este",
      },
    ],
  },
  // Jornada 2
  {
    number: 2,
    date: "07/04/2024",
    matches: [
      {
        homeTeam: "Santo Tomás",
        awayTeam: "Gabriel Taborin",
        homeScore: 2,
        awayScore: 1,
        homeGoals: "Rodríguez F. (2)",
        awayGoals: "López A.",
        homeCards: "1 amarilla",
        awayCards: "2 amarillas",
        stadium: "Estadio Municipal",
      },
      {
        homeTeam: "Instituto Villada",
        awayTeam: "ITR",
        homeScore: 0,
        awayScore: 2,
        homeGoals: "-",
        awayGoals: "Martínez L., González T.",
        homeCards: "2 amarillas",
        awayCards: "1 amarilla",
        stadium: "Campo Deportivo Norte",
      },
      {
        homeTeam: "Luis Manuel Robles",
        awayTeam: "Sagrada Familia",
        homeScore: 1,
        awayScore: 2,
        homeGoals: "García D.",
        awayGoals: "Fernández R. (2)",
        homeCards: "3 amarillas",
        awayCards: "1 amarilla",
        stadium: "Complejo Deportivo Este",
      },
    ],
  },
  // Jornada 3
  {
    number: 3,
    date: "14/04/2024",
    matches: [
      {
        homeTeam: "ITR",
        awayTeam: "Luis Manuel Robles",
        homeScore: 4,
        awayScore: 0,
        homeGoals: "Martínez L. (2), Sánchez T., Gómez C.",
        awayGoals: "-",
        homeCards: "sin tarjetas",
        awayCards: "2 amarillas",
        stadium: "Estadio Municipal",
      },
      {
        homeTeam: "Sagrada Familia",
        awayTeam: "Santo Tomás",
        homeScore: 1,
        awayScore: 3,
        homeGoals: "Fernández R.",
        awayGoals: "Rodríguez F. (2), Gómez L.",
        homeCards: "1 amarilla, 1 roja",
        awayCards: "1 amarilla",
        stadium: "Campo Deportivo Norte",
      },
      {
        homeTeam: "Gabriel Taborin",
        awayTeam: "Instituto Villada",
        homeScore: 1,
        awayScore: 2,
        homeGoals: "López A.",
        awayGoals: "Pérez J., Díaz M.",
        homeCards: "2 amarillas",
        awayCards: "2 amarillas",
        stadium: "Complejo Deportivo Este",
      },
    ],
  },
  // Jornada 4
  {
    number: 4,
    date: "21/04/2024",
    matches: [
      {
        homeTeam: "Instituto Villada",
        awayTeam: "Sagrada Familia",
        homeScore: 2,
        awayScore: 0,
        homeGoals: "Pérez J., Díaz M.",
        awayGoals: "-",
        homeCards: "1 amarilla",
        awayCards: "2 amarillas",
        stadium: "Estadio Municipal",
      },
      {
        homeTeam: "Santo Tomás",
        awayTeam: "Luis Manuel Robles",
        homeScore: 2,
        awayScore: 1,
        homeGoals: "Rodríguez F., Gómez L.",
        awayGoals: "García D.",
        homeCards: "1 amarilla",
        awayCards: "2 amarillas, 1 roja",
        stadium: "Campo Deportivo Norte",
      },
      {
        homeTeam: "Domingo Savio",
        awayTeam: "Gabriel Taborin",
        homeScore: 3,
        awayScore: 0,
        homeGoals: "González M. (2), Martínez A.",
        awayGoals: "-",
        homeCards: "sin tarjetas",
        awayCards: "3 amarillas",
        stadium: "Complejo Deportivo Este",
      },
    ],
  },
  // Jornada 5
  {
    number: 5,
    date: "28/04/2024",
    matches: [
      {
        homeTeam: "ITR",
        awayTeam: "Santo Tomás",
        homeScore: 3,
        awayScore: 1,
        homeGoals: "Martínez L. (2), González T.",
        awayGoals: "Rodríguez F.",
        homeCards: "2 amarillas",
        awayCards: "1 amarilla, 1 roja",
        stadium: "Estadio Municipal",
      },
      {
        homeTeam: "Sagrada Familia",
        awayTeam: "Domingo Savio",
        homeScore: 0,
        awayScore: 3,
        homeGoals: "-",
        awayGoals: "González M. (2), Rodríguez C.",
        homeCards: "2 amarillas",
        awayCards: "sin tarjetas",
        stadium: "Campo Deportivo Norte",
      },
      {
        homeTeam: "Luis Manuel Robles",
        awayTeam: "Instituto Villada",
        homeScore: 1,
        awayScore: 3,
        homeGoals: "García D.",
        awayGoals: "Pérez J. (2), Díaz M.",
        homeCards: "1 amarilla",
        awayCards: "1 amarilla",
        stadium: "Complejo Deportivo Este",
      },
    ],
  },
]

export default function ResultsPageClient() {
  const [currentJourney, setCurrentJourney] = useState(4) // Empezamos en la jornada 5 (índice 4)

  const goToPreviousJourney = () => {
    if (currentJourney > 0) {
      setCurrentJourney(currentJourney - 1)
    }
  }

  const goToNextJourney = () => {
    if (currentJourney < matchesByJourneys.length - 1) {
      setCurrentJourney(currentJourney + 1)
    }
  }

  const goToJourney = (journeyIndex: number) => {
    setCurrentJourney(journeyIndex)
  }

  const currentJourneyData = matchesByJourneys[currentJourney]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Resultados por Jornadas</h1>
        <p className="mt-2 text-muted-foreground">Todos los resultados de la Liga de Fútbol Intercolegial Secundaria</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={goToPreviousJourney} disabled={currentJourney === 0}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Jornada anterior</span>
        </Button>
        <h2 className="text-xl font-bold">
          Jornada {currentJourneyData.number} - {currentJourneyData.date}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextJourney}
          disabled={currentJourney === matchesByJourneys.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Jornada siguiente</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {currentJourneyData.matches.map((match, index) => (
              <div key={index} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 flex-col items-center text-center">
                    <Image
                      src={getTeamLogoPath(match.homeTeam) || "/placeholder.svg"}
                      alt={match.homeTeam}
                      width={60}
                      height={60}
                      className="mb-2 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=60&width=60"
                      }}
                    />
                    <h3 className="text-sm font-medium">{match.homeTeam}</h3>
                  </div>

                  <div className="mx-4 text-center">
                    <div className="text-3xl font-bold">
                      <span className={match.homeScore > match.awayScore ? "text-primary" : ""}>{match.homeScore}</span>
                      <span className="mx-2">-</span>
                      <span className={match.awayScore > match.homeScore ? "text-primary" : ""}>{match.awayScore}</span>
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      Finalizado
                    </Badge>
                  </div>

                  <div className="flex flex-1 flex-col items-center text-center">
                    <Image
                      src={getTeamLogoPath(match.awayTeam) || "/placeholder.svg"}
                      alt={match.awayTeam}
                      width={60}
                      height={60}
                      className="mb-2 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=60&width=60"
                      }}
                    />
                    <h3 className="text-sm font-medium">{match.awayTeam}</h3>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Goles:</span>
                    <span>
                      {match.homeGoals} - {match.awayGoals}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Tarjetas:</span>
                    <span>
                      {match.homeCards} - {match.awayCards}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Estadio:</span>
                    <span>{match.stadium}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-center">
        <div className="flex space-x-2">
          {matchesByJourneys.map((journey, index) => (
            <Button
              key={journey.number}
              variant={currentJourney === index ? "default" : "outline"}
              size="sm"
              className="min-w-[40px]"
              onClick={() => goToJourney(index)}
            >
              {journey.number}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
