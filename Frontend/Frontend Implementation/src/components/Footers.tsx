import Link from "next/link"
import Image from "next/image"
import PCBuilderImage from '@/components/images/PCBuilder.jpg'

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 mt-auto">
      {/* Main content section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PC Builder</h3>
            <p className="text-red-500 text-sm">Build Better. Build Smart</p>
            <p className="mt-4 text-sm">pcbuildersdsu@gmail.com</p>
            <p className="text-sm">(619)999-9999</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="mailto:pcbuildersdsu@gmail.com?subject=PC Builder Inquiry" className="hover:text-green-500">
                  Email Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="hover:text-green-500">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-green-500">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-green-500">
                  Log In
                </Link>
              </li>
              <li>
                <Link href="/user-builds" className="hover:text-green-500">
                  Your Builds
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-500">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-green-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-500">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <Image
                src={PCBuilderImage}
                alt="PC Builder Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="w-full border-t border-gray-800 mt-8">
        <div className="container mx-auto px-4 pt-8 text-center text-sm text-gray-500">
          <p>© Copyright PC-Builder 2025. All right reserved</p>
        </div>
      </div>
    </footer>
  )
}
