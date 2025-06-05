import HeroSection from "@/components/hero-section"
import LatestMatch from "@/components/latest-match"
import NextMatches from "@/components/next-matches"
import Statistics from "@/components/statistics"
import NewsSection from "@/components/news-section"
import AdBanner from "@/components/ad-banner"

export default function Home() {
  return (
    <div className="container relative mx-auto px-4 py-8">
      {/* Contenido principal con espacio para los banners laterales */}
      <div className="mx-auto max-w-6xl lg:px-0 xl:px-44">
        <HeroSection />
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <LatestMatch />
          <NextMatches />
          <Statistics />
        </div>
        <div className="mt-16">
          <NewsSection />
        </div>
      </div>

      {/* Banners publicitarios laterales (solo visibles en pantallas grandes) */}
      <div className="fixed left-4 top-24 hidden xl:block" style={{ zIndex: 10 }}>
        <AdBanner type="vertical" />
      </div>

      <div className="fixed right-4 top-24 hidden xl:block" style={{ zIndex: 10 }}>
        <AdBanner type="vertical" />
      </div>
    </div>
  )
}
