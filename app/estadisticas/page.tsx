import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export const metadata: Metadata = {
  title: "Estadísticas del Torneo | LIFuS",
  description: "Estadísticas completas de la Liga de Fútbol Intercolegial Secundaria",
}

const teams = [
  { name: "ITR", played: 5, won: 4, drawn: 1, lost: 0, gf: 12, ga: 4, gd: 8, points: 13 },
  { name: "Santo Tomás", played: 5, won: 3, drawn: 1, lost: 1, gf: 10, ga: 5, gd: 5, points: 10 },
  { name: "Domingo Savio", played: 5, won: 3, drawn: 0, lost: 2, gf: 8, ga: 5, gd: 3, points: 9 },
  { name: "Instituto Villada", played: 5, won: 2, drawn: 1, lost: 2, gf: 7, ga: 6, gd: 1, points: 7 },
  { name: "Gabriel Taborin", played: 5, won: 2, drawn: 0, lost: 3, gf: 5, ga: 6, gd: -1, points: 6 },
  { name: "Sagrada Familia", played: 5, won: 1, drawn: 1, lost: 3, gf: 4, ga: 7, gd: -3, points: 4 },
  { name: "Luis Manuel Robles", played: 5, won: 0, drawn: 1, lost: 4, gf: 3, ga: 16, gd: -13, points: 1 },
]

const scorers = [
  { player: "Martínez, L.", team: "ITR", goals: 8 },
  { player: "Rodríguez, F.", team: "Santo Tomás", goals: 7 },
  { player: "González, M.", team: "Domingo Savio", goals: 6 },
  { player: "Pérez, J.", team: "Instituto Villada", goals: 5 },
  { player: "López, A.", team: "Gabriel Taborin", goals: 5 },
  { player: "Fernández, R.", team: "Sagrada Familia", goals: 3 },
  { player: "García, D.", team: "Luis Manuel Robles", goals: 3 },
  { player: "Sánchez, T.", team: "ITR", goals: 3 },
  { player: "Díaz, M.", team: "Instituto Villada", goals: 2 },
  { player: "Gómez, L.", team: "Santo Tomás", goals: 2 },
]

const cards = [
  { player: "Fernández, R.", team: "Sagrada Familia", yellow: 4, red: 1 },
  { player: "García, D.", team: "Luis Manuel Robles", yellow: 5, red: 0 },
  { player: "Sánchez, T.", team: "ITR", yellow: 3, red: 1 },
  { player: "Díaz, M.", team: "Instituto Villada", yellow: 3, red: 1 },
  { player: "Gómez, L.", team: "Santo Tomás", yellow: 4, red: 0 },
  { player: "Martínez, L.", team: "ITR", yellow: 2, red: 0 },
  { player: "Rodríguez, F.", team: "Santo Tomás", yellow: 2, red: 0 },
  { player: "González, M.", team: "Domingo Savio", yellow: 3, red: 0 },
  { player: "Pérez, J.", team: "Instituto Villada", yellow: 1, red: 0 },
  { player: "López, A.", team: "Gabriel Taborin", yellow: 2, red: 0 },
]

const goalStats = [
  { name: "ITR", goals: 12 },
  { name: "Santo Tomás", goals: 10 },
  { name: "Domingo Savio", goals: 8 },
  { name: "Instituto Villada", goals: 7 },
  { name: "Gabriel Taborin", goals: 5 },
  { name: "Sagrada Familia", goals: 4 },
  { name: "Luis Manuel Robles", goals: 3 },
]

