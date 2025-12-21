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

      <div className="category-input-group">
        <input
          placeholder="New category..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={add} disabled={!name} className="btn-minimal">Add</button>
      </div>

      <div className="category-list">
        {categories.map((c) => (
          <div key={c.id} className="category-chip">
            {editingId === c.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ padding: '4px 8px', fontSize: '12px' }}
                  autoFocus
                />
                <button onClick={() => save(c.id)} style={{ padding: '2px 6px', fontSize: '10px' }}>💾</button>
                <button onClick={() => setEditingId(null)} style={{ padding: '2px 6px', fontSize: '10px', background: '#ccc' }}>❌</button>
              </>
            ) : (
              <>
                <span onClick={() => { setEditingId(c.id); setEditValue(c.name); }} style={{ cursor: 'pointer' }}>
                  {c.name}
                </span>
                <button
                  className="delete-chip-btn"
                  onClick={() => deleteCategory(c.id).then(load)}
                  title="Delete category"
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}

        {categories.length === 0 && (
          <p style={{ opacity: 0.5, fontSize: '13px' }}>No categories added yet.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
