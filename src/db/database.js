import Dexie from "dexie";

export const db = new Dexie("ExpenseTrackerDB");

// Database schema
db.version(1).stores({
  expenses: "id, date, categoryId",
  categories: "id, name",
  settings: "key"
});

// Open database
db.open().catch((err) => {
  console.error("Failed to open db:", err);
});
