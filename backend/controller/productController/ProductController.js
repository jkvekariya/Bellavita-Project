import productModel from "../../model/productModel/ProductModel.js";

const controller = {

  async createProduct(req, res) {
    try {
      const product = new productModel(req.body);
      const saved = await product.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },


  async getAllProducts(req, res) {
    try {
      const products = await productModel.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  async getProductById(req, res) {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  async getProductsByCategory(req, res) {
    try {
      const category = req.params.category;
      const products = await productModel.find({ category });

      if (!products || products.length === 0) {
        return res.status(404).json({ error: "No products found for this category" });
      }

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  async updateProduct(req, res) {
    try {
      const updated = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },


  async deleteProduct(req, res) {
    try {
      await productModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async searchProduct(req, res) {
    try {
      const { query } = req.query;

      if (!query || query.trim() === "") {
        return res.status(400).json({ error: "Search query is required" });
      }


      const searchRegex = new RegExp(query, "i");

      const results = await productModel.find({
        $or: [
          { name: searchRegex },
          { category: searchRegex },
          { description: searchRegex }
        ]
      }).select("name image");

      if (results.length === 0) {
        return res.status(404).json({ error: "No products found" });
      }

      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}

export default controller;
