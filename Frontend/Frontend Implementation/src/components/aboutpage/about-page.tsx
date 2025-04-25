import Image from "next/image"
import TeamMember from "./team-member"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Martina Azabo",
      role: "Founder & Chairman",
      socials: ["twitter", "instagram", "linkedin"],
    },
    {
      name: "Htet Hnin Su Wai",
      role: "Managing Director",
      socials: ["twitter", "instagram", "linkedin"],
    },
    {
      name: "Diana Yousefnejad",
      role: "Product Designer",
      socials: ["twitter", "instagram", "linkedin"],
    },
    {
      name: "Yousif Faraj",
      role: "Organizer",
      socials: ["twitter", "instagram", "linkedin"],
    },
    {
      name: "Andrea Abed",
      role: "Managing Director",
      socials: ["twitter", "instagram", "linkedin"],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <a href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </a>
        <span className="text-gray-500">/</span>
        <span>About</span>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">Our Story</h1>
          <div className="space-y-4">
            <p>
              PC Build Expert started as a class project in 2023 when our team recognized how difficult it was to build
              custom computers. As students interested in technology, we wanted to create a solution that would help
              others like us.
            </p>
            <p>
              We designed this website to simplify the PC building process by providing a platform where users can
              select compatible components, compare prices, and create their ideal computer setup without needing expert
              knowledge.
            </p>
            <p>
              Our goal is to make computer building accessible to everyone, from beginners to experienced builders. We
              focus on:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Ensuring all components are compatible</li>
              <li>Comparing prices across major retailers</li>
              <li>Providing educational resources for new builders</li>
              <li>Creating a community where users can share their builds</li>
            </ol>
            <p>
              This project has taught us valuable skills in web development, database management, and user experience
              design. We hope to continue improving the site based on user feedback and expanding its features
              throughout the semester.
            </p>
            <p>Thank you for visiting PC Build Expert, where building your dream PC becomes simple and affordable.</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-black p-8 rounded-lg">
            <Image
              src="/images/pc-case.png"
              alt="PC Builder Logo"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} name={member.name} role={member.role} socials={member.socials} />
          ))}
        </div>
      </div>
    </div>
  )
}
