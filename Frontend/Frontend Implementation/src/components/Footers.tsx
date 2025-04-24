import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">PC Builder</h3>
            <p className="text-sm text-gray-400">Build Better, Build Smarter</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white">
                  pcbuilder@gmail.com
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  (999)999-9999
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/account" className="hover:text-white">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">
                  Login / Sign Up
                </Link>
              </li>
              <li>
                <Link href="/your-builds" className="hover:text-white">
                  Your Builds
                </Link>
              </li>
              <li>
                <Link href="/logout" className="hover:text-white">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-4">
          <p className="text-xs text-gray-500">© Copyright 2025. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Pc_builder_logo.jpg"
              alt="PC Builder Logo"
              width={100}
              height={50}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
