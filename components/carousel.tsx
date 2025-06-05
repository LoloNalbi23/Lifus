"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  images: {
    src: string
    alt: string
    title?: string
    description?: string
  }[]
  autoPlay?: boolean
  interval?: number
}

export default function Carousel({ images, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!autoPlay) return

    const intervalId = setInterval(goToNext, interval)
    return () => clearInterval(intervalId)
  }, [autoPlay, interval])

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item relative">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={1200}
              height={400}
              className="w-full h-[300px] object-cover"
            />
            {(image.title || image.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                {image.title && <h3 className="text-xl font-bold">{image.title}</h3>}
                {image.description && <p className="mt-1">{image.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={goToPrev} className="carousel-control carousel-control-prev">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={goToNext} className="carousel-control carousel-control-next">
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  )
}
