import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Trophy, Users, User, ChevronLeft, BarChart2 } from "lucide-react"

export const generateMetadata = ({ params }: { params: { id: string } }): Metadata => {
  const team = getTeamData(params.id)

  if (!team) {
    return {
      title: "Equipo no encontrado | LIFuS",
    }
  }

  return {
    title: `${team.name} | LIFuS`,
    description: `Información del equipo ${team.fullName} de la Liga de Fútbol Intercolegial Secundaria`,
  }
}

interface TeamData {
  id: string
  name: string
  fullName: string
  position: number
  played: number
  won: number
  drawn: number
  lost: number
  coach: string
  captain: string
  nextMatch: {
    opponent: string
    date: string
    time: string
    venue: string
    isHome: boolean
  }
  players: number
  zone: "Zona 1" | "Zona 2"
}

function getTeamData(id: string): TeamData | null {
  const teams: Record<string, TeamData> = {
    // Zona 2
    itr: {
      id: "itr",
      name: "ITR",
      fullName: "Instituto Técnico Renault",
      position: 1,
      played: 5,
      won: 4,
      drawn: 1,
      lost: 0,
      coach: "Carlos Rodríguez",
      captain: "Lucas Martínez",
      nextMatch: {
        opponent: "Luis Manuel Robles",
        date: "06/05/2024",
        time: "16:00",
        venue: "Complejo Deportivo Este",
        isHome: false,
      },
      players: 18,
      zone: "Zona 2",
    },
    "santo-tomas": {
      id: "santo-tomas",
      name: "Santo Tomás",
      fullName: "Colegio Santo Tomás",
      position: 2,
      played: 5,
      won: 3,
      drawn: 1,
      lost: 1,
      coach: "Miguel Sánchez",
      captain: "Fernando Rodríguez",
      nextMatch: {
        opponent: "Domingo Savio",
        date: "12/05/2024",
        time: "15:00",
        venue: "Estadio Municipal",
        isHome: true,
      },
      players: 20,
      zone: "Zona 2",
    },
    "domingo-savio": {
      id: "domingo-savio",
      name: "Domingo Savio",
      fullName: "Instituto Domingo Savio",
      position: 3,
      played: 5,
      won: 3,
      drawn: 0,
      lost: 2,
      coach: "Roberto Fernández",
      captain: "Matías González",
      nextMatch: {
        opponent: "Instituto Villada",
        date: "05/05/2024",
        time: "15:00",
        venue: "Estadio Municipal",
        isHome: true,
      },
      players: 19,
      zone: "Zona 2",
    },
    villada: {
      id: "villada",
      name: "Instituto Villada",
      fullName: "Instituto Técnico Villada",
      position: 4,
      played: 5,
      won: 2,
      drawn: 1,
      lost: 2,
      coach: "Alejandro Gómez",
      captain: "Javier Pérez",
      nextMatch: {
        opponent: "Domingo Savio",
        date: "05/05/2024",
        time: "15:00",
        venue: "Estadio Municipal",
        isHome: false,
      },
      players: 21,
      zone: "Zona 2",
    },
    taborin: {
      id: "taborin",
      name: "Gabriel Taborin",
      fullName: "Colegio Gabriel Taborin",
      position: 5,
      played: 5,
      won: 2,
      drawn: 0,
      lost: 3,
      coach: "Daniel López",
      captain: "Andrés López",
      nextMatch: {
        opponent: "Sagrada Familia",
        date: "05/05/2024",
        time: "17:30",
        venue: "Campo Deportivo Norte",
        isHome: true,
      },
      players: 17,
      zone: "Zona 2",
    },
    "sagrada-familia": {
      id: "sagrada-familia",
      name: "Sagrada Familia",
      fullName: "Colegio Sagrada Familia",
      position: 6,
      played: 5,
      won: 1,
      drawn: 1,
      lost: 3,
      coach: "Martín Díaz",
      captain: "Ricardo Fernández",
      nextMatch: {
        opponent: "Gabriel Taborin",
        date: "05/05/2024",
        time: "17:30",
        venue: "Campo Deportivo Norte",
        isHome: false,
      },
      players: 18,
      zone: "Zona 2",
    },
    robles: {
      id: "robles",
      name: "Luis Manuel Robles",
      fullName: "Instituto Luis Manuel Robles",
      position: 7,
      played: 5,
      won: 0,
      drawn: 1,
      lost: 4,
      coach: "Pablo García",
      captain: "Diego García",
      nextMatch: {
        opponent: "ITR",
        date: "06/05/2024",
        time: "16:00",
        venue: "Complejo Deportivo Este",
        isHome: true,
      },
      players: 16,
      zone: "Zona 2",
    },

    // Zona 1 - Nuevos equipos
    "san-martin": {
      id: "san-martin",
      name: "San Martín",
      fullName: "Colegio General San Martín",
      position: 1,
      played: 5,
      won: 4,
      drawn: 1,
      lost: 0,
      coach: "Eduardo Pereyra",
      captain: "Mateo Sánchez",
      nextMatch: {
        opponent: "Belgrano",
        date: "07/05/2024",
        time: "15:30",
        venue: "Estadio Central",
        isHome: true,
      },
      players: 22,
      zone: "Zona 1",
    },
    belgrano: {
      id: "belgrano",
      name: "Belgrano",
      fullName: "Instituto Manuel Belgrano",
      position: 2,
      played: 5,
      won: 4,
      drawn: 0,
      lost: 1,
      coach: "Javier Álvarez",
      captain: "Tomás Gutiérrez",
      nextMatch: {
        opponent: "San Martín",
        date: "07/05/2024",
        time: "15:30",
        venue: "Estadio Central",
        isHome: false,
      },
      players: 20,
      zone: "Zona 1",
    },
    "san-jose": {
      id: "san-jose",
      name: "San José",
      fullName: "Colegio San José",
      position: 3,
      played: 5,
      won: 3,
      drawn: 1,
      lost: 1,
      coach: "Marcelo Ramírez",
      captain: "Nicolás Fernández",
      nextMatch: {
        opponent: "La Inmaculada",
        date: "08/05/2024",
        time: "16:00",
        venue: "Complejo Deportivo Oeste",
        isHome: true,
      },
      players: 19,
      zone: "Zona 1",
    },
    inmaculada: {
      id: "inmaculada",
      name: "La Inmaculada",
      fullName: "Instituto La Inmaculada",
      position: 4,
      played: 5,
      won: 2,
      drawn: 2,
      lost: 1,
      coach: "Sergio Morales",
      captain: "Facundo López",
      nextMatch: {
        opponent: "San José",
        date: "08/05/2024",
        time: "16:00",
        venue: "Complejo Deportivo Oeste",
        isHome: false,
      },
      players: 21,
      zone: "Zona 1",
    },
    lasalle: {
      id: "lasalle",
      name: "La Salle",
      fullName: "Colegio La Salle",
      position: 5,
      played: 5,
      won: 2,
      drawn: 1,
      lost: 2,
      coach: "Gustavo Torres",
      captain: "Ignacio Martínez",
      nextMatch: {
        opponent: "Monserrat",
        date: "09/05/2024",
        time: "15:00",
        venue: "Campo Deportivo Sur",
        isHome: false,
      },
      players: 18,
      zone: "Zona 1",
    },
    monserrat: {
      id: "monserrat",
      name: "Monserrat",
      fullName: "Colegio Nacional de Monserrat",
      position: 6,
      played: 5,
      won: 1,
      drawn: 1,
      lost: 3,
      coach: "Hernán Vázquez",
      captain: "Santiago Díaz",
      nextMatch: {
        opponent: "La Salle",
        date: "09/05/2024",
        time: "15:00",
        venue: "Campo Deportivo Sur",
        isHome: true,
      },
      players: 17,
      zone: "Zona 1",
    },
    carbó: {
      id: "carbó",
      name: "Carbó",
      fullName: "Instituto Alejandro Carbó",
      position: 7,
      played: 5,
      won: 0,
      drawn: 0,
      lost: 5,
      coach: "Federico Romero",
      captain: "Luciano Gómez",
      nextMatch: {
        opponent: "San Martín",
        date: "14/05/2024",
        time: "16:30",
        venue: "Estadio Central",
        isHome: false,
      },
      players: 16,
      zone: "Zona 1",
    },
  }

  return teams[id] || null
}

