import ComponentGrid from "@/components/browsePage/component-grid"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footers"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-8">Browse by Components</h2>
        <ComponentGrid />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  )
}
