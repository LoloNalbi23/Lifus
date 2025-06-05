import Carousel from "@/components/carousel"

export default function HeroSection() {
  const carouselImages = [
    {
      src: "/images/hero-player.png",
      alt: "Jugador de fútbol",
      title: "Liga Intercolegial de Fútbol Secundaria",
      description:
        "La mejor liga de fútbol para estudiantes de secundaria. Compite, diviértete y demuestra tu talento.",
    },
    {
      src: "/placeholder.svg?height=400&width=1200",
      alt: "Partido de fútbol",
      title: "Partidos emocionantes",
      description: "Disfruta de los mejores encuentros entre colegios de la región.",
    },
    {
      src: "/placeholder.svg?height=400&width=1200",
      alt: "Trofeo",
      title: "Competencia de alto nivel",
      description: "Participa en el torneo más prestigioso a nivel intercolegial.",
    },
  ]

  return (
    <section className="relative overflow-hidden rounded-xl border border-border/40 bg-black">
      <Carousel images={carouselImages} />
    </section>
  )
}
