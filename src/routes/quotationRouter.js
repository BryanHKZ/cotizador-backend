const express = require("express");
const api = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const {
  createQuotation,
  getQuotation,
  addQuotationProduct,
  deleteQuotation,
  deleteQuotationProduct,
  getQuotationByUser,
  likeQuotation,
  mostLiked,
} = require("../controller/quotation/QuotationController");

api.get("/:id", [], getQuotation);

api.get("/all/:user_id", [], getQuotationByUser);

api.get("/most/famous", [], mostLiked);

api.post(
  "/",
  auth,
  [
    check("products", "Se requiere una lista de productos.").isArray({
      min: 1,
    }),
  ],
  createQuotation
);

api.put(
  "/add/product",
  auth,
  [
    check("quotation_id", "Se requiere la cotización."),
    check("shop_has_product_id", "El producto es requerido."),
  ],
  addQuotationProduct
);

api.delete("/:id", auth, [], deleteQuotation);

api.put(
  "/delete/product/:quotation_id/:shop_has_product_id",
  auth,
  [],
  deleteQuotationProduct
);

api.put("/like/:id", auth, [], likeQuotation);

module.exports = api;
