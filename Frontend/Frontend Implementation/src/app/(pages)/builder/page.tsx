"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footers"; // ✅ Add this
import { api, isAuthenticated } from "@/lib/auth";

interface Component {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url?: string;
}

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

export default function CreateBuildPage() {
  const router = useRouter();
  const [buildName, setBuildName] = useState("");
  const [selectedComponents, setSelectedComponents] = useState<{ [category: string]: Component | null }>({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = Object.values(selectedComponents).reduce((sum, item) => item ? sum + item.price : sum, 0);

  const handleSaveBuild = async () => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    if (!buildName.trim()) {
      alert("Please enter a build name.");
      return;
    }

    const payload = {
      name: buildName,
      description: "",
      is_public: false,
      components: [],
    };

    try {
      setSubmitting(true);
      const res = await api.post("/builds/", payload);
      if (res.status === 200 || res.status === 201) {
        alert("Build created!");
        router.push(`/user-builds/${res.data.id}`);
      } else {
        alert("Failed to save build.");
      }
    } catch (error) {
      console.error("Error creating build", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Create New Build</h1>

        <input
          type="text"
          placeholder="Enter build name"
          value={buildName}
          onChange={(e) => setBuildName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md mb-6"
        />

        <table className="w-full text-left border mb-6">
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
              const component = selectedComponents[key];
              return (
                <tr key={key} className="border-b">
                  <td className="p-3">{label}</td>
                  <td className="p-3 italic text-gray-400">
                    {component ? component.name : "No component"}
                  </td>
                  <td className="p-3">{component ? `$${component.price.toFixed(2)}` : "-"}</td>
                  <td className="p-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/browse-components?category=${label.toLowerCase().replace(/\s+/g, "-")}`)
                      }
                    >
                      {component ? "Change" : "Add"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => router.push("/")}>Cancel</Button>
          <Button onClick={handleSaveBuild} disabled={submitting || !buildName}>
            Save Build
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