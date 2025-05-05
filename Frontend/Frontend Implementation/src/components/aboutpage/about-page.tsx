import Image from "next/image"
import TeamMember from "./team-member"
import PCBuilderImage from '@/components/images/PCBuilder.jpg'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Martina Azabo",
      role: "Founder & Chairman",
      socials: ["twitter", "instagram", "linkedin"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png",
    },
    {
      name: "Htet Hnin Su Wai",
      role: "Managing Director",
      socials: ["twitter", "instagram", "linkedin"],
      imageUrl: "https://shop.jazwares.com/cdn/shop/files/JWC2324-SpiderMan-Action4.1-lpr.jpg",
    },
    {
      name: "Diana Yousefnejad",
      role: "Product Designer",
      socials: ["twitter", "instagram", "linkedin"],
      imageUrl: "https://images.immediate.co.uk/production/volatile/sites/3/2021/03/Omni-Man-6c9cb30.jpg",
    },
    {
      name: "Yousif Faraj",
      role: "Organizer",
      socials: ["twitter", "instagram", "linkedin"],
      imageUrl: "https://image.spreadshirtmedia.net/image-server/v1/compositions/T1599A1PA5076PT10X15Y12D141484864W3574H4290/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/stick-figure-square-fridge-magnet.jpg",
    },
    {
      name: "Andrea Abed",
      role: "Managing Director",
      socials: ["twitter", "instagram", "linkedin"],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/J._Robert_Oppenheimer_at_the_Guest_Lodge%2C_Oak_Ridge%2C_in_1946_4.jpg/250px-J._Robert_Oppenheimer_at_the_Guest_Lodge%2C_Oak_Ridge%2C_in_1946_4.jpg",
    },
    {
      name: "Tri Bui (Honorary Mention)",
      role: "The Goat",
      socials: ["twitter", "instagram", "linkedin"],
      imageUrl: "data:image/jpeg;base64,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",
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
              PC Builder started as a class project in 2025 when our team recognized how difficult it was to build
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
            <p>Thank you for visiting PC Builder, where building your dream PC becomes simple and affordable.</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Image
          src={PCBuilderImage}
          alt="Gaming PC"
          width={500}
          height={500}
          className="object-cover"
         />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={index} 
              name={member.name} 
              role={member.role} 
              socials={member.socials} 
              imageUrl={member.imageUrl} // Pass the imageUrl to the component
            />
          ))}
        </div>
      </div>
    </div>
  )
}
