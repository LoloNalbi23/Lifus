import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function Statistics() {
  return (
    <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur">
      <CardHeader className="bg-muted/50 pb-3">
        <CardTitle className="text-lg">Estadísticas</CardTitle>
        <CardDescription>Temporada 2023-2024</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="goleadores">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goleadores">Goleadores</TabsTrigger>
            <TabsTrigger value="tarjetas">Tarjetas</TabsTrigger>
            <TabsTrigger value="clasificacion">Clasificación</TabsTrigger>
          </TabsList>

          <TabsContent value="goleadores" className="p-4">
            <div className="space-y-3">
              {[
                { player: "Martínez, L.", team: "ITR", goals: 8 },
                { player: "Rodríguez, F.", team: "Santo Tomás", goals: 7 },
                { player: "González, M.", team: "Domingo Savio", goals: 6 },
                { player: "Pérez, J.", team: "Instituto Villada", goals: 5 },
                { player: "López, A.", team: "Gabriel Taborin", goals: 5 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{item.player}</span>
                    <span className="text-xs text-muted-foreground">({item.team})</span>
                  </div>
                  <span className="font-medium text-primary">{item.goals}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tarjetas" className="p-4">
            <div className="space-y-3">
              {[
                { player: "Fernández, R.", team: "Sagrada Familia", yellow: 4, red: 1 },
                { player: "García, D.", team: "Luis Manuel Robles", yellow: 5, red: 0 },
                { player: "Sánchez, T.", team: "ITR", yellow: 3, red: 1 },
                { player: "Díaz, M.", team: "Instituto Villada", yellow: 3, red: 1 },
                { player: "Gómez, L.", team: "Santo Tomás", yellow: 4, red: 0 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{item.player}</span>
                    <span className="text-xs text-muted-foreground">({item.team})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center">
                      <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-yellow-400"></span>
                      {item.yellow}
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-red-500"></span>
                      {item.red}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clasificacion" className="p-4">
            <div className="space-y-3">
              {[
                { team: "ITR", played: 5, points: 13, gd: "+8" },
                { team: "Santo Tomás", played: 5, points: 10, gd: "+5" },
                { team: "Domingo Savio", played: 5, points: 9, gd: "+3" },
                { team: "Instituto Villada", played: 5, points: 7, gd: "+1" },
                { team: "Gabriel Taborin", played: 5, points: 6, gd: "-1" },
                { team: "Sagrada Familia", played: 5, points: 4, gd: "-3" },
                { team: "Luis Manuel Robles", played: 5, points: 1, gd: "-13" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{index + 1}.</span>
                    <span>{item.team}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">PJ: {item.played}</span>
                    <span className="font-medium">{item.points} pts</span>
                    <span
                      className={`text-xs ${item.gd.startsWith("+") ? "text-green-500" : item.gd.startsWith("-") ? "text-red-500" : ""}`}
                    >
                      {item.gd}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="border-t border-border p-4 text-center">
          <Link href="/estadisticas" className="text-sm text-primary hover:underline">
            Ver todas las estadísticas
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
