"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footers"
import PCBuilderImage from '@/components/images/PCBuilder.jpg'
import PasswordRequirements from "@/components/ui/PasswordRequirements"

export default function SignUpPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState("")
  const [showPasswordFeedback, setShowPasswordFeedback] = useState(false)

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length < 6) return "Weak"
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8) return "Strong"
    return "Medium"
  }

  const containsInvalidChars = (input: string) => /["'<>]/.test(input)

  const handlePasswordChange = (val: string) => {
    setPassword(val)
    setShowPasswordFeedback(val.length > 0)
    setPasswordStrength(getPasswordStrength(val))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (containsInvalidChars(username) || containsInvalidChars(email)) {
      setError("Username or email contains invalid characters like \" ' < >")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.log("Signup error:", data)
        setError(data.detail || "Something went wrong. Please try again.")
        return
      }

      router.push("/login")
    } catch (err) {
      console.error("Signup request failed:", err)
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex flex-col md:flex-row gap-8 items-start justify-center max-w-4xl mx-auto min-h-[650px]">
        <div className="relative w-[500px] h-[500px] flex-shrink-0 overflow-hidden rounded-lg">
  <Image
    src={PCBuilderImage}
    alt="Gaming PC"
    fill
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
              <div className="relative space-y-4">
  {/* Password */}
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => handlePasswordChange(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
    required
  />

  {/* Confirm Password */}
  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
    required
  />

  {/* Password Feedback */}
  {showPasswordFeedback && (
    <div className="bg-white p-4 border border-gray-300 rounded-md shadow-sm w-full">
      <p
        className={`text-sm mb-2 ${
          passwordStrength === "Strong"
            ? "text-green-600"
            : passwordStrength === "Medium"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        Password strength: {passwordStrength}
      </p>
      <PasswordRequirements passwordValue={password} />
    </div>
  )}
</div>
              

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md">
                Create Account
              </Button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-2 text-sm text-gray-500 absolute">or</span>
              </div>

              
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
