const db = require('../config/db');

class Producto {
  static async findAll() {
    const [rows] = await db.query(
      'SELECT * FROM productos WHERE active = 1 ORDER BY createdAt DESC'
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM productos WHERE id = ? AND active = 1',
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { name, price, image, description, category } = data;
    const [result] = await db.query(
      'INSERT INTO productos (name, price, image, description, category) VALUES (?, ?, ?, ?, ?)',
      [name, price, image, description || '', category || 'general']
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, price, image, description, category } = data;
    const [result] = await db.query(
      'UPDATE productos SET name = ?, price = ?, image = ?, description = ?, category = ? WHERE id = ?',
      [name, price, image, description, category, id]
    );
    return result.affectedRows;
  }

  static async updateImage(id, imageUrl) {
    const [result] = await db.query(
      'UPDATE productos SET image = ? WHERE id = ?',
      [imageUrl, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query(
      'UPDATE productos SET active = 0 WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = Producto;  