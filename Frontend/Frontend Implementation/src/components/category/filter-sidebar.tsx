"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// Define types for different filter options
export interface CheckboxFilterOption {
  id: string
  label: string
  checked?: boolean
}

export interface ColorOption {
  color: string
  selected?: boolean
  borderColor?: string
}

export interface ChipOption {
  label: string
  selected?: boolean
}

export interface PriceRangeFilter {
  min: number
  max: number
  defaultValue?: number
  step?: number
}

// Define the configuration for each filter section
export interface FilterSection {
  id: string
  title: string
  type: "checkbox" | "color" | "chip" | "price"
  options?: CheckboxFilterOption[] | ColorOption[] | ChipOption[]
  priceRange?: PriceRangeFilter
  defaultOpen?: boolean
}

export interface FilterConfig {
  sections: FilterSection[]
  onApplyFilter?: () => void
}

export function FilterSidebar({ config }: { config: FilterConfig }) {
  const defaultOpenValues = config.sections.filter((section) => section.defaultOpen).map((section) => section.id)

  return (
    <div className="w-full md:w-64 shrink-0">
      <h2 className="text-lg font-medium mb-4">Filters</h2>

      <Accordion type="multiple" defaultValue={defaultOpenValues}>
        {config.sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger className="py-2">{section.title}</AccordionTrigger>
            <AccordionContent>
              {section.type === "checkbox" && (
                <div className="flex flex-col gap-1">
                  {(section.options as CheckboxFilterOption[])?.map((option) => (
                    <div key={option.id} className="flex items-center gap-2 py-1">
                      <input type="checkbox" id={option.id} className="h-4 w-4" defaultChecked={option.checked} />
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  ))}
                </div>
              )}

              {section.type === "color" && (
                <div className="grid grid-cols-5 gap-2 py-2">
                  {(section.options as ColorOption[])?.map((option, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full cursor-pointer ${
                        option.borderColor ? `border border-${option.borderColor}` : ""
                      }`}
                      style={{ backgroundColor: option.color }}
                    ></div>
                  ))}
                </div>
              )}

              {section.type === "chip" && (
                <div className="grid grid-cols-2 gap-2 py-2">
                  {(section.options as ChipOption[])?.map((option, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs text-center ${
                        option.selected ? "bg-black text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}

              {section.type === "price" && section.priceRange && (
                <div className="py-4">
                  <Slider
                    defaultValue={[section.priceRange.defaultValue || section.priceRange.min]}
                    min={section.priceRange.min}
                    max={section.priceRange.max}
                    step={section.priceRange.step || 1}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${section.priceRange.min}</span>
                    <span>${section.priceRange.max}</span>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800" onClick={config.onApplyFilter}>
        Apply Filter
      </Button>
    </div>
  )
}
