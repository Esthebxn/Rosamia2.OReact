import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/PageHeader";
import "./Productos.css";

const API_URL = "/api/productos";
const FALLBACK_IMAGE = "https://via.placeholder.com/300x200?text=Sin+Imagen";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  description: "",
  image: "",
  active: 1
};

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  const activeLabel = useMemo(() => {
    return Number(form.active) === 1 ? "Activo" : "Inactivo";
  }, [form.active]);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "No se pudieron cargar los productos");
      }

      setProducts(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Error fetchProductos:", err);
      setError(err.message || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "active" ? Number(value) : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({
      ...prev,
      image: ""
    }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setMessage("");
    setError("");
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      description: product.description || "",
      image: product.image || "",
      active: Number(product.active) === 1 ? 1 : 0
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!ok) return;

    try {
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "No se pudo eliminar el producto");
      }

      setMessage("Producto eliminado correctamente");
      await fetchProductos();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error("Error delete:", err);
      setError(err.message || "Error al eliminar producto");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        name: form.name,
        category: form.category,
        price: form.price,
        description: form.description,
        image: form.image,
        active: Number(form.active)
      };

      const isEditing = Boolean(editingId);
      const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "No se pudo guardar el producto");
      }

      setMessage(isEditing ? "Producto actualizado correctamente" : "Producto creado correctamente");
      resetForm();
      await fetchProductos();
    } catch (err) {
      console.error("Error submit:", err);
      setError(err.message || "Error al guardar producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-productos-page">
      <PageHeader
        title="Gestión de productos"
        subtitle="Administra el catálogo: crea, edita, elimina y gestiona fotos."
      />

      <div className="admin-grid">
        <section className="admin-form-card">
          <div className="card-header">
            <h3>{editingId ? "Editar producto" : "Nuevo producto"}</h3>
            <p>{editingId ? "Actualiza la información del producto seleccionado." : "Completa el formulario para registrar un producto."}</p>
          </div>

          {message ? <div className="alert success">{message}</div> : null}
          {error ? <div className="alert error">{error}</div> : null}

          <form onSubmit={handleSubmit} className="producto-form">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej. Ramo Primavera"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Categoría</label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Ej. Ramos"
                />
              </div>

              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Descripción del producto"
              />
            </div>

            <div className="form-group">
              <label>Estado</label>
              <select name="active" value={form.active} onChange={handleChange}>
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
              <small className="helper-text">Estado actual: {activeLabel}</small>
            </div>

            <div className="form-group">
              <label>Foto por URL</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>O subir foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <small className="helper-text">
                Puedes cargar una imagen local. Se guardará dentro del campo image.
              </small>
            </div>

            <div className="image-preview-box">
              {form.image ? (
                <>
                  <img src={form.image} alt="Preview" className="image-preview" />
                  <button
                    type="button"
                    className="btn-danger-outline"
                    onClick={handleRemoveImage}
                  >
                    Quitar foto
                  </button>
                </>
              ) : (
                <div className="image-empty">Sin foto seleccionada</div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Guardando..." : editingId ? "Actualizar producto" : "Crear producto"}
              </button>

              {editingId ? (
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancelar edición
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="admin-list-card">
          <div className="card-header">
            <h3>Listado de productos</h3>
            <p>Total: {products.length}</p>
          </div>

          {loading ? (
            <div className="loading-state">Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">No hay productos registrados.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          className="table-thumb"
                          src={product.image || FALLBACK_IMAGE}
                          alt={product.name || "Producto"}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category || "Sin categoría"}</td>
                      <td>S/ {Number(product.price || 0).toFixed(2)}</td>
                      <td>
                        <span className={Number(product.active) === 1 ? "badge active" : "badge inactive"}>
                          {Number(product.active) === 1 ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="btn-edit" onClick={() => handleEdit(product)}>
                            Editar
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Productos;