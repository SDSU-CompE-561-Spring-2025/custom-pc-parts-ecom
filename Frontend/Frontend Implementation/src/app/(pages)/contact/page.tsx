import { Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footers"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content - container constrained */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
          <span className="text-gray-500">/</span>
          <span>Contact</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-500 text-white p-3 rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Call To Us</h3>
              </div>
              <p className="text-gray-600 mb-2">We are available 24/7, 7 days a week.</p>
              <p className="font-medium">Phone: +1(818)999-9999</p>
              <div className="border-t border-gray-200 my-4"></div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-500 text-white p-3 rounded-full">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Write To Us</h3>
              </div>
              <p className="text-gray-600 mb-2">Fill out our form and we will contact you within 24 hours.</p>
              <p className="font-medium">Email: pcbuilder@gmail.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email *"
                    required
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Your Phone *"
                    required
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md">
                  Send Message
                </Button>
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