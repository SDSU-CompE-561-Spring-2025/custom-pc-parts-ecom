import Image from "next/image"
import { Twitter, Instagram, Linkedin } from "lucide-react"

interface TeamMemberProps {
  name: string
  role: string
  socials: string[]
  imageUrl: string 
}

export default function TeamMember({ name, role, socials, imageUrl }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-200 rounded-lg overflow-hidden mb-4 w-full aspect-square max-w-[250px]">
        <Image
          src={imageUrl || "/placeholder.svg?height=250&width=250"}
          alt={name}
          width={250}
          height={250}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600 mb-3">{role}</p>
      <div className="flex gap-2">
        {socials.includes("twitter") && (
          <a href="#" className="text-gray-700 hover:text-black">
            <Twitter className="h-5 w-5" />
          </a>
        )}
        {socials.includes("instagram") && (
          <a href="#" className="text-gray-700 hover:text-black">
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {socials.includes("linkedin") && (
          <a href="#" className="text-gray-700 hover:text-black">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  )
}