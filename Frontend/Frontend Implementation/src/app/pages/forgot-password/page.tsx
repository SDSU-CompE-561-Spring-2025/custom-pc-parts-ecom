import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footers"

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Reset your password</h1>
        <p className="text-gray-600 mb-6">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md">
            Send reset link
          </Button>
        </form>

        <p className="text-center mt-6">
          Remember your password?{" "}
          <Link href="/pages/login" className="text-red-500 hover:underline">
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
