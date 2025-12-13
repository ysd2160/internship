// components/UniversalForm.jsx
import React, { useState, useEffect } from "react";

/**
 * UniversalForm
 * - Uses Bootstrap for styling
 * - Save items in local state (optionally persist to localStorage if you want)
 */

const CATEGORY_FIELDS = {
  Product: { label: "Price", type: "number", placeholder: "Enter price (e.g. 499.99)" },
  Finance: { label: "Amount", type: "number", placeholder: "Enter amount (e.g. 1000)" },
  Note: { label: "Note", type: "text", placeholder: "Short note" },
  Default: { label: "Description", type: "text", placeholder: "Enter description" },
};

function ItemCard({ item, onDelete }) {
  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h5 className="card-title mb-1">{item.title}</h5>
          <h6 className="card-subtitle text-muted mb-2">{item.category}</h6>
          <p className="card-text mb-1"><strong>{item.fieldLabel}:</strong> {item.fieldValue}</p>
          {item.description && item.fieldLabel !== "Description" ? (
            <p className="text-muted small mb-0"><strong>Description: </strong>{item.description}</p>
          ) : null}
        </div>

        <div className="ms-3 text-end">
          <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UniversalForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Product");
  const [fieldValue, setFieldValue] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState({});

  // optional: load/save from localStorage for basic persistence
  useEffect(() => {
    try {
      const raw = localStorage.getItem("universal_items_v1");
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("universal_items_v1", JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const currentField = CATEGORY_FIELDS[category] || CATEGORY_FIELDS.Default;

  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!category) errs.category = "Category is required.";
    if (currentField.type === "number") {
      const val = fieldValue.toString().trim();
      if (val === "") errs.fieldValue = `${currentField.label} is required.`;
      else if (isNaN(Number(val))) errs.fieldValue = `${currentField.label} must be a number.`;
      else if (Number(val) < 0) errs.fieldValue = `${currentField.label} cannot be negative.`;
    } else {
      if (!fieldValue.toString().trim()) errs.fieldValue = `${currentField.label} is required.`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const newItem = {
      id: Date.now().toString(),
      title: title.trim(),
      category,
      fieldLabel: currentField.label,
      fieldValue: currentField.type === "number" ? Number(fieldValue) : fieldValue.trim(),
      description: description.trim() || "",
      createdAt: new Date().toISOString(),
    };

    setItems(prev => [newItem, ...prev]);
    // reset relevant fields
    setTitle("");
    setFieldValue("");
    setDescription("");
    setErrors({});
    setSuccessMsg("Item added successfully!");

    // temporary success message for 2.5s
    setTimeout(() => setSuccessMsg(""), 2500);
  }

  function handleDelete(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function handleClearAll() {
    if (!items.length) return;
    if (!confirm("Are you sure you want to clear all items? This cannot be undone.")) return;
    setItems([]);
  }

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title mb-3">Universal E-commerce Form</h3>

          {/* temporary success alert */}
          {successMsg && (
            <div className="alert alert-success py-2" role="alert">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title *</label>
              <input
                id="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Item title (e.g., 'Blue T-Shirt')"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category *</label>
              <select
                id="category"
                className={`form-select ${errors.category ? "is-invalid" : ""}`}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setFieldValue("");
                }}
              >
                <option>Product</option>
                <option>Finance</option>
                <option>Note</option>
                <option>Other</option>
              </select>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
              <div className="form-text">The third field will change based on category.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="fieldValue" className="form-label">
                {currentField.label} *
              </label>
              <input
                id="fieldValue"
                type={currentField.type}
                inputMode={currentField.type === "number" ? "decimal" : "text"}
                className={`form-control ${errors.fieldValue ? "is-invalid" : ""}`}
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                placeholder={currentField.placeholder}
                min={currentField.type === "number" ? 0 : undefined}
                step={currentField.type === "number" ? "any" : undefined}
              />
              {errors.fieldValue && <div className="invalid-feedback">{errors.fieldValue}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description (optional)</label>
              <textarea
                id="description"
                className="form-control"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Extra details about this item (optional)"
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setTitle("");
                  setFieldValue("");
                  setDescription("");
                  setErrors({});
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-outline-danger ms-auto"
                onClick={handleClearAll}
                disabled={items.length === 0}
                title={items.length === 0 ? "No items to clear" : "Clear all items"}
              >
                Clear All
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Items list */}
      <div>
        <div className="d-flex align-items-center mb-2">
          <h5 className="mb-0">Items ({items.length})</h5>
          {items.length > 0 && (
            <small className="text-muted ms-3">Newest first</small>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-muted">No items yet — add some using the form above.</div>
        ) : (
          <div>
            {items.map((it) => (
              <ItemCard key={it.id} item={it} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
