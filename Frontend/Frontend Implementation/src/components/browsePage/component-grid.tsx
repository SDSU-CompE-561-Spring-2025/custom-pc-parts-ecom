import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import CPUImage from '@/components/images/CPU.jpg'
import CPUCoolerImage from '@/components/images/CPUCooler.jpg'
import MotherBoardImage from '@/components/images/MotherBoard.jpg'
import MemoryImage from '@/components/images/Memory.jpg'
import StorageImage from '@/components/images/Storage.jpg'
import VideoCardImage from '@/components/images/VideoCard.jpg'
import CaseImage from '@/components/images/Case.jpg'
import PowerSupplyImage from '@/components/images/PowerSupply.jpg'
import OperatingSystemImage from '@/components/images/OperatingSystem.jpg'
import MonitorImage from '@/components/images/Monitor.jpg'

const components = [
  {
    id: "cpu",
    title: "CPU",
    image: CPUImage,
    browseText: "Browse for CPUs",
  },
  {
    id: "cpu-cooler",
    title: "CPU Cooler",
    image: CPUCoolerImage,
    browseText: "Browse for CPU Coolers",
  },
  {
    id: "motherboards",
    title: "Motherboards",
    image: MotherBoardImage,
    browseText: "Browse for Motherboards",
  },
  {
    id: "memory",
    title: "Memory",
    image: MemoryImage,
    browseText: "Browse for Memory",
  },
  {
    id: "storage",
    title: "Storage",
    image: StorageImage,
    browseText: "Browse for Storage",
  },
  {
    id: "video-card",
    title: "Video Card",
    image: VideoCardImage,
    browseText: "Browse for Video Cards",
  },
  {
    id: "case",
    title: "Case",
    image: CaseImage,
    browseText: "Browse for Cases",
  },
  {
    id: "power-supply",
    title: "Power Supply",
    image: PowerSupplyImage,
    browseText: "Browse for Power Supply",
  },
  {
    id: "operating-system",
    title: "Operating System",
    image: OperatingSystemImage,
    browseText: "Browse for Operating System",
  },
  {
    id: "monitor",
    title: "Monitor",
    image: MonitorImage,
    browseText: "Browse for Monitors",
  },
]

export default function ComponentGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {components.map((component) => (
        <div key={component.id} className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="p-6 flex justify-center">
            <Image
              src={component.image || "/placeholder.svg"}
              alt={component.title}
              width={150}
              height={150}
              className="object-contain h-[120px]"
            />
          </div>
          <Link
            href={`/browse/${component.id}`}
            className="bg-black text-white w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>{component.browseText}</span>
          </Link>
          <div className="p-3 text-center">
            <h3 className="font-medium">{component.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}
