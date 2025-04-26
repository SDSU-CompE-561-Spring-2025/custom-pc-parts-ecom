import type { FilterConfig } from "@/components/category/filter-sidebar"

// CPU Filter Configuration
export const cpuFilters: FilterConfig = {
  sections: [
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "intel", label: "Intel" },
        { id: "amd", label: "AMD" },
      ],
      defaultOpen: true,
    },
    {
      id: "series",
      title: "Series",
      type: "checkbox",
      options: [
        { id: "intel-core-i9", label: "Intel Core i9" },
        { id: "intel-core-i7", label: "Intel Core i7" },
        { id: "intel-core-i5", label: "Intel Core i5" },
        { id: "intel-core-i3", label: "Intel Core i3" },
        { id: "amd-ryzen-9", label: "AMD Ryzen 9" },
        { id: "amd-ryzen-7", label: "AMD Ryzen 7" },
        { id: "amd-ryzen-5", label: "AMD Ryzen 5" },
        { id: "amd-ryzen-3", label: "AMD Ryzen 3" },
      ],
      defaultOpen: true,
    },
    {
      id: "socket",
      title: "Socket",
      type: "chip",
      options: [{ label: "LGA1700" }, { label: "LGA1200" }, { label: "AM5" }, { label: "AM4" }],
    },
    {
      id: "cores",
      title: "Cores",
      type: "checkbox",
      options: [
        { id: "16-core", label: "16+ Cores" },
        { id: "12-core", label: "12 Cores" },
        { id: "8-core", label: "8 Cores" },
        { id: "6-core", label: "6 Cores" },
        { id: "4-core", label: "4 Cores" },
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 100,
        max: 800,
        defaultValue: 300,
        step: 10,
      },
    },
  ],
}

// CPU Cooler Filter Configuration
export const cpuCoolerFilters: FilterConfig = {
  sections: [
    {
      id: "type",
      title: "Type",
      type: "checkbox",
      options: [
        { id: "air-cooler", label: "Air Cooler" },
        { id: "liquid-cooler", label: "Liquid Cooler" },
      ],
      defaultOpen: true,
    },
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "noctua", label: "Noctua" },
        { id: "corsair", label: "Corsair" },
        { id: "cooler-master", label: "Cooler Master" },
        { id: "nzxt", label: "NZXT" },
        { id: "be-quiet", label: "be quiet!" },
      ],
      defaultOpen: true,
    },
    {
      id: "socket",
      title: "Socket",
      type: "chip",
      options: [{ label: "LGA1700" }, { label: "LGA1200" }, { label: "AM5" }, { label: "AM4" }],
    },
    {
      id: "radiator-size",
      title: "Radiator Size",
      type: "checkbox",
      options: [
        { id: "120mm", label: "120mm" },
        { id: "240mm", label: "240mm" },
        { id: "280mm", label: "280mm" },
        { id: "360mm", label: "360mm" },
      ],
    },
    {
      id: "colors",
      title: "Colors",
      type: "color",
      options: [
        { color: "#000000" }, // black
        { color: "#ffffff", borderColor: "gray-300" }, // white
        { color: "#22c55e" }, // green
        { color: "#ef4444" }, // red
        { color: "#3b82f6" }, // blue
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 30,
        max: 300,
        defaultValue: 100,
        step: 5,
      },
    },
  ],
}

// Motherboard Filter Configuration
export const motherboardFilters: FilterConfig = {
  sections: [
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "asus", label: "ASUS" },
        { id: "msi", label: "MSI" },
        { id: "gigabyte", label: "Gigabyte" },
        { id: "asrock", label: "ASRock" },
      ],
      defaultOpen: true,
    },
    {
      id: "socket",
      title: "Socket",
      type: "chip",
      options: [{ label: "LGA1700" }, { label: "LGA1200" }, { label: "AM5" }, { label: "AM4" }],
      defaultOpen: true,
    },
    {
      id: "form-factor",
      title: "Form Factor",
      type: "checkbox",
      options: [
        { id: "atx", label: "ATX" },
        { id: "micro-atx", label: "Micro ATX" },
        { id: "mini-itx", label: "Mini ITX" },
        { id: "e-atx", label: "E-ATX" },
      ],
    },
    {
      id: "chipset",
      title: "Chipset",
      type: "checkbox",
      options: [
        { id: "z790", label: "Intel Z790" },
        { id: "z690", label: "Intel Z690" },
        { id: "b760", label: "Intel B760" },
        { id: "x670", label: "AMD X670" },
        { id: "b650", label: "AMD B650" },
        { id: "x570", label: "AMD X570" },
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 80,
        max: 700,
        defaultValue: 200,
        step: 10,
      },
    },
  ],
}

