"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface EditTeamFormProps {
  isOpen: boolean
  onClose: () => void
  onSaveTeam: (team: any) => void
  team: any | null
}

export default function EditTeamForm({ isOpen, onClose, onSaveTeam, team }: EditTeamFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    logoUrl: "",
    name: "",
    fullName: "",
    coach: "",
    captain: "",
    players: "",
    roster: "",
  })

  // Cargar datos del equipo cuando se abre el modal
  useEffect(() => {
    if (team && isOpen) {
      setFormData({
        logoUrl: team.logoUrl || "",
        name: team.name || "",
        fullName: team.fullName || "",
        coach: team.coach || "",
        captain: team.captain || "",
        players: team.players?.toString() || "",
        roster: team.roster || "",
      })
    }
  }, [team, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.name || !formData.fullName || !formData.coach || !formData.captain) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    // Actualizar el equipo existente
    const updatedTeam = {
      ...team,
      name: formData.name,
      fullName: formData.fullName,
      coach: formData.coach,
      captain: formData.captain,
      players: Number.parseInt(formData.players) || 0,
      logoUrl: formData.logoUrl || team.logoUrl || "/placeholder.svg?height=80&width=80",
      roster: formData.roster,
    }

    onSaveTeam(updatedTeam)
    toast({
      title: "Equipo actualizado",
      description: `El equipo ${formData.name} ha sido actualizado correctamente`,
    })

    // Cerrar el modal después de guardar
    onClose()
  }

  if (!team) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Equipo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logoUrl">URL del Logo</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              placeholder="https://ejemplo.com/logo.png"
              value={formData.logoUrl}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">Deje en blanco para usar un logo predeterminado</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                Nombre Abreviado
              </Label>
              <Input id="name" name="name" placeholder="ITR" required value={formData.name} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                Nombre Completo
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Instituto Técnico Renault"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coach" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                Entrenador
              </Label>
              <Input
                id="coach"
                name="coach"
                placeholder="Nombre del entrenador"
                required
                value={formData.coach}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="captain" className="after:ml-0.5 after:text-red-500 after:content-['*']">
                Capitán
              </Label>
              <Input
                id="captain"
                name="captain"
                placeholder="Nombre del capitán"
                required
                value={formData.captain}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="players">Número de Jugadores</Label>
            <Input
              id="players"
              name="players"
              type="number"
              placeholder="18"
              value={formData.players}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roster">Plantilla (opcional)</Label>
            <Textarea
              id="roster"
              name="roster"
              placeholder="Lista de jugadores, uno por línea"
              rows={4}
              value={formData.roster}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
