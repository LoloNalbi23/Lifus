"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddNewsFormProps {
  isOpen: boolean
  onClose: () => void
  onAddNews: (news: any) => void
}

export default function AddNewsForm({ isOpen, onClose, onAddNews }: AddNewsFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toLocaleDateString("es-ES"),
    images: [""],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const addImage = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }))
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, images: newImages.length > 0 ? newImages : [""] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast({
        title: "Error",
        description: "Por favor complete los campos obligatorios: título, resumen y contenido",
        variant: "destructive",
      })
      return
    }

    // Validar que al menos una imagen tenga valor si hay más de una
    if (formData.images.length > 1 && formData.images.some((img) => !img)) {
      toast({
        title: "Error",
        description: "Por favor complete todas las URLs de imágenes o elimine los campos vacíos",
        variant: "destructive",
      })
      return
    }

    // Filtrar imágenes vacías
    const filteredImages = formData.images.filter((img) => img)

    // Crear objeto de noticia
    const newNews = {
      id: Date.now().toString(),
      title: formData.title,
      date: formData.date,
      excerpt: formData.excerpt,
      content: formData.content,
      images: filteredImages,
    }

    onAddNews(newNews)
    toast({
      title: "Noticia publicada",
      description: `La noticia "${formData.title}" ha sido publicada correctamente`,
    })

    // Resetear formulario
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toLocaleDateString("es-ES"),
      images: [""],
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Publicar Nueva Noticia</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="after:ml-0.5 after:text-red-500 after:content-['*']">
              Título
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Título de la noticia"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="after:ml-0.5 after:text-red-500 after:content-['*']">
              Resumen
            </Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              placeholder="Breve resumen de la noticia"
              rows={2}
              required
              value={formData.excerpt}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="after:ml-0.5 after:text-red-500 after:content-['*']">
              Contenido
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Contenido completo de la noticia"
              rows={8}
              required
              value={formData.content}
              onChange={handleChange}
            />
            <p className="text-xs text-muted-foreground">
              Puedes usar HTML básico para dar formato al texto (p, h3, ul, li, etc.)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Imágenes para carrusel</Label>
              <Button type="button" variant="outline" size="sm" onClick={addImage}>
                Añadir imagen
              </Button>
            </div>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="URL de la imagen"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImage(index)}
                      className="h-8 w-8 shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Añade URLs de imágenes para crear un carrusel en la noticia. Deja en blanco para no incluir imágenes.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Publicar Noticia</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
