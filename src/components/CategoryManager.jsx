import React from "react";
import { useEffect, useState } from "react";
import {
  addCategory,
  getCategories,
  deleteCategory
} from "../services/categoryService.js";

export default function CategoryManager() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const load = async () => {
    setCategories(await getCategories());
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!name) return;
    await addCategory({ id: crypto.randomUUID(), name });
    setName("");
    load();
  };

  return (
    <div>
      <h3>Categories</h3>

      <input placeholder="New category"
        value={name} onChange={e => setName(e.target.value)} />

      <button onClick={save}>Add</button>

      {categories.map(c => (
        <div key={c.id}>
          {c.name}
          <button onClick={async () => {
            await deleteCategory(c.id);
            load();
          }}>❌</button>
        </div>
      ))}
    </div>
  );
}
