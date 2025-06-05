"use client"

import { useState, useEffect } from "react"
import { useParams, notFound, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import NewsImageCarousel from "@/components/news-image-carousel"

interface NewsItem {
  id: string
  title: string
  date: string
  content: string
  excerpt?: string
  images?: string[]
}

// Noticias predefinidas
const predefinedNews: NewsItem[] = [
  {
    id: "1",
    title: "Inicio del Torneo Apertura 2025",
    date: "01/05/2025",
    content: `
      <p>Este fin de semana comienza el Torneo Apertura 2025 con emocionantes encuentros entre los equipos participantes. Los partidos se disputarán en las sedes habituales y contarán con la participación de todos los colegios de la liga.</p>
      
      <p>El torneo se desarrollará en dos zonas, con un total de 14 equipos participantes. La fase regular constará de 7 fechas, tras las cuales los mejores equipos de cada zona avanzarán a las semifinales.</p>
      
      <p>La ceremonia inaugural se llevará a cabo el viernes 2 de mayo en el Estadio Municipal, con la presencia de autoridades educativas y deportivas de la región.</p>
      
      <p>Invitamos a toda la comunidad educativa a acompañar a sus equipos y disfrutar de este evento deportivo que promueve la integración y el espíritu deportivo entre los colegios participantes.</p>
    `,
  },
  {
    id: "2",
    title: "Renault domina en la primera fecha",
    date: "05/05/2025",
    content: `
      <p>El equipo de Renault mostró su poderío en la primera fecha del torneo, venciendo a Sagrada Familia en todas las categorías. Los goleadores destacados fueron Corte Fede y Coronel Nico con dos tantos cada uno.</p>
      
      <p>En la categoría Mayor, Renault se impuso por un contundente 5-0, demostrando su candidatura al título. En la categoría Media, la victoria fue más ajustada, con un 1-0 gracias al gol de Gaido Santi. Mientras que en Menores, el resultado fue un empate 2-2, con goles de Burgard Augusto y un tanto en contra para el equipo de Renault.</p>
      
      <p>El entrenador de Renault, Carlos Rodríguez, se mostró satisfecho con el rendimiento de sus jugadores: "Hemos trabajado muy duro durante la pretemporada y los resultados están a la vista. Sin embargo, esto recién comienza y debemos mantener la humildad y seguir mejorando".</p>
      
      <p>Por su parte, el técnico de Sagrada Familia, Martín Díaz, reconoció la superioridad del rival: "Nos enfrentamos a un gran equipo, con jugadores de mucha calidad. Tenemos que trabajar en corregir los errores y pensar en el próximo partido".</p>
    `,
  },
  {
    id: "3",
    title: "Próximos encuentros de la fecha 4",
    date: "20/05/2025",
    content: `
      <p>Conoce los horarios y sedes de los próximos partidos correspondientes a la fecha 4 del Torneo Apertura. Todos los encuentros se disputarán el próximo fin de semana en horarios habituales.</p>
      
      <h3>Zona 1</h3>
      <ul>
        <li>Equipo A vs Equipo B - Sábado 24/05 - 14:00 - Estadio Municipal</li>
        <li>Equipo C vs Equipo D - Sábado 24/05 - 16:30 - Campo Deportivo Norte</li>
        <li>Equipo E vs Equipo F - Domingo 25/05 - 15:00 - Complejo Deportivo Este</li>
        <li>Libre: Equipo G</li>
      </ul>
      
      <h3>Zona 2</h3>
      <ul>
        <li>Taborin vs Instituto Renault - Sábado 24/05 - 14:00 - Campo Deportivo Norte</li>
        <li>Santo Tomás vs Domingo Savio - Sábado 24/05 - 16:30 - Estadio Municipal</li>
        <li>Robles vs Sagrada Familia - Domingo 25/05 - 15:00 - Estadio Municipal</li>
        <li>Libre: Instituto Villada</li>
      </ul>
      
      <p>Recordamos a todos los equipos que deben presentarse con al menos 30 minutos de anticipación al horario programado para su partido.</p>
    `,
    images: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800&text=Partido+1",
      "/placeholder.svg?height=400&width=800&text=Partido+2",
    ],
  },
  {
    id: "4",
    title: "Reunión de delegados",
    date: "15/05/2025",
    content: `
      <p>Se convoca a todos los delegados de los equipos a una reunión importante el próximo viernes. Se tratarán temas relacionados con el calendario, reglamento y próximos eventos.</p>
      
      <p>La reunión se llevará a cabo el viernes 23 de mayo a las 19:00 horas en la sede de la Liga (Av. Principal 1234). La asistencia es obligatoria para todos los delegados.</p>
      
      <p>Temas a tratar:</p>
      <ul>
        <li>Evaluación de las primeras fechas del torneo</li>
        <li>Ajustes al calendario por feriados</li>
        <li>Revisión de aspectos reglamentarios</li>
        <li>Organización del evento de mitad de temporada</li>
        <li>Asuntos varios</li>
      </ul>
      
      <p>Se solicita a los delegados que no puedan asistir, enviar un representante autorizado y notificar previamente a la organización.</p>
    `,
  },
]

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [news, setNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    const newsId = params.id as string

    // Buscar primero en las noticias predefinidas
    const predefinedNewsItem = predefinedNews.find((item) => item.id === newsId)

    if (predefinedNewsItem) {
      setNews(predefinedNewsItem)
      return
    }

    // Si no se encuentra en las predefinidas, buscar en localStorage
    const storedNews = localStorage.getItem("lifus_news")
    if (storedNews) {
      const customNews = JSON.parse(storedNews)
      const customNewsItem = customNews.find((item: NewsItem) => item.id === newsId)

      if (customNewsItem) {
        setNews(customNewsItem)
        return
      }
    }

    // Si no se encuentra ni en predefinidas ni en localStorage, mostrar 404
    notFound()
  }, [params.id])

  const handleDelete = () => {
    if (!news) return

    // Confirmar la eliminación
    if (!confirm(`¿Estás seguro de que deseas eliminar la noticia "${news.title}"?`)) {
      return
    }

    // Si es una noticia predefinida, mostrar error
    if (predefinedNews.some((item) => item.id === news.id)) {
      alert("No es posible eliminar las noticias predefinidas")
      return
    }

    // Obtener noticias guardadas y filtrar la que se va a eliminar
    const storedNews = localStorage.getItem("lifus_news")
    if (storedNews) {
      const customNews = JSON.parse(storedNews)
      const updatedNews = customNews.filter((item: NewsItem) => item.id !== news.id)
      localStorage.setItem("lifus_news", JSON.stringify(updatedNews))
    }

    // Redirigir a la página de noticias
    router.push("/noticias")
  }

  if (!news) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/noticias" className="mb-6 inline-flex items-center text-sm text-primary hover:underline">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Volver a noticias
      </Link>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl md:text-3xl">{news.title}</CardTitle>
              {isAuthenticated && (
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  Eliminar noticia
                </Button>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {news.date}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Carrusel de imágenes (si hay imágenes) */}
          {news.images && news.images.length > 0 && (
            <div className="mb-8">
              <NewsImageCarousel images={news.images} />
            </div>
          )}

          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          <div className="mt-8 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/noticias">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Volver a noticias
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
