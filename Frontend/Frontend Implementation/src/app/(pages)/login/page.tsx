"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import PCBuilderImage from '@/components/images/PCBuilder.jpg'
import Footer from "@/components/Footers"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.log("Login error:", data)
        setError(data.detail || "Something went wrong. Please try again.")
        return
      }

      // You can store the token in localStorage or a cookie if needed
      localStorage.setItem("access_token", data.access_token)
      router.push("/") // redirect to home or dashboard
    } catch (err) {
      console.error("Login exception:", err)
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
            <h1 className="text-2xl font-bold mb-6">Sign in to PCBuilder</h1>
            <p className="text-gray-600 mb-6">Enter your details below</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
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

              <div className="flex justify-between">
                <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md">
                  Log in
                </Button>

                <Link href="/forgot-password" className="text-red-500 hover:underline flex items-center">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}