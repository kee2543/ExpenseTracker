import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const load = async () => {
    const data = await getCategories();
    setCategories(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name) return;
    await addCategory({ name });
    setName("");
    load();
  };

  const save = async (id) => {
    await updateCategory(id, { name: editValue });
    setEditingId(null);
    load();
  };

  return (
    <div>
      <h3>Categories</h3>

      <div className="form-row">
        <input
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={add}>Add</button>
      </div>

      {categories.map((c) => (
        <div key={c.id} className="list-item">
          {editingId === c.id ? (
            <>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <div className="item-actions">
                <button onClick={() => save(c.id)}>💾</button>
                <button onClick={() => setEditingId(null)}>❌</button>
              </div>
            </>
          ) : (
            <>
              <span className="item-name">{c.name}</span>
              <div className="item-actions">
                <button onClick={() => { setEditingId(c.id); setEditValue(c.name); }}>✏️</button>
                <button onClick={() => deleteCategory(c.id).then(load)}>🗑️</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryManager;