function getTeamLogoPath(teamId: string): string {
  return `/images/logos/${teamId}.png`
}

export default function TeamPage({ params }: { params: { id: string } }) {
  const team = getTeamData(params.id)

  if (!team) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/equipos?zone=${team.zone === "Zona 1" ? "1" : "2"}`}
        className="mb-6 inline-flex items-center text-sm text-primary hover:underline"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Volver a equipos
      </Link>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <div className="h-2 w-full bg-red-600"></div>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Image
                  src={getTeamLogoPath(team.id) || "/placeholder.svg"}
                  alt={team.name}
                  width={120}
                  height={120}
                  className="mx-auto rounded-full border-4 border-muted p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=120&width=120"
                  }}
                />
              </div>
              <CardTitle className="text-2xl">{team.name}</CardTitle>
              <p className="text-muted-foreground">{team.fullName}</p>
              <Badge variant="outline" className="mt-2">
                {team.zone}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">PJ</p>
                  <p className="text-lg font-medium">{team.played}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">PG</p>
                  <p className="text-lg font-medium">{team.won}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">PP</p>
                  <p className="text-lg font-medium">{team.lost}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Entrenador:</span>
                  <span className="text-sm">{team.coach}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Capitán:</span>
                  <span className="text-sm">{team.captain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Jugadores:</span>
                  <span className="text-sm">{team.players}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-5 w-5 text-primary" />
                  Próximo Partido
                </h3>
                <div className="rounded-lg border border-border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">vs {team.nextMatch.opponent}</span>
                    <Badge variant="outline">{team.nextMatch.isHome ? "Local" : "Visitante"}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>
                      {team.nextMatch.date} - {team.nextMatch.time}
                    </p>
                    <p>{team.nextMatch.venue}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="jugadores">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jugadores">Jugadores</TabsTrigger>
              <TabsTrigger value="partidos">Partidos</TabsTrigger>
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="jugadores" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Plantilla</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <span className="font-medium">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">Jugador {index + 1}</p>
                          <p className="text-xs text-muted-foreground">Posición</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      Ver plantilla completa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="partidos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Partidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="rounded-lg border border-border p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Jornada {5 - index} - {index === 0 ? "28/04/2024" : `${21 - index * 7}/04/2024`}
                          </span>
                          <Badge variant={index === 0 ? "secondary" : "outline"}>
                            {index === 0 ? "Último" : "Finalizado"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{team.name}</span>
                            <span className={`text-${index % 2 === 0 ? "primary" : "muted-foreground"}`}>
                              {index % 2 === 0 ? "3" : "1"}
                            </span>
                          </div>
                          <span className="text-xs">vs</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-${index % 2 === 0 ? "muted-foreground" : "primary"}`}>
                              {index % 2 === 0 ? "1" : "2"}
                            </span>
                            <span className="font-medium">Oponente {5 - index}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estadisticas" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estadísticas del Equipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Rendimiento</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Partidos jugados</span>
                          <span className="font-medium">{team.played}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Victorias</span>
                          <span className="font-medium">{team.won}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Empates</span>
                          <span className="font-medium">{team.drawn}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Derrotas</span>
                          <span className="font-medium">{team.lost}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Puntos</span>
                          <span className="font-medium">{team.won * 3 + team.drawn}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Goles</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Goles a favor</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Goles en contra</span>
                          <span className="font-medium">4</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Diferencia</span>
                          <span className="font-medium text-primary">+8</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Porterías a cero</span>
                          <span className="font-medium">2</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Promedio por partido</span>
                          <span className="font-medium">2.4</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
