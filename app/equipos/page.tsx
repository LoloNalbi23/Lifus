import type { Metadata } from "next"
import TeamsClientPage from "./TeamsClientPage"

export const metadata: Metadata = {
  title: "Equipos | LIFuS",
  description: "Equipos participantes en la Liga de Fútbol Intercolegial Secundaria",
}

export default function TeamsPage() {
  return <TeamsClientPage />
}
