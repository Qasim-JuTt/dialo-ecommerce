const pool = require('../config/db');

class Product {
  static async create(productData) {
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, min_order, stock, status) VALUES (?, ?, ?, ?, ?, ?)',
      [productData.name, productData.description, productData.price, productData.minOrder, productData.stock, productData.status]
    );
    return result.insertId;
  }

  static async addImage(productId, imagePath) {
    await pool.query(
      'INSERT INTO product_images (product_id, image_path) VALUES (?, ?)',
      [productId, imagePath]
    );
  }

  static async getAll() {
    const [products] = await pool.query('SELECT * FROM products');
    
    // Get images for each product
    for (const product of products) {
      const [images] = await pool.query(
        'SELECT image_path FROM product_images WHERE product_id = ?',
        [product.id]
      );
      product.images = images.map(img => img.image_path);
    }
    
    return products;
  }

  static async getById(id) {
    const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    if (products.length === 0) return null;
    
    const product = products[0];
    const [images] = await pool.query(
      'SELECT image_path FROM product_images WHERE product_id = ?',
      [id]
    );
    product.images = images.map(img => img.image_path);
    
    return product;
  }

  static async update(id, productData) {
    await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, min_order = ?, stock = ?, status = ? WHERE id = ?',
      [productData.name, productData.description, productData.price, productData.minOrder, productData.stock, productData.status, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
  }
}

module.exports = Product;