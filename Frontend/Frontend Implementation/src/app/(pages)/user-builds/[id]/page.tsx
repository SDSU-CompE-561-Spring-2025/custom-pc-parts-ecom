// // src/app/user-builds/[id]/page.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Component {
//   category: string;
//   name: string;
//   price: number;
//   image_url?: string;
// }

// interface Build {
//   id: number;
//   components: Component[];
// }

// export default function BuildDetailsPage({ params }: { params: { id: string } }) {
//   const router = useRouter();
//   const buildId = params.id;

//   const [build, setBuild] = useState<Build | null>(null);

//   useEffect(() => {
//     // Replace with actual fetch later
//     const fakeBuild: Build = {
//       id: parseInt(buildId),
//       components: [
//         {
//           category: "CPU",
//           name: "Intel Core i7-12700K",
//           price: 550,
//           image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Intel_Core_i7_Logo.svg/2048px-Intel_Core_i7_Logo.svg.png"
//         },
//         {
//           category: "Graphics Card",
//           name: "MSI RTX 5090 32G",
//           price: 550,
//           image_url: "https://m.media-amazon.com/images/I/81s6DUyQCZL.jpg"
//         },
//         // Add more...
//       ],
//     };

//     setBuild(fakeBuild);
//   }, [buildId]);

//   return (
//     <div className="max-w-5xl mx-auto py-12 px-4">
//       <h1 className="text-3xl font-bold mb-6">Build #{buildId}</h1>
      
//       <table className="w-full text-left border">
//         <thead>
//           <tr className="border-b">
//             <th className="p-3">Component</th>
//             <th className="p-3">Product</th>
//             <th className="p-3">Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {build?.components.map((c, i) => (
//             <tr key={i} className="border-b">
//               <td className="p-3">{c.category}</td>
//               <td className="p-3 flex items-center gap-4">
//                 {c.image_url && (
//                   <img src={c.image_url} alt={c.name} className="w-12 h-12 object-contain" />
//                 )}
//                 {c.name}
//               </td>
//               <td className="p-3">${c.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-6 flex justify-between">
//         <Button variant="outline" onClick={() => router.push("/browse-components")}>
//           Return to Browse
//         </Button>
//         <Button onClick={() => alert("Update cart clicked!")}>
//           Update Cart
//         </Button>
//       </div>
//     </div>
//   );
// }


//////////////////////////////////////// below was trying to fetch from backend, not working right now





// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { ArrowLeft } from "lucide-react"
// import Footer from "@/components/Footers"
// import { Button } from "@/components/ui/button"
// import { api } from "@/lib/auth" // ✅ your wrapped axios instance

// // Interfaces
// interface Component {
//   id: number
//   name: string
//   category: string
//   price: number
//   image_url?: string
// }

// interface Build {
//   id: number
//   name: string
//   price: number
// }

// export default function BuildDetailsPage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const buildId = Number(id)

//   const [build, setBuild] = useState<Build | null>(null)
//   const [components, setComponents] = useState<Component[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [buildRes, componentsRes] = await Promise.all([
//           api.get(`/builds/${buildId}`),
//           api.get(`/builds/${buildId}/components`)
//         ])
//         setBuild(buildRes.data)
//         setComponents(componentsRes.data)
//       } catch (err) {
//         console.error("Failed to fetch build or components", err)
//         setError("Build not found")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [buildId])

//   const handleBack = () => {
//     router.push("/user-builds")
//   }

//   if (loading) {
//     return <p className="text-center py-10">Loading build details...</p>
//   }

//   if (error || !build) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <main className="flex-1 container mx-auto px-4 py-8">
//           <div className="text-center py-10">
//             <h1 className="text-2xl font-bold mb-4">Build not found</h1>
//             <p className="text-gray-500 mb-6">{error || "The requested build could not be found"}</p>
//             <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
//               <ArrowLeft className="h-4 w-4" /> Back to Builds
//             </Button>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-bold">Build #{build.id}: {build.name}</h1>
//             <p className="text-lg font-medium text-red-600">Total: ${build.price}</p>
//           </div>
//           <Button onClick={handleBack} variant="outline" className="mt-4 md:mt-0 flex items-center gap-2">
//             <ArrowLeft className="h-4 w-4" /> Back to Builds
//           </Button>
//         </div>

//         <div className="border rounded-lg overflow-hidden">
//           {/* Table Header */}
//           <div className="grid grid-cols-3 bg-gray-50 p-4 font-medium">
//             <div>Component</div>
//             <div>Product</div>
//             <div className="text-right">Price</div>
//           </div>

//           {/* Table Rows */}
//           {components.map((component) => (
//             <div key={component.id} className="grid grid-cols-3 p-4 items-center border-t">
//               <div>{component.category}</div>
//               <div className="flex items-center gap-2">
//                 <Image
//                   src={component.image_url || "/placeholder.svg"}
//                   alt={component.name}
//                   width={40}
//                   height={40}
//                   className="rounded"
//                 />
//                 <span>{component.name}</span>
//               </div>
//               <div className="text-right">${component.price.toFixed(2)}</div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between mt-6">
//           <Button variant="outline" onClick={() => router.push("/browse-components")}>
//             Return to Browse
//           </Button>
//           <Button
//             className="bg-purple-600 hover:bg-purple-700"
//             onClick={() => router.push(`/user-builds/${buildId}/edit`)}
//           >
//             Edit Build
//           </Button>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/auth"; // Make sure this is your axios wrapper

interface Component {
  category: string;
  name: string;
  price: number;
  image_url?: string;
}

interface Build {
  id: number;
  name?: string;
  components: Component[];
}

export default function BuildDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const buildId = params.id;

  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuild = async () => {
      try {
        const response = await api.get(`/builds/${buildId}`);
        const buildData = response.data;

        setBuild({
          id: buildData.id,
          name: buildData.name,
          components: [
            {
              category: "CPU",
              name: "Intel Core i7-12700K",
              price: 550,
              image_url:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Intel_Core_i7_Logo.svg/2048px-Intel_Core_i7_Logo.svg.png",
            },
            {
              category: "Graphics Card",
              name: "MSI RTX 5090 32G",
              price: 550,
              image_url: "https://m.media-amazon.com/images/I/81s6DUyQCZL.jpg",
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch build", err);
        setError("Build not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBuild();
  }, [buildId]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error || !build) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Build not found</h1>
        <p className="text-gray-500 mb-4">{error}</p>
        <Button variant="outline" onClick={() => router.push("/user-builds")}>
          ← Back to Builds
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {build.name ? `Build: ${build.name}` : `Build #${build.id}`}
      </h1>

      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-3">Component</th>
            <th className="p-3">Product</th>
            <th className="p-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {build.components.map((c, i) => (
            <tr key={i} className="border-b">
              <td className="p-3">{c.category}</td>
              <td className="p-3 flex items-center gap-4">
                {c.image_url && (
                  <img
                    src={c.image_url}
                    alt={c.name}
                    className="w-12 h-12 object-contain"
                  />
                )}
                {c.name}
              </td>
              <td className="p-3">${c.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={() => router.push("/browse-components")}>
          Return to Browse
        </Button>
        <Button onClick={() => alert("Update cart clicked!")}>
          Update Cart
        </Button>
      </div>
    </div>
  );
}