"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footers";
import { api } from "@/lib/auth";

interface Component {
  id: number;
  category: string;
  name: string;
  price: number;
  image_url?: string;
}

interface Build {
  id: number;
  name?: string;
  description?: string; 
  components: Component[];
}

export default function BuildDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const buildId = params.id;

  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { label: "CPU", key: "CPU" },
    { label: "Graphics Card", key: "GPU" },
    { label: "Memory", key: "RAM" },
    { label: "Motherboard", key: "Motherboard" },
    { label: "Power Supply", key: "PSU" },
    { label: "Storage", key: "Storage" },
    { label: "Case", key: "Case" },
    { label: "Monitor", key: "Monitor" },
    { label: "Operating System", key: "OS" },
  ];

  useEffect(() => {
    const fetchBuild = async () => {
      try {
        const buildRes = await api.get(`/builds/${buildId}`);
        const componentsRes = await api.get(`/builds/${buildId}/components`);

        const detailedComponents = await Promise.all(
          componentsRes.data.map(async (bc: any) => {
            const compRes = await api.get(`/components/${bc.component_id}`);
            return compRes.data;
          })
        );

        setBuild({
          id: buildRes.data.id,
          name: buildRes.data.name,
          description: buildRes.data.description,
          components: detailedComponents,
        });
      } catch (err) {
        console.error("Failed to fetch build or components", err);
        setError("Build not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBuild();
  }, [buildId]);

  const handleRemoveComponent = async (componentId: number) => {
    try {
      await api.delete(`/builds/${buildId}/components/by-component-id/${componentId}`);
      const updated = await api.get(`/builds/${buildId}/components`);
      const detailed = await Promise.all(
        updated.data.map(async (bc: any) => {
          const comp = await api.get(`/components/${bc.component_id}`);
          return comp.data;
        })
      );
      setBuild((prev) => (prev ? { ...prev, components: detailed } : null));
    } catch (err) {
      console.error("Failed to remove component", err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

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
    <>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2">
          {build.name ? `Build: ${build.name}` : `Build #${build.id}`}
        </h1>

        {/* ✅ Conditionally show description */}
        {build.description && (
          <p className="text-gray-600 mb-6 whitespace-pre-wrap">{build.description}</p>
        )}

        <table className="w-full text-left border">
          <thead>
            <tr className="border-b">
              <th className="p-3">Component</th>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(({ label, key }) => {
              const component = build.components.find((c) => c.category === key);
              return (
                <tr key={key} className="border-b">
                  <td className="p-3">{label}</td>
                  <td className="p-3 flex items-center gap-4">
                    {component ? (
                      <>
                        {component.image_url && (
                          <img
                            src={component.image_url}
                            alt={component.name}
                            className="w-12 h-12 object-contain"
                          />
                        )}
                        {component.name}
                      </>
                    ) : (
                      <span className="text-gray-400 italic">No component</span>
                    )}
                  </td>
                  <td className="p-3">
                    {component ? `$${component.price.toFixed(2)}` : "-"}
                  </td>
                  <td className="p-3">
                    {component ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveComponent(component.id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/browse-components?category=${label
                              .toLowerCase()
                              .replace(/\s+/g, "-")}&buildId=${build.id}`
                          )
                        }
                      >
                        Add
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-6 flex justify-start">
          <Button variant="outline" onClick={() => router.push("/browse-components")}>
            ← Return to Browse
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t pt-8">
        <Footer />
      </div>
    </>
  );
}