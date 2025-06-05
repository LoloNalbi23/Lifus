import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Calendario | LIFuS",
  description: "Calendario de partidos de la Liga de Fútbol Intercolegial Secundaria",
}

function getTeamLogoPath(teamName: string): string {
  const teamMap: Record<string, string> = {
    "Domingo Savio": "/images/logos/domingo-savio.png",
    "Instituto Villada": "/images/logos/villada.png",
    "Gabriel Taborin": "/images/logos/sagrada-familia.png",
    "Sagrada Familia": "/images/logos/sagrada-familia.png",
    "Luis Manuel Robles": "/images/logos/robles.png",
    ITR: "/images/logos/itr.png",
    "Santo Tomás": "/images/logos/santo-tomas.png",
  }

  return teamMap[teamName] || "/placeholder.svg?height=60&width=60"
}

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Calendario</h1>
        <p className="mt-2 text-muted-foreground">
          Calendario de partidos de la Liga de Fútbol Intercolegial Secundaria
        </p>
      </div>

      <Tabs defaultValue="proximos" className="w-full">
        <TabsList className="mb-4 flex w-full justify-start space-x-2 overflow-x-auto pb-2">
          <TabsTrigger value="proximos">Próximos Partidos</TabsTrigger>
          <TabsTrigger value="jornada6">Jornada 6</TabsTrigger>
          <TabsTrigger value="jornada7">Jornada 7</TabsTrigger>
          <TabsTrigger value="jornada8">Jornada 8</TabsTrigger>
          <TabsTrigger value="jornada9">Jornada 9</TabsTrigger>
          <TabsTrigger value="jornada10">Jornada 10</TabsTrigger>
        </TabsList>

        <TabsContent value="proximos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Próximos Partidos</span>
                <Badge variant="outline">Mayo 2024</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>05/05/2024</Badge>
                    <Badge variant="outline">Jornada 6</Badge>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 flex-col items-center text-center">
                        <Image
                          src={getTeamLogoPath("Domingo Savio") || "/placeholder.svg"}
                          alt="Domingo Savio"
                          width={60}
                          height={60}
                          className="mb-2 rounded-full"
                        />
                        <h3 className="text-sm font-medium">Domingo Savio</h3>
                        <Badge variant="outline" className="mt-1 border-primary text-primary">
                          Local
                        </Badge>
                      </div>

                      <div className="mx-4 text-center">
                        <div className="text-xl font-bold">
                          <span>15:00</span>
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          Pendiente
                        </Badge>
                      </div>

                      <div className="flex flex-1 flex-col items-center text-center">
                        <Image
                          src={getTeamLogoPath("Instituto Villada") || "/placeholder.svg"}
                          alt="Instituto Villada"
                          width={60}
                          height={60}
                          className="mb-2 rounded-full"
                        />
                        <h3 className="text-sm font-medium">Instituto Villada</h3>
                        <Badge variant="outline" className="mt-1">
                          Visitante
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 flex-col items-center text-center">
                        <Image
                          src={getTeamLogoPath("Gabriel Taborin") || "/placeholder.svg"}
                          alt="Gabriel Taborin"
                          width={60}
                          height={60}
                          className="mb-2 rounded-full"
                        />
                        <h3 className="text-sm font-medium">Gabriel Taborin</h3>
                        <Badge variant="outline" className="mt-1 border-primary text-primary">
                          Local
                        </Badge>
                      </div>

                      <div className="mx-4 text-center">
                        <div className="text-xl font-bold">
                          <span>17:30</span>
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          Pendiente
                        </Badge>
                      </div>

                      <div className="flex flex-1 flex-col items-center text-center">
                        <Image
                          src={getTeamLogoPath("Sagrada Familia") || "/placeholder.svg"}
                          alt="Sagrada Familia"
                          width={60}
                          height={60}
                          className="mb-2 rounded-full"
                        />
                        <h3 className="text-sm font-medium">Sagrada Familia</h3>
                        <Badge variant="outline" className="mt-1">
                          Visitante
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>06/05/2024</Badge>
                    <Badge variant="outline">Jornada 6</Badge>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 flex-col items-center text-center">
                        <Image
                          src={getTeamLogoPath("Luis Manuel Robles") || "/placeholder.svg"}
                          alt="Luis Manuel Robles"
                          width={60}
                          height={60}
                          className="mb-2 rounded-full"
                        />
                        <h3 className="text-sm font-medium">Luis Manuel Robles</h3>
                        <Badge variant="outline" className="mt-1 border-primary text-primary">
                          Local
                        </Badge>
                      </div>

                      <div className="mx-4 text-center">
                        <div className="text-xl font-bold">
                          <span>16:00</span>
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          Pendiente
                        </Badge>
                      </div>

                      <div className="flex flex-1 flex-col items-center text-center">
                        <Image
                          src={getTeamLogoPath("ITR") || "/placeholder.svg"}
                          alt="ITR"
                          width={60}
                          height={60}
                          className="mb-2 rounded-full"
                        />
                        <h3 className="text-sm font-medium">ITR</h3>
                        <Badge variant="outline" className="mt-1">
                          Visitante
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>12/05/2024</Badge>
                    <Badge variant="outline">Jornada 7</Badge>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 flex-col items-center text-center">
                        <Image
                          src={getTeamLogoPath("Santo Tomás") || "/placeholder.svg"}
                          alt="Santo Tomás"
                          width={60}
                          height={60}
                          className="mb-2 rounded-full"
                        />
                        <h3 className="text-sm font-medium">Santo Tomás</h3>
                        <Badge variant="outline" className="mt-1 border-primary text-primary">
                          Local
                        </Badge>
                      </div>

                      <div className="mx-4 text-center">
                        <div className="text-xl font-bold">
                          <span>15:00</span>
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          Pendiente
                        </Badge>
                      </div>

                      <div className="flex flex-1 flex-col items-center text-center">
                        <Image
                          src={getTeamLogoPath("Domingo Savio") || "/placeholder.svg"}
                          alt="Domingo Savio"
                          width={60}
                          height={60}
                          className="mb-2 rounded-full"
                        />
                        <h3 className="text-sm font-medium">Domingo Savio</h3>
                        <Badge variant="outline" className="mt-1">
                          Visitante
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {[6, 7, 8, 9, 10].map((journeyNumber) => (
          <TabsContent key={`jornada${journeyNumber}`} value={`jornada${journeyNumber}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Jornada {journeyNumber}</span>
                  <Badge variant="outline">
                    {journeyNumber === 6
                      ? "05-06/05/2024"
                      : journeyNumber === 7
                        ? "12-13/05/2024"
                        : journeyNumber === 8
                          ? "19-20/05/2024"
                          : journeyNumber === 9
                            ? "26-27/05/2024"
                            : "02-03/06/2024"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="rounded-lg border border-border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge>
                          {journeyNumber === 6
                            ? index === 2
                              ? "06/05/2024"
                              : "05/05/2024"
                            : index === 2
                              ? `${journeyNumber * 7 - 35}/05/2024`
                              : `${journeyNumber * 7 - 36}/05/2024`}
                        </Badge>
                        <Badge variant="outline">{index === 0 ? "15:00" : index === 1 ? "17:30" : "16:00"}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-1 flex-col items-center text-center">
                          <Image
                            src="/placeholder.svg?height=60&width=60"
                            alt={`Equipo ${index * 2 + 1}`}
                            width={60}
                            height={60}
                            className="mb-2 rounded-full"
                          />
                          <h3 className="text-sm font-medium">Equipo {index * 2 + 1}</h3>
                          <Badge variant="outline" className="mt-1 border-primary text-primary">
                            Local
                          </Badge>
                        </div>

                        <div className="mx-4 text-center">
                          <div className="text-xl font-bold">
                            <span>VS</span>
                          </div>
                          <Badge variant="secondary" className="mt-1">
                            Pendiente
                          </Badge>
                        </div>

                        <div className="flex flex-1 flex-col items-center text-center">
                          <Image
                            src="/placeholder.svg?height=60&width=60"
                            alt={`Equipo ${index * 2 + 2}`}
                            width={60}
                            height={60}
                            className="mb-2 rounded-full"
                          />
                          <h3 className="text-sm font-medium">Equipo {index * 2 + 2}</h3>
                          <Badge variant="outline" className="mt-1">
                            Visitante
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4 text-xs text-muted-foreground">
                        <p>
                          Estadio:{" "}
                          {index === 0
                            ? "Estadio Municipal"
                            : index === 1
                              ? "Campo Deportivo Norte"
                              : "Complejo Deportivo Este"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
