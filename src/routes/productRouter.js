const express = require("express");
const api = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const {
  createProduct,
  getProduct,
  deleteProduct,
} = require("../controller/product/ProductController");

api.get("/:id", [], getProduct);

api.post(
  "/create",
  auth,
  [
    check("name", "El nombre del producto es requerido."),
    check("description", "El producto requiere una descripción"),
    check("tags", "El producto requiere por lo menos una etiqueta.").isArray({
      min: 1,
    }),
    check(
      "photos",
      "Muestra a los usuarios como es el producto con algunas imágenes."
    ).isArray({ min: 1 }),
    check("category_id", "El producto requiere alguna categoría.").isInt({
      min: 0,
    }),
  ],
  createProduct
);

api.delete("/:id", auth, [], deleteProduct);

module.exports = api;