// Memory Filter Configuration
export const memoryFilters: FilterConfig = {
  sections: [
    {
      id: "type",
      title: "Type",
      type: "checkbox",
      options: [
        { id: "ddr5", label: "DDR5" },
        { id: "ddr4", label: "DDR4" },
      ],
      defaultOpen: true,
    },
    {
      id: "capacity",
      title: "Capacity",
      type: "checkbox",
      options: [
        { id: "8gb", label: "8GB" },
        { id: "16gb", label: "16GB" },
        { id: "32gb", label: "32GB" },
        { id: "64gb", label: "64GB" },
        { id: "128gb", label: "128GB" },
      ],
      defaultOpen: true,
    },
    {
      id: "speed",
      title: "Speed",
      type: "checkbox",
      options: [
        { id: "6000mhz", label: "6000MHz+" },
        { id: "5600mhz", label: "5600MHz" },
        { id: "4800mhz", label: "4800MHz" },
        { id: "3600mhz", label: "3600MHz" },
        { id: "3200mhz", label: "3200MHz" },
      ],
    },
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "corsair", label: "Corsair" },
        { id: "gskill", label: "G.Skill" },
        { id: "crucial", label: "Crucial" },
        { id: "kingston", label: "Kingston" },
        { id: "teamgroup", label: "TeamGroup" },
      ],
    },
    {
      id: "colors",
      title: "Colors",
      type: "color",
      options: [
        { color: "#000000" }, // black
        { color: "#ffffff", borderColor: "gray-300" }, // white
        { color: "#22c55e" }, // green
        { color: "#ef4444" }, // red
        { color: "#3b82f6" }, // blue
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 40,
        max: 500,
        defaultValue: 120,
        step: 10,
      },
    },
  ],
}

// Storage Filter Configuration
export const storageFilters: FilterConfig = {
  sections: [
    {
      id: "type",
      title: "Type",
      type: "checkbox",
      options: [
        { id: "nvme", label: "NVMe SSD" },
        { id: "sata-ssd", label: "SATA SSD" },
        { id: "hdd", label: "Hard Drive" },
      ],
      defaultOpen: true,
    },
    {
      id: "capacity",
      title: "Capacity",
      type: "checkbox",
      options: [
        { id: "500gb", label: "500GB" },
        { id: "1tb", label: "1TB" },
        { id: "2tb", label: "2TB" },
        { id: "4tb", label: "4TB" },
        { id: "8tb", label: "8TB+" },
      ],
      defaultOpen: true,
    },
    {
      id: "interface",
      title: "Interface",
      type: "checkbox",
      options: [
        { id: "pcie-4", label: "PCIe 4.0" },
        { id: "pcie-3", label: "PCIe 3.0" },
        { id: "sata-3", label: "SATA III" },
      ],
    },
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "samsung", label: "Samsung" },
        { id: "western-digital", label: "Western Digital" },
        { id: "crucial", label: "Crucial" },
        { id: "seagate", label: "Seagate" },
        { id: "kingston", label: "Kingston" },
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 50,
        max: 400,
        defaultValue: 120,
        step: 10,
      },
    },
  ],
}

// Video Card Filter Configuration
export const videoCardFilters: FilterConfig = {
  sections: [
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "nvidia", label: "NVIDIA" },
        { id: "amd", label: "AMD" },
        { id: "intel", label: "Intel" },
      ],
      defaultOpen: true,
    },
    {
      id: "series",
      title: "Series",
      type: "checkbox",
      options: [
        { id: "rtx-40", label: "RTX 40 Series" },
        { id: "rtx-30", label: "RTX 30 Series" },
        { id: "radeon-7000", label: "Radeon 7000 Series" },
        { id: "radeon-6000", label: "Radeon 6000 Series" },
        { id: "arc", label: "Intel Arc" },
      ],
      defaultOpen: true,
    },
    {
      id: "memory",
      title: "Memory",
      type: "checkbox",
      options: [
        { id: "24gb", label: "24GB" },
        { id: "16gb", label: "16GB" },
        { id: "12gb", label: "12GB" },
        { id: "8gb", label: "8GB" },
      ],
    },
    {
      id: "manufacturer",
      title: "Manufacturer",
      type: "checkbox",
      options: [
        { id: "asus", label: "ASUS" },
        { id: "msi", label: "MSI" },
        { id: "evga", label: "EVGA" },
        { id: "gigabyte", label: "Gigabyte" },
        { id: "zotac", label: "Zotac" },
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 200,
        max: 2000,
        defaultValue: 600,
        step: 50,
      },
    },
  ],
}

// Case Filter Configuration
export const caseFilters: FilterConfig = {
  sections: [
    {
      id: "form-factor",
      title: "Form Factor",
      type: "checkbox",
      options: [
        { id: "full-tower", label: "Full Tower" },
        { id: "mid-tower", label: "Mid Tower" },
        { id: "mini-tower", label: "Mini Tower" },
        { id: "small-form", label: "Small Form Factor" },
      ],
      defaultOpen: true,
    },
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "corsair", label: "Corsair" },
        { id: "nzxt", label: "NZXT" },
        { id: "fractal", label: "Fractal Design" },
        { id: "lian-li", label: "Lian Li" },
        { id: "phanteks", label: "Phanteks" },
      ],
      defaultOpen: true,
    },
    {
      id: "colors",
      title: "Colors",
      type: "color",
      options: [
        { color: "#000000" }, // black
        { color: "#ffffff", borderColor: "gray-300" }, // white
        { color: "#22c55e" }, // green
        { color: "#ef4444" }, // red
        { color: "#3b82f6" }, // blue
      ],
    },
    {
      id: "features",
      title: "Features",
      type: "checkbox",
      options: [
        { id: "tempered-glass", label: "Tempered Glass" },
        { id: "rgb", label: "RGB Lighting" },
        { id: "psu-shroud", label: "PSU Shroud" },
        { id: "vertical-gpu", label: "Vertical GPU Mount" },
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 50,
        max: 400,
        defaultValue: 120,
        step: 10,
      },
    },
  ],
}

