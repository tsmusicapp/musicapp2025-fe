'use client'

import React, { useState, useEffect } from "react"
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

const FilterExploreParts = () => {
  const [language, setLanguage] = useState("")
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  const languages = [
    "English",
    "Japanese",
    "German",
    "French",
    "Italian",
    "Spanish",
    "Korean",
    "Chinese",
    "Arabic",
  ]

  const culturalAreas = [
    { id: "1", name: "North America and Europe" },
    { id: "2", name: "East Asia" },
    { id: "3", name: "South Asia" },
    { id: "4", name: "Oceania" },
    { id: "5", name: "West Asia and North Africa" },
    { id: "6", name: "Africa" },
    { id: "7", name: "Latin America" },
  ]

  const toggleArea = (areaId: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    )
  }

  const toggleAllAreas = () => {
    setSelectedAreas((prev) =>
      prev.length === culturalAreas.length ? [] : culturalAreas.map((area) => area.id)
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown-container")) {
        setIsAreaDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="w-full h-full max-w-md space-y-4">
      <div className="flex gap-4">
        {/* Language Dropdown */}
        <div className="w-1/2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full h-10 px-3 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Multi-select Dropdown */}
        <div className="w-1/2 relative dropdown-container">
          <button
            onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
            className="w-full h-10 px-3 border rounded-md bg-white shadow-sm text-left flex justify-between items-center"
          >
            <span className="truncate">
              {selectedAreas.length === 0
                ? "Select cultural areas"
                : `${selectedAreas.length} area${
                    selectedAreas.length !== 1 ? "s" : ""
                  } selected`}
            </span>
            {isAreaDropdownOpen ? (
              <ChevronUp className="h-4 w-4 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 flex-shrink-0" />
            )}
          </button>

          {isAreaDropdownOpen && (
            <div className="absolute z-999 w-full mt-1 bg-white border rounded-md shadow-lg max-h-[200px] overflow-auto">
              <ul className="py-1">
                <li className="w-full">
                  <label
                    className="flex items-center w-full px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={toggleAllAreas}
                  >
                    <div className="w-5 h-5 border rounded flex items-center justify-center bg-white flex-shrink-0">
                      {selectedAreas.length === culturalAreas.length && (
                        <Check className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <span className="text-sm ml-2 font-semibold">Select All</span>
                  </label>
                </li>
                {culturalAreas.map((area) => (
                  <li key={area.id} className="w-full">
                    <label
                      className="flex items-center w-full px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleArea(area.id)}
                    >
                      <div className="w-5 h-5 border rounded flex items-center justify-center bg-white flex-shrink-0">
                        {selectedAreas.includes(area.id) && (
                          <Check className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <span className="text-sm ml-2">{area.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterExploreParts

