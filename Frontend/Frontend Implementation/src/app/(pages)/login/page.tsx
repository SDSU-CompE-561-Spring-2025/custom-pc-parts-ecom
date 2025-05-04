"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import PCBuilderImage from '@/components/images/PCBuilder.jpg'
import Footer from "@/components/Footers"
import { login, LoginCredentials } from "@/lib/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login({ username, password })
      router.push("/") // Redirect to home page after successful login
      router.refresh() // Refresh to update UI based on auth state
    } catch (err) {
      setError("Invalid username or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
    {/* Main content - container constrained */}
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-4xl mx-auto">
        {/* PC Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Image
          src={PCBuilderImage}
          alt="Gaming PC"
          width={500}
          height={500}
          className="object-cover"
          />
          </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <h1 className="text-2xl font-bold mb-6">Sign in to PCBuilder</h1>
          <p className="text-gray-600 mb-6">Enter your details below</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex justify-between">
              <Button 
                type="submit" 
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>

              <Link href="/forgot-password" className="text-red-500 hover:underline flex items-center">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
      
    {/* Footer outside of container */}
    <Footer />
  </div>
  )
}