// Power Supply Filter Configuration
export const powerSupplyFilters: FilterConfig = {
  sections: [
    {
      id: "wattage",
      title: "Wattage",
      type: "checkbox",
      options: [
        { id: "1000w", label: "1000W+" },
        { id: "850w", label: "850W" },
        { id: "750w", label: "750W" },
        { id: "650w", label: "650W" },
        { id: "550w", label: "550W" },
      ],
      defaultOpen: true,
    },
    {
      id: "certification",
      title: "Certification",
      type: "checkbox",
      options: [
        { id: "80plus-titanium", label: "80+ Titanium" },
        { id: "80plus-platinum", label: "80+ Platinum" },
        { id: "80plus-gold", label: "80+ Gold" },
        { id: "80plus-silver", label: "80+ Silver" },
        { id: "80plus-bronze", label: "80+ Bronze" },
      ],
      defaultOpen: true,
    },
    {
      id: "modularity",
      title: "Modularity",
      type: "checkbox",
      options: [
        { id: "fully-modular", label: "Fully Modular" },
        { id: "semi-modular", label: "Semi-Modular" },
        { id: "non-modular", label: "Non-Modular" },
      ],
    },
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "corsair", label: "Corsair" },
        { id: "evga", label: "EVGA" },
        { id: "seasonic", label: "Seasonic" },
        { id: "be-quiet", label: "be quiet!" },
        { id: "thermaltake", label: "Thermaltake" },
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 50,
        max: 300,
        defaultValue: 120,
        step: 10,
      },
    },
  ],
}

// Operating System Filter Configuration
export const osFilters: FilterConfig = {
  sections: [
    {
      id: "type",
      title: "Type",
      type: "checkbox",
      options: [
        { id: "windows-11", label: "Windows 11" },
        { id: "windows-10", label: "Windows 10" },
        { id: "macos", label: "macOS" },
        { id: "linux", label: "Linux" },
      ],
      defaultOpen: true,
    },
    {
      id: "edition",
      title: "Edition",
      type: "checkbox",
      options: [
        { id: "home", label: "Home" },
        { id: "pro", label: "Professional" },
        { id: "enterprise", label: "Enterprise" },
      ],
      defaultOpen: true,
    },
    {
      id: "delivery",
      title: "Delivery",
      type: "checkbox",
      options: [
        { id: "digital", label: "Digital Download" },
        { id: "physical", label: "Physical Media" },
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 20,
        max: 300,
        defaultValue: 100,
        step: 10,
      },
    },
  ],
}

// Monitor Filter Configuration
export const monitorFilters: FilterConfig = {
  sections: [
    {
      id: "size",
      title: "Size",
      type: "checkbox",
      options: [
        { id: "34-inch", label: '34" and above' },
        { id: "32-inch", label: '32"' },
        { id: "27-inch", label: '27"' },
        { id: "24-inch", label: '24"' },
        { id: "21-inch", label: '21" and below' },
      ],
      defaultOpen: true,
    },
    {
      id: "resolution",
      title: "Resolution",
      type: "checkbox",
      options: [
        { id: "4k", label: "4K (3840 x 2160)" },
        { id: "1440p", label: "1440p (2560 x 1440)" },
        { id: "1080p", label: "1080p (1920 x 1080)" },
        { id: "ultrawide", label: "Ultrawide" },
      ],
      defaultOpen: true,
    },
    {
      id: "refresh-rate",
      title: "Refresh Rate",
      type: "checkbox",
      options: [
        { id: "240hz", label: "240Hz+" },
        { id: "165hz", label: "165Hz" },
        { id: "144hz", label: "144Hz" },
        { id: "75hz", label: "75Hz" },
        { id: "60hz", label: "60Hz" },
      ],
    },
    {
      id: "panel-type",
      title: "Panel Type",
      type: "checkbox",
      options: [
        { id: "ips", label: "IPS" },
        { id: "va", label: "VA" },
        { id: "tn", label: "TN" },
        { id: "oled", label: "OLED" },
      ],
    },
    {
      id: "brand",
      title: "Brand",
      type: "checkbox",
      options: [
        { id: "lg", label: "LG" },
        { id: "samsung", label: "Samsung" },
        { id: "asus", label: "ASUS" },
        { id: "acer", label: "Acer" },
        { id: "dell", label: "Dell" },
      ],
    },
    {
      id: "price",
      title: "Price",
      type: "price",
      priceRange: {
        min: 100,
        max: 1500,
        defaultValue: 300,
        step: 50,
      },
    },
  ],
}
