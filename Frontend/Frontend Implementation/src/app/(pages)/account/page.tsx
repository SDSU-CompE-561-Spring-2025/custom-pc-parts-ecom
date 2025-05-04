"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "@/components/Footers"
import { api, isAuthenticated, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
  is_active: boolean
}

export default function AccountPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [activeSection, setActiveSection] = useState("profile")
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    async function fetchUserData() {
      if (!isAuthenticated()) {
        router.push("/login")
        return
      }

      try {
        setLoading(true)
        const response = await api.get<UserProfile>("/users/me")
        setUser(response.data)
        
        // Set form data
        setFirstName(response.data.first_name || "")
        setLastName(response.data.last_name || "")
        setEmail(response.data.email || "")
        setUsername(response.data.username || "")
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        setMessage({
          type: "error",
          text: "Failed to load your profile. Please try again later."
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })
    
    if (newPassword && newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "New passwords don't match"
      })
      return
    }

    try {
      setSaving(true)
      
      // Update profile information
      const profileData = {
        first_name: firstName,
        last_name: lastName,
        email: email
      }
      
      await api.patch(`/users/${user?.id}`, profileData)
      
      // If password change is requested
      if (currentPassword && newPassword) {
        await api.post("/users/change-password", {
          current_password: currentPassword,
          new_password: newPassword
        })
        
        // Clear password fields after successful update
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
      
      setMessage({
        type: "success",
        text: "Your profile has been updated successfully"
      })
    } catch (error) {
      console.error("Failed to update profile:", error)
      setMessage({
        type: "error",
        text: "Failed to update your profile. Please try again."
      })
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["profile", "addresses", "payment", "orders"]

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>My Account</span>
        </div>

        {/* Welcome Banner */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome! {username}</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-red-500 border-red-500 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="mb-8">
              <h2 className="font-bold text-lg mb-4">Manage My Account</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#profile"
                    onClick={(e) => scrollToSection(e, "profile")}
                    className={`${activeSection === "profile" ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500"} cursor-pointer`}
                  >
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#addresses"
                    onClick={(e) => scrollToSection(e, "addresses")}
                    className={`${activeSection === "addresses" ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500"} cursor-pointer`}
                  >
                    My Addresses
                  </a>
                </li>
                <li>
                  <a
                    href="#payment"
                    onClick={(e) => scrollToSection(e, "payment")}
                    className={`${activeSection === "payment" ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500"} cursor-pointer`}
                  >
                    My Payment Options
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-4">My Orders</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#orders"
                    onClick={(e) => scrollToSection(e, "orders")}
                    className={`${activeSection === "orders" ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500"} cursor-pointer`}
                  >
                    My Orders
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Status Message */}
            {message.text && (
              <div className={`mb-6 p-4 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {message.text}
              </div>
            )}
            
            {/* Edit Profile Section */}
            <section id="profile" className="mb-12 scroll-mt-8">
              <h2 className="text-xl font-bold mb-6">Edit Your Profile</h2>
              <form onSubmit={handleSaveChanges}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>

                <h3 className="text-lg font-semibold mb-4">Password Changes</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="currentPassword" className="block mb-2">
                      Current Password
                    </label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block mb-2">
                      New Password
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-2">
                      Confirm New Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-red-500 hover:bg-red-600 text-white"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </section>

            {/* Addresses Section */}
            <section id="addresses" className="mb-12 scroll-mt-8">
              <h2 className="text-xl font-bold mb-6">My Addresses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* This section would be populated from backend data in a future update */}
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium mb-2">Default Address</h3>
                  <p className="text-gray-600">No addresses saved yet.</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white">Add New Address</Button>
              </div>
            </section>

            {/* Payment Options Section */}
            <section id="payment" className="mb-12 scroll-mt-8">
              <h2 className="text-xl font-bold mb-6">My Payment Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* This section would be populated from backend data in a future update */}
                <div className="border p-4 rounded-md">
                  <p className="text-gray-600">No payment methods saved yet.</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white">Add Payment Method</Button>
              </div>
            </section>

            {/* Orders Section */}
            <section id="orders" className="scroll-mt-8">
              <h2 className="text-xl font-bold mb-6">My Orders</h2>
              <div className="border rounded-md overflow-hidden">
                <div className="p-4">
                  <p className="text-gray-600">No orders found.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
