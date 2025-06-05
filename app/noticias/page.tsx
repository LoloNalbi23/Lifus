"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import NewsCard from "@/components/news-card"
import AddNewsForm from "@/components/add-news-form"
import { useAuth } from "@/contexts/auth-context"

interface NewsItem {
  id: string
  title: string
  date: string
  excerpt: string
  content?: string
  images?: string[]
}

// Noticias predefinidas
const predefinedNews: NewsItem[] = [
  {
    id: "1",
    title: "Inicio del Torneo Apertura 2025",
    date: "01/05/2025",
    excerpt:
      "Este fin de semana comienza el Torneo Apertura 2025 con emocionantes encuentros entre los equipos participantes.",
  },
  {
    id: "2",
    title: "Renault domina en la primera fecha",
    date: "05/05/2025",
    excerpt:
      "El equipo de Renault mostró su poderío en la primera fecha del torneo, venciendo a Sagrada Familia en todas las categorías.",
  },
  {
    id: "3",
    title: "Próximos encuentros de la fecha 4",
    date: "20/05/2025",
    excerpt: "Conoce los horarios y sedes de los próximos partidos correspondientes a la fecha 4 del Torneo Apertura.",
  },
  {
    id: "4",
    title: "Reunión de delegados",
    date: "15/05/2025",
    excerpt: "Se convoca a todos los delegados de los equipos a una reunión importante el próximo viernes.",
  },
  {
    id: "5",
    title: "Cambio de sede para partidos de la fecha 5",
    date: "22/05/2025",
    excerpt:
      "Debido a trabajos de mantenimiento, los partidos programados en el Estadio Municipal para la fecha 5 se trasladarán al Campo Deportivo Norte.",
  },
  {
    id: "6",
    title: "Destacados de la fecha 2",
    date: "12/05/2025",
    excerpt:
      "Repasa los momentos más destacados de la segunda fecha del torneo, con goles espectaculares y grandes actuaciones individuales.",
  },
  {
    id: "7",
    title: "Curso para árbitros",
    date: "10/05/2025",
    excerpt:
      "La liga organiza un curso de capacitación para árbitros que se llevará a cabo durante el mes de junio. Inscripciones abiertas.",
  },
  {
    id: "8",
    title: "Entrevista con el goleador del torneo",
    date: "18/05/2025",
    excerpt:
      "Conversamos con Martínez, actual goleador del torneo, sobre sus expectativas para esta temporada y su futuro deportivo.",
  },
]

export default function NewsPage() {
  const { isAuthenticated } = useAuth()
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isAddNewsModalOpen, setIsAddNewsModalOpen] = useState(false)

  // Cargar las noticias (predefinidas + personalizadas)
  useEffect(() => {
    const storedNews = localStorage.getItem("lifus_news")
    if (storedNews) {
      try {
        const customNews = JSON.parse(storedNews)
        // Ordenar por fecha (más reciente primero)
        const allNews = [...predefinedNews, ...customNews].sort((a, b) => {
          return (
            new Date(b.date.split("/").reverse().join("-")).getTime() -
            new Date(a.date.split("/").reverse().join("-")).getTime()
          )
        })
        setNewsItems(allNews)
      } catch (error) {
        console.error("Error loading news:", error)
        setNewsItems(predefinedNews)
      }
    } else {
      setNewsItems(predefinedNews)
    }
  }, [])

  const handleAddNews = (newNews: NewsItem) => {
    // Añadir la nueva noticia al estado
    const updatedNews = [newNews, ...newsItems]
    setNewsItems(updatedNews)

    // Guardar solo las noticias personalizadas en localStorage
    const customNews = updatedNews.filter((item) => !predefinedNews.some((predefined) => predefined.id === item.id))
    localStorage.setItem("lifus_news", JSON.stringify(customNews))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Noticias y Comunicados</h1>
        <p className="mt-2 text-muted-foreground">
          Mantente informado sobre las últimas novedades de la Liga Intercolegial de Fútbol Secundaria
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Últimas Noticias</CardTitle>
          {isAuthenticated && (
            <Button onClick={() => setIsAddNewsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Publicar noticia
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((news) => (
              <NewsCard key={news.id} id={news.id} title={news.title} date={news.date} excerpt={news.excerpt} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal para añadir noticia */}
      <AddNewsForm isOpen={isAddNewsModalOpen} onClose={() => setIsAddNewsModalOpen(false)} onAddNews={handleAddNews} />
    </div>
  )
}
