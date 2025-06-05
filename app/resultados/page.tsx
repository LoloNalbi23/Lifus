import type { Metadata } from "next"
import ResultsPageClient from "./ResultsPageClient"

export const metadata: Metadata = {
  title: "Resultados por Jornadas | LIFuS",
  description: "Resultados de los partidos por jornada de la Liga de Fútbol Intercolegial Secundaria",
}

export default function ResultsPage() {
  return <ResultsPageClient />
}
