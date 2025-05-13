// lib/uuid-utils.js
import { v4 as uuidv4 } from 'uuid';

// Local storage key for ID to UUID mapping
const STORAGE_KEY = 'component_id_uuid_map';

// Get the mapping from localStorage
export function getIdUuidMap() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

// Save the mapping to localStorage
export function saveIdUuidMap(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

// Get or create a UUID for a component ID
export function getOrCreateUuid(id) {
  const map = getIdUuidMap();
  
  // If this ID already has a UUID, return it
  if (map[id]) {
    return map[id];
  }
  
  // Otherwise, create a new UUID
  const uuid = uuidv4();
  map[id] = uuid;
  saveIdUuidMap(map);
  return uuid;
}

// Get a component ID from a UUID
export function getIdFromUuid(uuid) {
  const map = getIdUuidMap();
  
  // Find the ID that maps to this UUID
  for (const [id, mappedUuid] of Object.entries(map)) {
    if (mappedUuid === uuid) {
      return parseInt(id, 10);
    }
  }
  
  // UUID not found
  return null;
}