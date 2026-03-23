const db = require("../config/db");

const Producto = {
  findAll: async () => {
    const [rows] = await db.query(`
      SELECT id, name, category, price, description, image, image2, image3, image4, active
      FROM productos
      ORDER BY id DESC
    `);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query(
      `
      SELECT id, name, category, price, description, image, image2, image3, image4, active
      FROM productos
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );
    return rows[0] || null;
  },

  create: async (data) => {
    const [result] = await db.query(
      `
      INSERT INTO productos (name, category, price, description, image, image2, image3, image4, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.name,
        data.category || null,
        Number(data.price || 0),
        data.description || null,
        data.image || null,
        data.image2 || null,
        data.image3 || null,
        data.image4 || null,
        Number(data.active) === 1 ? 1 : 0
      ]
    );

    return result.insertId;
  },

  update: async (id, data) => {
    const [result] = await db.query(
      `
      UPDATE productos
      SET
        name = ?,
        category = ?,
        price = ?,
        description = ?,
        image = ?,
        image2 = ?,
        image3 = ?,
        image4 = ?,
        active = ?
      WHERE id = ?
      `,
      [
        data.name,
        data.category || null,
        Number(data.price || 0),
        data.description || null,
        data.image || null,
        data.image2 || null,
        data.image3 || null,
        data.image4 || null,
        Number(data.active) === 1 ? 1 : 0,
        id
      ]
    );

    return result.affectedRows;
  },

  remove: async (id) => {
    const [result] = await db.query(
      `
      DELETE FROM productos
      WHERE id = ?
      `,
      [id]
    );

    return result.affectedRows;
  }
};

module.exports = Producto;