const winRatioData = [
  { name: "ITR", ratio: 80 },
  { name: "Santo Tomás", ratio: 60 },
  { name: "Domingo Savio", ratio: 60 },
  { name: "Instituto Villada", ratio: 40 },
  { name: "Gabriel Taborin", ratio: 40 },
  { name: "Sagrada Familia", ratio: 20 },
  { name: "Luis Manuel Robles", ratio: 0 },
]

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Estadísticas del Torneo</h1>
        <p className="mt-2 text-muted-foreground">
          Estadísticas completas de la Liga de Fútbol Intercolegial Secundaria
        </p>
      </div>

      <Tabs defaultValue="clasificacion" className="w-full">
        <TabsList className="mb-4 flex w-full justify-start space-x-2 overflow-x-auto pb-2">
          <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
          <TabsTrigger value="goleadores">Goleadores</TabsTrigger>
          <TabsTrigger value="tarjetas">Tarjetas</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="clasificacion">
          <Card>
            <CardHeader>
              <CardTitle>Tabla de Clasificación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Pos</TableHead>
                      <TableHead>Equipo</TableHead>
                      <TableHead className="text-center">PJ</TableHead>
                      <TableHead className="text-center">PG</TableHead>
                      <TableHead className="text-center">PE</TableHead>
                      <TableHead className="text-center">PP</TableHead>
                      <TableHead className="text-center">GF</TableHead>
                      <TableHead className="text-center">GC</TableHead>
                      <TableHead className="text-center">DG</TableHead>
                      <TableHead className="text-center">Pts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teams.map((team, index) => (
                      <TableRow key={team.name}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{team.name}</TableCell>
                        <TableCell className="text-center">{team.played}</TableCell>
                        <TableCell className="text-center">{team.won}</TableCell>
                        <TableCell className="text-center">{team.drawn}</TableCell>
                        <TableCell className="text-center">{team.lost}</TableCell>
                        <TableCell className="text-center">{team.gf}</TableCell>
                        <TableCell className="text-center">{team.ga}</TableCell>
                        <TableCell
                          className={`text-center ${team.gd > 0 ? "text-green-500" : team.gd < 0 ? "text-red-500" : ""}`}
                        >
                          {team.gd > 0 ? `+${team.gd}` : team.gd}
                        </TableCell>
                        <TableCell className="text-center font-bold">{team.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goleadores">
          <Card>
            <CardHeader>
              <CardTitle>Tabla de Goleadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Pos</TableHead>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Equipo</TableHead>
                      <TableHead className="text-center">Goles</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scorers.map((scorer, index) => (
                      <TableRow key={`${scorer.player}-${scorer.team}`}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{scorer.player}</TableCell>
                        <TableCell>{scorer.team}</TableCell>
                        <TableCell className="text-center font-bold text-primary">{scorer.goals}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tarjetas">
          <Card>
            <CardHeader>
              <CardTitle>Tabla de Tarjetas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Pos</TableHead>
                      <TableHead>Jugador</TableHead>
                      <TableHead>Equipo</TableHead>
                      <TableHead className="text-center">
                        <span className="inline-block h-4 w-4 rounded-sm bg-yellow-400"></span>
                      </TableHead>
                      <TableHead className="text-center">
                        <span className="inline-block h-4 w-4 rounded-sm bg-red-500"></span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cards.map((card, index) => (
                      <TableRow key={`${card.player}-${card.team}`}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{card.player}</TableCell>
                        <TableCell>{card.team}</TableCell>
                        <TableCell className="text-center">{card.yellow}</TableCell>
                        <TableCell className="text-center">{card.red}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Goles por Equipo</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    goals: {
                      label: "Goles",
                      color: "hsl(var(--primary))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={goalStats} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="goals" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ratio de Victorias (%)</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ChartContainer
                  config={{
                    ratio: {
                      label: "Ratio de Victorias",
                      color: "hsl(var(--primary))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={winRatioData} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="ratio" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Resumen del Torneo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-lg border border-border p-4 text-center">
                    <div className="text-3xl font-bold text-primary">49</div>
                    <div className="mt-1 text-sm text-muted-foreground">Goles Totales</div>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <div className="text-3xl font-bold text-primary">15</div>
                    <div className="mt-1 text-sm text-muted-foreground">Partidos Jugados</div>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <div className="text-3xl font-bold text-primary">3.27</div>
                    <div className="mt-1 text-sm text-muted-foreground">Goles por Partido</div>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <div className="text-3xl font-bold text-primary">6</div>
                    <div className="mt-1 text-sm text-muted-foreground">Porterías a Cero</div>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <div className="text-3xl font-bold text-yellow-400">27</div>
                    <div className="mt-1 text-sm text-muted-foreground">Tarjetas Amarillas</div>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <div className="text-3xl font-bold text-red-500">3</div>
                    <div className="mt-1 text-sm text-muted-foreground">Tarjetas Rojas</div>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <div className="text-3xl font-bold text-primary">42.9%</div>
                    <div className="mt-1 text-sm text-muted-foreground">Victorias Locales</div>
                  </div>
                  <div className="rounded-lg border border-border p-4 text-center">
                    <div className="text-3xl font-bold text-primary">33.3%</div>
                    <div className="mt-1 text-sm text-muted-foreground">Victorias Visitantes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
