"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AdBanner from "@/components/ad-banner"
import { useSearchParams } from "next/navigation"
import { Plus, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import AddTeamForm from "@/components/add-team-form"
import EditTeamForm from "@/components/edit-team-form"
import { useToast } from "@/hooks/use-toast"

interface Team {
  id: string
  name: string
  fullName: string
  position: number
  played: number
  won: number
  drawn: number
  lost: number
  zone: "Zona 1" | "Zona 2"
  logoUrl?: string
  coach?: string
  captain?: string
  players?: number
  roster?: string
}

// Equipos predefinidos
const predefinedTeams: Team[] = [
  // Zona 2
  {
    id: "itr",
    name: "ITR",
    fullName: "Instituto Técnico Renault",
    position: 1,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    zone: "Zona 2",
    coach: "Carlos Rodríguez",
    captain: "Lucas Martínez",
    players: 18,
  },
  {
    id: "santo-tomas",
    name: "Santo Tomás",
    fullName: "Colegio Santo Tomás",
    position: 2,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    zone: "Zona 2",
    coach: "Miguel Sánchez",
    captain: "Fernando Rodríguez",
    players: 20,
  },
  {
    id: "domingo-savio",
    name: "Domingo Savio",
    fullName: "Instituto Domingo Savio",
    position: 3,
    played: 5,
    won: 3,
    drawn: 0,
    lost: 2,
    zone: "Zona 2",
    coach: "Roberto Fernández",
    captain: "Matías González",
    players: 19,
  },
  {
    id: "villada",
    name: "Instituto Villada",
    fullName: "Instituto Técnico Villada",
    position: 4,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    zone: "Zona 2",
    coach: "Alejandro Gómez",
    captain: "Javier Pérez",
    players: 21,
  },
  {
    id: "taborin",
    name: "Gabriel Taborin",
    fullName: "Colegio Gabriel Taborin",
    position: 5,
    played: 5,
    won: 2,
    drawn: 0,
    lost: 3,
    zone: "Zona 2",
    coach: "Daniel López",
    captain: "Andrés López",
    players: 17,
  },
  {
    id: "sagrada-familia",
    name: "Sagrada Familia",
    fullName: "Colegio Sagrada Familia",
    position: 6,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    zone: "Zona 2",
    coach: "Martín Díaz",
    captain: "Ricardo Fernández",
    players: 18,
  },
  {
    id: "robles",
    name: "Luis Manuel Robles",
    fullName: "Instituto Luis Manuel Robles",
    position: 7,
    played: 5,
    won: 0,
    drawn: 1,
    lost: 4,
    zone: "Zona 2",
    coach: "Pablo García",
    captain: "Diego García",
    players: 16,
  },

  // Zona 1
  {
    id: "san-martin",
    name: "San Martín",
    fullName: "Colegio General San Martín",
    position: 1,
    played: 5,
    won: 4,
    drawn: 1,
    lost: 0,
    zone: "Zona 1",
    coach: "Eduardo Pereyra",
    captain: "Mateo Sánchez",
    players: 22,
  },
  {
    id: "belgrano",
    name: "Belgrano",
    fullName: "Instituto Manuel Belgrano",
    position: 2,
    played: 5,
    won: 4,
    drawn: 0,
    lost: 1,
    zone: "Zona 1",
    coach: "Javier Álvarez",
    captain: "Tomás Gutiérrez",
    players: 20,
  },
  {
    id: "san-jose",
    name: "San José",
    fullName: "Colegio San José",
    position: 3,
    played: 5,
    won: 3,
    drawn: 1,
    lost: 1,
    zone: "Zona 1",
    coach: "Marcelo Ramírez",
    captain: "Nicolás Fernández",
    players: 19,
  },
  {
    id: "inmaculada",
    name: "La Inmaculada",
    fullName: "Instituto La Inmaculada",
    position: 4,
    played: 5,
    won: 2,
    drawn: 2,
    lost: 1,
    zone: "Zona 1",
    coach: "Sergio Morales",
    captain: "Facundo López",
    players: 21,
  },
  {
    id: "lasalle",
    name: "La Salle",
    fullName: "Colegio La Salle",
    position: 5,
    played: 5,
    won: 2,
    drawn: 1,
    lost: 2,
    zone: "Zona 1",
    coach: "Gustavo Torres",
    captain: "Ignacio Martínez",
    players: 18,
  },
  {
    id: "monserrat",
    name: "Monserrat",
    fullName: "Colegio Nacional de Monserrat",
    position: 6,
    played: 5,
    won: 1,
    drawn: 1,
    lost: 3,
    zone: "Zona 1",
    coach: "Hernán Vázquez",
    captain: "Santiago Díaz",
    players: 17,
  },
  {
    id: "carbó",
    name: "Carbó",
    fullName: "Instituto Alejandro Carbó",
    position: 7,
    played: 5,
    won: 0,
    drawn: 0,
    lost: 5,
    zone: "Zona 1",
    coach: "Federico Romero",
    captain: "Luciano Gómez",
    players: 16,
  },
]

export default function TeamsClientPage() {
  const searchParams = useSearchParams()
  const zoneParam = searchParams.get("zone")
  const [activeZone, setActiveZone] = useState<"Zona 1" | "Zona 2">(zoneParam === "2" ? "Zona 2" : "Zona 1")
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([])
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false)
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false)
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null)
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [teams, setTeams] = useState<Team[]>([])

  // Cargar equipos al inicio
  useEffect(() => {
    // Intentar cargar equipos personalizados del localStorage
    const storedTeams = localStorage.getItem("lifus_teams")

    if (storedTeams) {
      try {
        const customTeams = JSON.parse(storedTeams)

        // Crear un mapa de equipos predefinidos para búsqueda rápida
        const predefinedTeamsMap = new Map(predefinedTeams.map((team) => [team.id, team]))

        // Filtrar equipos personalizados que no colisionen con predefinidos
        const filteredCustomTeams = customTeams.filter((team: Team) => !predefinedTeamsMap.has(team.id))

        // Combinar equipos predefinidos con personalizados
        const combinedTeams = [...predefinedTeams, ...filteredCustomTeams]
        setTeams(combinedTeams)

        console.log("Equipos cargados:", combinedTeams.length)
      } catch (error) {
        console.error("Error al cargar equipos:", error)
        setTeams(predefinedTeams)
      }
    } else {
      setTeams(predefinedTeams)
    }
  }, [])

  // Actualizar el estado cuando cambia el parámetro de URL
  useEffect(() => {
    if (zoneParam === "2") {
      setActiveZone("Zona 2")
    } else {
      setActiveZone("Zona 1")
    }
  }, [zoneParam])

  // Filtrar equipos cuando cambia la zona activa o la lista de equipos
  useEffect(() => {
    const filtered = teams.filter((team) => team.zone === activeZone)
    // Ordenar por posición
    filtered.sort((a, b) => a.position - b.position)
    setFilteredTeams(filtered)
  }, [activeZone, teams])

  const handleAddTeam = (newTeam: any) => {
    // Asignar posición (última posición + 1)
    const zoneTeams = teams.filter((team) => team.zone === activeZone)
    newTeam.position = zoneTeams.length + 1

    // Añadir el nuevo equipo
    const updatedTeams = [...teams, newTeam]
    setTeams(updatedTeams)

    // Guardar en localStorage solo los equipos personalizados
    const customTeams = updatedTeams.filter((team) => !predefinedTeams.some((predefined) => predefined.id === team.id))
    localStorage.setItem("lifus_teams", JSON.stringify(customTeams))
  }

  const handleEditTeam = (updatedTeam: Team) => {
    // Actualizar el equipo en la lista
    const updatedTeams = teams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    setTeams(updatedTeams)

    // Determinar si el equipo es predefinido
    const isPredefined = predefinedTeams.some((team) => team.id === updatedTeam.id)

    // Si es un equipo predefinido, solo guardamos los equipos personalizados
    // Si es un equipo personalizado, lo incluimos en lo que guardamos
    const customTeams = isPredefined
      ? updatedTeams.filter((team) => !predefinedTeams.some((predefined) => predefined.id === team.id))
      : updatedTeams.filter(
          (team) => !predefinedTeams.some((predefined) => predefined.id === team.id) || team.id === updatedTeam.id,
        )

    localStorage.setItem("lifus_teams", JSON.stringify(customTeams))
    console.log("Equipos guardados:", customTeams.length)

    // Actualizar la lista filtrada
    const filtered = updatedTeams.filter((team) => team.zone === activeZone)
    filtered.sort((a, b) => a.position - b.position)
    setFilteredTeams(filtered)
  }

  const handleDeleteTeam = (teamId: string) => {
    // Verificar si es un equipo predefinido
    const isPredefined = predefinedTeams.some((team) => team.id === teamId)
    if (isPredefined) {
      toast({
        title: "No se puede eliminar",
        description: "Los equipos predefinidos no pueden ser eliminados",
        variant: "destructive",
      })
      return
    }

    // Confirmar eliminación
    if (confirm(`¿Estás seguro de que deseas eliminar este equipo?`)) {
      // Eliminar el equipo
      const updatedTeams = teams.filter((team) => team.id !== teamId)
      setTeams(updatedTeams)

      // Actualizar localStorage
      const customTeams = updatedTeams.filter(
        (team) => !predefinedTeams.some((predefined) => predefined.id === team.id),
      )
      localStorage.setItem("lifus_teams", JSON.stringify(customTeams))

      toast({
        title: "Equipo eliminado",
        description: "El equipo ha sido eliminado correctamente",
      })
    }
  }

  const openEditModal = (team: Team) => {
    setTeamToEdit(team)
    setIsEditTeamModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Equipos</h1>
        <p className="mt-2 text-muted-foreground">
          Los equipos que participan en la Liga Intercolegial de Fútbol Secundaria
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <div className="text-lg font-medium">Zona actual: {activeZone}</div>
        </div>
      </div>

      <AdBanner type="horizontal" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTeams.map((team) => (
          <div key={team.id} className="relative group">
            {isAuthenticated && (
              <div className="absolute -right-2 -top-2 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    openEditModal(team)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteTeam(team.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Link href={`/equipos/${team.id}`}>
              <Card className="group overflow-hidden transition-all duration-200 hover:border-primary hover:shadow-md hover:shadow-primary/20">
                <div className="h-2 w-full bg-red-600"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Image
                      src={team.logoUrl || `/images/logos/${team.id}.png`}
                      alt={team.name}
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-muted p-1"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=80&width=80"
                      }}
                    />
                    <div>
                      <CardTitle className="text-xl">{team.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{team.fullName}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">PJ</p>
                      <p className="font-medium">{team.played}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">PG</p>
                      <p className="font-medium">{team.won}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">PP</p>
                      <p className="font-medium">{team.lost}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-border pt-4">
                  <Badge variant="outline">Posición: {team.position}°</Badge>
                  <span className="text-sm text-red-600">Ver detalles →</span>
                </CardFooter>
              </Card>
            </Link>
          </div>
        ))}

        {/* Tarjeta para añadir nuevo equipo (solo visible para administradores) */}
        {isAuthenticated && (
          <Card
            className="flex cursor-pointer flex-col items-center justify-center transition-all duration-200 hover:border-primary hover:shadow-md hover:shadow-primary/20"
            onClick={() => setIsAddTeamModalOpen(true)}
          >
            <div className="h-2 w-full bg-red-600"></div>
            <div className="flex h-[250px] w-full flex-col items-center justify-center p-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-muted">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-center text-sm font-medium text-muted-foreground">Añadir Nuevo Equipo</p>
            </div>
          </Card>
        )}
      </div>

      {/* Modal para añadir equipo */}
      <AddTeamForm
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
        onAddTeam={handleAddTeam}
        activeZone={activeZone}
      />

      {/* Modal para editar equipo */}
      <EditTeamForm
        isOpen={isEditTeamModalOpen}
        onClose={() => setIsEditTeamModalOpen(false)}
        onSaveTeam={handleEditTeam}
        team={teamToEdit}
      />
    </div>
  )
}
