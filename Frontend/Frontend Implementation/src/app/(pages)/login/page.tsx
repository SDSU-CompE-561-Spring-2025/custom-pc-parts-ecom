import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import PCBuilderImage from '@/components/images/PCBuilder.jpg'
import Footer from "@/components/Footers"

export default function LoginPage() {
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

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

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
      
      {/* Footer outside of container */}
      <Footer />
    </div>
  )
}

