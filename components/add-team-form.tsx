"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface AddTeamFormProps {
  isOpen: boolean
  onClose: () => void
  onAddTeam: (team: any) => void
  activeZone: "Zona 1" | "Zona 2"
}

export default function AddTeamForm({ isOpen, onClose, onAddTeam, activeZone }: AddTeamFormProps) {
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

    // Crear ID único basado en el nombre (slug)
    const id = formData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")

    // Crear objeto de equipo
    const newTeam = {
      id,
      name: formData.name,
      fullName: formData.fullName,
      position: 0, // Se asignará dinámicamente
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      zone: activeZone,
      coach: formData.coach,
      captain: formData.captain,
      players: Number.parseInt(formData.players) || 0,
      logoUrl: formData.logoUrl || "/placeholder.svg?height=80&width=80",
      roster: formData.roster,
      nextMatch: {
        opponent: "Por definir",
        date: "Por definir",
        time: "Por definir",
        venue: "Por definir",
        isHome: true,
      },
    }

    onAddTeam(newTeam)
    toast({
      title: "Equipo añadido",
      description: `El equipo ${formData.name} ha sido añadido correctamente`,
    })

    // Resetear formulario
    setFormData({
      logoUrl: "",
      name: "",
      fullName: "",
      coach: "",
      captain: "",
      players: "",
      roster: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Equipo</DialogTitle>
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
            <Button type="submit">Guardar Equipo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
