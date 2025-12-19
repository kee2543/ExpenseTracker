import { db } from "../db/database";

// Add a new category with name and color
export const addCategory = async (category) => {
    return await db.categories.add({
        id: crypto.randomUUID(),
        name: category.name,
        color: category.color,
    });
};

// Get all categories
export const getCategories = async () => {
    return await db.categories.toArray();
};

// Delete a category by id
export const deleteCategory = async (id) => {
    return await db.categories.delete(id);
};

// Update an existing category
export const updateCategory = async (id, updatedCategory) => {
    return await db.categories.update(id, {
        name: updatedCategory.name,
        color: updatedCategory.color,
    });
};