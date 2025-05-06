import HeroSection from "@/components/hero-section"
import YourBuildsSection from "@/components/your-builds-section"
import SearchHistorySection from "@/components/search-history-section"
import NewArrivalsSection from "@/components/new-arrivals-section"
import Footer from "@/components/Footers"
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        {/* Main layout container with consistent max-width */}
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero section with sidebar */}
          <div className="flex flex-col md:flex-row gap-8 py-8">
            {/* Sidebar - hidden on mobile, shown on md screens and up */}
            <div className="hidden md:block md:w-64">
              <Sidebar />
            </div>
            
            {/* Main content area */}
            <div className="flex-1">
              <HeroSection />
            </div>
          </div>
          
          {/* Other sections with consistent width */}
          <YourBuildsSection />
          <SearchHistorySection />
          <NewArrivalsSection />
        </main>
        
        {/* Footer with same max-width constraint */}
        <div className="w-full bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}