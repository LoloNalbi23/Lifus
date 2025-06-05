import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

interface NewsCardProps {
  id: string
  title: string
  date: string
  excerpt: string
}

export default function NewsCard({ id, title, date, excerpt }: NewsCardProps) {
  return (
    <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur">
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>{date}</span>
          </div>
          <p className="text-sm text-muted-foreground">{excerpt}</p>
        </div>
        <Link href={`/noticias/${id}`} className="mt-4 block text-sm text-primary hover:underline">
          Leer más →
        </Link>
      </CardContent>
    </Card>
  )
}
