"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "@/components/Footers"

export default function AccountPage() {
  const [firstName, setFirstName] = useState("Htet Hnin Su")
  const [lastName, setLastName] = useState("Wai")
  const [email, setEmail] = useState("hwai6540@sdsu.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [activeSection, setActiveSection] = useState("profile")

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Profile updated")
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
          <h1 className="text-2xl font-bold">Welcome! Username</h1>
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
                  <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
                    Save Changes
                  </Button>
                </div>
              </form>
            </section>

            {/* Addresses Section */}
            <section id="addresses" className="mb-12 scroll-mt-8">
              <h2 className="text-xl font-bold mb-6">My Addresses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium mb-2">Address 1</h3>
                  <p className="text-gray-600">Kingston, 5236, United States</p>
                </div>
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium mb-2">Address 2</h3>
                  <p className="text-gray-600">Queenston, 5723, United States</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white">Edit</Button>
              </div>
            </section>

            {/* Payment Options Section */}
            <section id="payment" className="mb-12 scroll-mt-8">
              <h2 className="text-xl font-bold mb-6">My Payment Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-blue-900 rounded-md flex items-center justify-center text-white text-xs">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">Chase Sapphire Preferred</p>
                      <p className="text-sm text-gray-500">Credit Card Ending in •••• 3654</p>
                    </div>
                  </div>
                </div>
                <div className="border p-4 rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs">
                      CITI
                    </div>
                    <div>
                      <p className="font-medium">Citi® Double Cash</p>
                      <p className="text-sm text-gray-500">Credit Card Ending in •••• 9810</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button className="bg-red-500 hover:bg-red-600 text-white">Edit</Button>
              </div>
            </section>

            {/* Orders Section */}
            <section id="orders" className="mb-16 scroll-mt-8">
              <h2 className="text-xl font-bold mb-6">My Orders</h2>
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Thermaltake TH120 V2 ARGB Liquid Cooler"
                        width={64}
                        height={64}
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">Thermaltake TH120 V2 ARGB Liquid Cooler CL-W</p>
                      <p className="text-sm text-gray-500">Qty: 1 | $69.99</p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-green-600 font-medium">Delivered on March 11, 2025</p>
                      <Link href="#" className="text-blue-500 text-sm">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="SANSUI Monitor"
                        width={64}
                        height={64}
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">SANSUI Monitor 22 inch 1080p HD 75Hz Computer Monitor with HDMI VGA</p>
                      <p className="text-sm text-gray-500">Qty: 1 | $79.99</p>
                    </div>
                    <div className="md:text-right">
                      <p className="text-blue-600 font-medium">Shipped on March 3, 2025</p>
                      <Link href="#" className="text-blue-500 text-sm">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button className="bg-red-500 hover:bg-red-600 text-white">View More</Button>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
