import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { openDB } from "idb";

// Utility function to combine Tailwind and clsx classnames
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// IndexedDB initialization for caching both images, courses, and books data
const dbPromise = openDB("resource-cache", 3, { // Incremented version number
  upgrade(db, oldVersion, newVersion, transaction) {
    if (!db.objectStoreNames.contains("thumbnails")) {
      db.createObjectStore("thumbnails");
    }
    if (!db.objectStoreNames.contains("courses")) {
      db.createObjectStore("courses");
    }
    if (!db.objectStoreNames.contains("books")) {
      db.createObjectStore("books");
    }
    // Additional upgrade logic can be added here if needed
  },
});



// Cache data (either images, courses, or books) into IndexedDB
export const cacheData = async (key, data, type) => {
  try {
    const db = await dbPromise;
    const transaction = db.transaction(type, "readwrite");
    const store = transaction.objectStore(type);

    // Check if data already exists in the store
    const existingData = await store.get(key);

    if (!existingData) {
      await store.put(data, key); // Store the data with the key
    } 

    // Ensure the transaction completes before finishing
    await transaction.done;
  } catch (error) {
    console.error("Error caching data:", error);
  }
};

// Retrieve cached data from IndexedDB
export const getCachedData = async (key, type) => {
  try {
    const db = await dbPromise;
    const store = db.transaction(type).objectStore(type);
    const cachedData = await store.get(key); // Get the cached data by key
    return cachedData;
  } catch (error) {
    console.error("Error retrieving cached data:", error);
    return null;
  }
};