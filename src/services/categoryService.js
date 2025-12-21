// src/services/categoryService.js
import { db } from "../db/database";

// Default categories (run once)
const DEFAULT_CATEGORIES = [
  { name: "Food" },
  { name: "Travel" },
  { name: "Rent" },
  { name: "Shopping" },
  { name: "Salary" },
];

// READ
export const getCategories = async () => {
  if (!db.categories) return [];
  return await db.categories.toArray();
};

// INITIALIZE (called from Dashboard)
export const initializeCategories = async () => {
  const count = await db.categories.count();
  if (count === 0) {
    await db.categories.bulkAdd(DEFAULT_CATEGORIES);
  }
};

// ADD
export const addCategory = async (category) => {
  await db.categories.add(category);
};

// UPDATE
export const updateCategory = async (id, updates) => {
  await db.categories.update(id, updates);
};

// DELETE
export const deleteCategory = async (id) => {
  await db.categories.delete(id);
};
