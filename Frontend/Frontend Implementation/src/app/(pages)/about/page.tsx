import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import AboutPage from "@/components/aboutpage/about-page"
import Footer from "@/components/Footers"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <><main className="flex-1">
        <AboutPage />
      </main>
      <main className="flex-1">
        <Footer />
      </main></>
  )
}

