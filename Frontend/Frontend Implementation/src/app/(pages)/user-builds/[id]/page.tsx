"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footers";
import { api } from "@/lib/auth";
import { Search, X } from "lucide-react";

interface Component {
  id: number;
  category: string;
  name: string;
  price: number;
  image_url?: string;
  rating?: number;
  reviews?: number;
}

interface BuildComponent {
  id: number;
  build_id: number;
  component_id: number;
  quantity: number;
}

interface Build {
  id: number;
  name?: string;
  description?: string; 
  components: Component[];
}

// Modal component for component selection
function ComponentSelectionModal({ 
  isOpen, 
  onClose, 
  category, 
  onSelectComponent, 
  buildId 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  category: string; 
  onSelectComponent: (component: Component) => void;
  buildId: string;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const fetchComponents = async () => {
      try {
        setLoading(true);
        // Fetch components filtered by category
        const response = await api.get('/components', {
          params: {
            category: category,
            per_page: 20,
            page: 1
          }
        });
        
        setComponents(response.data.items || []);
        setError('');
      } catch (err) {
        console.error('Failed to fetch components:', err);
        setError('Failed to load components');
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, [isOpen, category]);

  const filteredComponents = searchTerm.trim() === ''
    ? components
    : components.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Select {category}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 border-b">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-grow p-2">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading components...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredComponents.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">No components found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredComponents.map((component) => (
                <div 
                  key={component.id}
                  className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer flex items-center"
                  onClick={() => onSelectComponent(component)}
                >
                  {component.image_url && (
                    <img 
                      src={component.image_url} 
                      alt={component.name}
                      className="w-16 h-16 object-contain mr-4" 
                    />
                  )}
                  <div className="flex-grow">
                    <h3 className="font-medium">{component.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      ${component.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center mr-3">
                    {component.rating ? (
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star} 
                              fill={star <= Math.round(component.rating || 0) ? "currentColor" : "none"} 
                              stroke="currentColor" 
                              className={`h-4 w-4 ${star <= Math.round(component.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                              />
                            </svg>
                          ))}
                        </div>
                        {component.reviews && (
                          <span className="text-xs text-gray-500 ml-1">({component.reviews})</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No ratings</span>
                    )}
                  </div>
                  <Button size="sm" className="ml-2">
                    Select
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Combined component that handles everything
export default function BuildDetailsPage() {
  const params = useParams();
  const buildId = params?.id as string;
  
  const router = useRouter();
  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      if (!buildId) return;
      
      try {
        // Fetch basic build info
        const buildResponse = await api.get(`/builds/${buildId}`);
        console.log("Build response:", buildResponse.data);
        
        // Fetch build components
        const componentsResponse = await api.get(`/builds/${buildId}/components`);
        console.log("Components response:", componentsResponse.data);
        
        // Fetch detailed component info for each component
        const detailedComponents = await Promise.all(
          componentsResponse.data.map(async (bc: BuildComponent) => {
            const componentResponse = await api.get(`/components/${bc.component_id}`);
            return componentResponse.data;
          })
        );
        console.log("Detailed components:", detailedComponents);
        
        // Create the combined build data
        const buildData = {
          ...buildResponse.data,
          components: detailedComponents
        };
        
        setBuild(buildData);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch build:", err);
        setError(err.response?.data?.detail || "Failed to fetch build details");
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
        updated.data.map(async (bc: BuildComponent) => {
          const comp = await api.get(`/components/${bc.component_id}`);
          return comp.data;
        })
      );
      setBuild((prev) => (prev ? { ...prev, components: detailed } : null));
    } catch (err) {
      console.error("Failed to remove component", err);
    }
  };

  const handleOpenAddComponent = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSelectComponent = async (component: Component) => {
    if (!buildId || !build) return;
    
    try {
      // Add component to build
      await api.post(`/builds/${buildId}/components`, {
        component_id: component.id,
        quantity: 1
      });
      
      // Refresh build components
      const updated = await api.get(`/builds/${buildId}/components`);
      const detailed = await Promise.all(
        updated.data.map(async (bc: BuildComponent) => {
          const comp = await api.get(`/components/${bc.component_id}`);
          return comp.data;
        })
      );
      
      setBuild((prev) => (prev ? { ...prev, components: detailed } : null));
      handleCloseModal();
    } catch (err) {
      console.error("Failed to add component", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-8">
          <p className="text-center py-10">Loading build details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-10 text-red-500">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!build) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-10 text-gray-500">Build not found</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">{build.name}</h1>
            <Button
              variant="outline"
              onClick={() => router.push("/user-builds")}
            >
              Back to Builds
            </Button>
          </div>

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
                const component = build.components?.find((c) => c.category === key);
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
                          onClick={() => handleOpenAddComponent(key)}
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
            <Button variant="outline" onClick={() => router.push("/user-builds")}>
              ← Back to Builds
            </Button>
          </div>
        </main>

        <Footer />
      </div>

      {isModalOpen && selectedCategory && (
        <ComponentSelectionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          category={selectedCategory}
          onSelectComponent={handleSelectComponent}
          buildId={buildId}
        />
      )}
    </>
  );
}