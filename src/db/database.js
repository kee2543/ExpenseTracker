import Dexie from "dexie";

export const db = new Dexie("FinanceDB");

db.version(1).stores({
  categories: "++id,name",
  transactions: "++id,type,category,amount,date",
});
