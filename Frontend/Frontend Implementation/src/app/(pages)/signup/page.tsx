"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footers"
import PCBuilderImage from '@/components/images/PCBuilder.jpg'

export default function SignUpPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })

    const data = await res.json()

    if (!res.ok) {
      console.log("Signup error:", data) // ← add this line
      setError(data.detail || "Something went wrong. Please try again.")
      return
    }

      // Redirect to login page or dashboard
      router.push("/login")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-4xl mx-auto">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={PCBuilderImage}
              alt="Gaming PC"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 max-w-md">
            <h1 className="text-2xl font-bold mb-6">Create an account</h1>
            <p className="text-gray-600 mb-6">Enter your details below</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md">
                Create Account
              </Button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-2 text-sm text-gray-500 absolute">or</span>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-50"
              >
                {/* Google SVG omitted for brevity */}
                Sign up with Google
              </button>
            </form>

            <p className="text-center mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-red-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}