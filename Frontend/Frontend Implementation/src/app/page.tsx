import HeroSection from "@/components/hero-section"
import YourBuildsSection from "@/components/your-builds-section"
import SearchHistorySection from "@/components/search-history-section"
import NewArrivalsSection from "@/components/new-arrivals-section"
import Footer from "@/components/Footers"
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-8">
      <div className="flex flex-1 justify-center py-8">
        <div className="flex w-full max-w-7xl gap-8">
          <div className="w-64 flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 flex">
            <HeroSection />
          </div>
        </div>
      </div>
      <YourBuildsSection />
      <SearchHistorySection />
      <NewArrivalsSection />
      <Footer />
    </main>
  )
}