import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "My Account - PC Builder",
  description: "Manage your PC Builder account, orders, and settings",
}

export default function AccountLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
