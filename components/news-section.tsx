import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NewsCard from "@/components/news-card"

export default function NewsSection() {
  const newsItems = [
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
      excerpt:
        "Conoce los horarios y sedes de los próximos partidos correspondientes a la fecha 4 del Torneo Apertura.",
    },
    {
      id: "4",
      title: "Reunión de delegados",
      date: "15/05/2025",
      excerpt: "Se convoca a todos los delegados de los equipos a una reunión importante el próximo viernes.",
    },
  ]

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Noticias y Comunicados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newsItems.map((news) => (
              <NewsCard key={news.id} id={news.id} title={news.title} date={news.date} excerpt={news.excerpt} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
