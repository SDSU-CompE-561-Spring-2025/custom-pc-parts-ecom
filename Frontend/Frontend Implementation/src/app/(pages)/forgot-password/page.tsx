// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import Footer from "@/components/Footers"

// export default function ForgotPasswordPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-md mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Change your password</h1>
//         <p className="text-gray-600 mb-6">
//           Please enter your current password and then enter your new password.
//         </p>

//         <form className="space-y-4">
//           <div>
//             <input
//               type="password"
//               placeholder="Current Password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>

//           <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md">
//             Submit
//           </Button>
//         </form>

//         <p className="text-center mt-6">
//           Remember your password?{" "}
//           <Link href="/login" className="text-red-500 hover:underline">
//             Back to login
//           </Link>
//         </p>
//       </div>
//       <main>
//         <Footer />
//         </main>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footers"

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token") // JWT token from login
      if (!token) {
        setMessage("Not authenticated. Please log in.")
        return
      }

      const response = await axios.put(
        "http://localhost:8000/api/v1/users/me/password", // Adjust if deployed
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setMessage("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
    } catch (error: any) {
      setMessage("Error changing password: " + (error.response?.data?.detail || "Unknown error"))
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Change your password</h1>
        <p className="text-gray-600 mb-6">
          Please enter your current password and then enter your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md">
            Submit
          </Button>

          {message && (
            <p className="text-sm text-center text-gray-700 mt-4">{message}</p>
          )}
        </form>

        <p className="text-center mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-red-500 hover:underline">
            Back to login
          </Link>
        </p>
      </div>

      <main>
        <Footer />
      </main>
    </div>
  )
}
