// components/UuidProvider.tsx
"use client"

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Storage key
const STORAGE_KEY = 'component_id_uuid_map'

// Get map from localStorage
function getIdUuidMap() {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error("Error retrieving map:", error)
    return {}
  }
}

// Save map to localStorage
function saveIdUuidMap(map: Record<string, string>) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch (error) {
    console.error("Error saving map:", error)
  }
}

// Component props
type UuidProviderProps = {
  id: number | string
  children: (uid: string) => React.ReactNode
}

export function UuidProvider({ id, children }: UuidProviderProps) {
  const [uid, setUid] = useState<string>('')
  
  useEffect(() => {
    const map = getIdUuidMap()
    
    // If this ID already has a UUID, use it
    if (map[id]) {
      setUid(map[id])
      return
    }
    
    // Otherwise, create a new UUID
    const newUid = uuidv4()
    map[id] = newUid
    saveIdUuidMap(map)
    setUid(newUid)
  }, [id])
  
  // Don't render until we have a UUID
  if (!uid) return null
  
  // Render children with the UUID
  return <>{children(uid)}</>
}

// For product detail page to look up an ID from a UUID
export function useIdFromUuid(uuid: string): number | null {
    const [id, setId] = useState<number | null>(null)
    
    useEffect(() => {
      if (!uuid) return;
      
      const map = getIdUuidMap()
      
      // Find ID that maps to this UUID
      for (const [itemId, mappedUid] of Object.entries(map)) {
        if (mappedUid === uuid) {
          setId(parseInt(itemId, 10))
          return
        }
      }
      
      // No ID found
      setId(null)
    }, [uuid])
    
    return id
  }