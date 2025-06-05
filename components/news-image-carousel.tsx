"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsImageCarouselProps {
  images: string[]
}

export default function NewsImageCarousel({ images }: NewsImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Reiniciar el autoplay después de 5 segundos de inactividad
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      goToNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  if (!images || images.length === 0) {
    return null
  }

  // Si hay una sola imagen, simplemente mostrarla sin controles
  if (images.length === 1) {
    return (
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-[16/9] w-full">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt="Imagen de la noticia"
            width={1280}
            height={720}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="aspect-[16/9] w-full">
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Imagen ${index + 1} de la noticia`}
                fill
                className="object-cover"
                priority={index === currentIndex}
              />
            </div>
          ))}

          {/* Controles */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={(e) => {
              e.preventDefault()
              goToPrevious()
              setIsAutoPlaying(false)
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={(e) => {
              e.preventDefault()
              goToNext()
              setIsAutoPlaying(false)
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Indicadores */}
          <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
