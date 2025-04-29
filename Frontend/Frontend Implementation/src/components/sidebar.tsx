"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

const sidebarItems = [
  { name: "Components", href: "/browse-components" },
  { name: "Products", href: "/products" },
  { name: "Account", href: "/account" },
  { name: "Your Builds", href: "/user-builds" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r min-h-[calc(100vh-64px)]">
      <nav className="p-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center justify-between p-2 hover:bg-muted rounded-md text-sm"
              >
                {item.name}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
