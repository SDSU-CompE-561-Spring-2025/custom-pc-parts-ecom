import HeroSection from "@/components/hero-section"
import YourBuildsSection from "@/components/your-builds-section"
import SearchHistorySection from "@/components/search-history-section"
import NewArrivalsSection from "@/components/new-arrivals-section"
import Footer from "@/components/Footers"
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="flex-1">
          <div className="flex">
            <div className="flex flex-col" style={{ height: '30%' }}>
              <Sidebar />
            </div>
            <div className="flex-1">
              <HeroSection />
            </div>
          </div>
          <YourBuildsSection />
          <SearchHistorySection />
          <NewArrivalsSection />
        </div>
      </div>
      <Footer />
    </main>
  )
}
