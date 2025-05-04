import HeroSection from "@/components/hero-section"
import YourBuildsSection from "@/components/your-builds-section"
import SearchHistorySection from "@/components/search-history-section"
import NewArrivalsSection from "@/components/new-arrivals-section"
import Footer from "@/components/Footers"
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - hidden on mobile, shown on md screens and up */}
            <div className="hidden md:block md:w-64">
              <Sidebar />
            </div>
            
            {/* Main content area */}
            <div className="flex-1">
              <HeroSection />
            </div>
          </div>
        </div>
        
        <YourBuildsSection />
        <SearchHistorySection />
        <NewArrivalsSection />
      </main>
      <Footer />
    </>
  )
}
