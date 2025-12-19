import { db } from "../db/database";

// Save or update a setting by key
export const setSetting = async (key, value) => {
	return await db.settings.put({ key, value });
};

// Retrieve a setting by key
export const getSetting = async (key) => {
	return await db.settings.get(key);
};