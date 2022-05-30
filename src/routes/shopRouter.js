const express = require("express");
const api = express.Router();
const { check } = require("express-validator");
const {
  createShop,
  updateShop,
  deleteShop,
  getShop,
  getAllShops,
  deleteShopProduct,
  addProductShop,
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

api.post(
  "/product/create",
  auth,
  [
    check("shop_id", "El producto debe pertenecer a una tienda."),
    check("product_id", "El producto es requerido."),
    check("price", "El precio es requerido.").isInt({ min: 10000 }),
  ],
  addProductShop
);

api.delete("/product/delete/:shop_id/:product_id", auth, [], deleteShopProduct);

module.exports = api;
