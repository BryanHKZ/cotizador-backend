const express = require("express");
const api = express.Router();
const { check } = require("express-validator");
const {
  createShop,
  updateShop,
  deleteShop,
  getShop,
  getAllShops,
} = require("../controller/shop/ShopController");
const auth = require("../middleware/auth");

api.get("/", [], getAllShops);

api.get("/:id", [], getShop);

api.post(
  "/create",
  auth,
  [check("name", "El nombre de la tienda es requerido")],
  createShop
);

api.put("/update/:id", auth, [], updateShop);

api.delete("/delete/:id", auth, [], deleteShop);

module.exports = api;
