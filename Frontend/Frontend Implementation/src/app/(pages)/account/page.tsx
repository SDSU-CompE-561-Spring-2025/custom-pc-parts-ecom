"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "@/components/Footers"
import { api, isAuthenticated, logout } from "@/lib/auth"

interface UserProfile {
  id: number
  username: string
  email: string
  is_active: boolean
}

export default function AccountPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me")
        const u = res.data.user
        setUser(u)
        setEmail(u.email || "")
        setUsername(u.username || "")
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load user data" })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords don't match" })
      return
    }

    try {
      setSaving(true)

      await api.put("/users/me", {
        email,
        username,
      })

      if (currentPassword && newPassword) {
        await api.put("/users/me/password", {
          current_password: currentPassword,
          new_password: newPassword,
        })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }

      setMessage({ type: "success", text: "Profile updated successfully" })
    } catch (err: any) {
      const detail = err?.response?.data?.detail || "Failed to update profile"
      setMessage({ type: "error", text: detail })
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (loading) return <p className="p-6 text-center">Loading...</p>

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome! {username}</h1>
          <Button onClick={handleLogout} variant="outline" className="text-red-500 border-red-500">
            Logout
          </Button>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSaveChanges}>
          <div className="mb-6">
            <label className="block mb-2">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <h3 className="text-lg font-semibold mb-4">Password Changes</h3>
          <div className="space-y-4 mb-6">
            <Input
              placeholder="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              placeholder="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </main>

      <footer className="bg-black">
        <Footer />
      </footer>
    </div>
  )
}