"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footers";
import { api, isAuthenticated } from "@/lib/auth";
import { Search, X } from "lucide-react";

interface Component {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url?: string;
  rating?: number;
  reviews?: number;
}

interface BuildComponent {
  component_id: number;
  quantity: number;
}

// Modal component for component selection
function ComponentSelectionModal({ 
  isOpen, 
  onClose, 
  category, 
  onSelectComponent,
  selectedCPU
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  category: string; 
  onSelectComponent: (component: Component) => void;
  selectedCPU?: Component | null;
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
            per_page: 50, // Increase to get more options
            page: 1
          }
        });
        
        let filteredComponents = response.data.items || [];
        
        // Filter motherboards based on CPU
        if (category === "Motherboard" && selectedCPU) {
          const cpuName = selectedCPU.name.toLowerCase();
          
          // Check if it's an AMD CPU
          if (cpuName.includes('amd') || cpuName.includes('ryzen')) {
            // Filter for AMD motherboards
            filteredComponents = filteredComponents.filter((mobo: Component) => {
              const moboName = mobo.name.toLowerCase();
              return (
                // AM4 motherboards
                moboName.includes('a520') || 
                moboName.includes('b550') || 
                moboName.includes('x570') ||
                // AM5 motherboards
                moboName.includes('a620') || 
                moboName.includes('b650') || 
                moboName.includes('x670')
              );
            });
          } 
          // Check if it's an Intel CPU
          else if (cpuName.includes('intel') || cpuName.includes('core i')) {
            // Filter for Intel motherboards
            filteredComponents = filteredComponents.filter((mobo: Component) => {
              const moboName = mobo.name.toLowerCase();
              return (
                // 12th/13th/14th gen motherboards
                moboName.includes('h610') || 
                moboName.includes('b660') || 
                moboName.includes('h670') || 
                moboName.includes('z690') ||
                moboName.includes('h770') || 
                moboName.includes('b760') || 
                moboName.includes('z790')
              );
            });
          }
          
          console.log(`Filtered to ${filteredComponents.length} motherboards for CPU: ${selectedCPU.name}`);
        }
        
        setComponents(filteredComponents);
        setError('');
      } catch (err) {
        console.error('Failed to fetch components:', err);
        setError('Failed to load components');
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, [isOpen, category, selectedCPU]);

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
  const [description, setDescription] = useState(""); 
  const [selectedComponents, setSelectedComponents] = useState<{ [category: string]: Component | null }>({});
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subtotal = Object.values(selectedComponents).reduce(
    (sum, item) => (item ? sum + item.price : sum),
    0
  );

  const handleOpenAddComponent = (categoryKey: string) => {
    // If trying to add a motherboard but no CPU is selected, show a warning
    if (categoryKey === "Motherboard" && !selectedComponents["CPU"]) {
      alert("Please select a CPU first to get compatible motherboards");
      return;
    }
    
    setSelectedCategory(categoryKey);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSelectComponent = (component: Component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: component
    }));
    handleCloseModal();
  };

  const handleSaveBuild = async () => {
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    if (!buildName.trim()) {
      alert("Please enter a build name.");
      return;
    }

    // Prepare the component list for the API
    const componentsList: BuildComponent[] = Object.values(selectedComponents)
      .filter((component): component is Component => component !== null)
      .map(component => ({
        component_id: component.id,
        quantity: 1
      }));

    const payload = {
      name: buildName,
      description: description.trim(),
      is_public: false,
      components: componentsList
    };

    try {
      setSubmitting(true);
      console.log("Saving build with payload:", payload);
      const res = await api.post("/builds/", payload);
      
      if (res.status === 200 || res.status === 201) {
        console.log("Build created successfully:", res.data);
        alert("Build created!");
        router.push(`/user-builds/${res.data.id}`);
      } else {
        console.error("Failed to save build:", res);
        alert("Failed to save build.");
      }
    } catch (error) {
      console.error("Error creating build", error);
      alert("Error creating build. Please try again.");
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
          className="w-full px-4 py-3 border border-gray-300 rounded-md mb-4"
        />

        <textarea
          placeholder="Enter a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md mb-6 resize-none"
          rows={4}
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
                  <td className="p-3">{component ? `$${component.price.toFixed(2)}` : "-"}</td>
                  <td className="p-3">
                    <Button
                      variant={component ? "outline" : "secondary"}
                      size="sm"
                      onClick={() => handleOpenAddComponent(key)}
                    >
                      {component ? "Change" : "Add"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="p-3 text-right font-semibold">Total:</td>
              <td className="p-3 font-semibold">${subtotal.toFixed(2)}</td>
              <td className="p-3"></td>
            </tr>
          </tfoot>
        </table>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => router.push("/user-builds")}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveBuild} 
            disabled={submitting || !buildName}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Save Build
          </Button>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <Footer />
      </div>
      
      {isModalOpen && selectedCategory && (
        <ComponentSelectionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          category={selectedCategory}
          onSelectComponent={handleSelectComponent}
          selectedCPU={selectedCategory === "Motherboard" ? selectedComponents["CPU"] : undefined}
        />
      )}
    </>
  );
}