const {
  shop: _Shop,
  shop_has_product: _ShopHasProduct,
} = require("../../../models");
const { validationResult } = require("express-validator");
const { getShopProducts } = require("../../services/products/shopProducts");

module.exports.getShop = async (req, res) => {
  const idToSearch = req.params.id;

  try {
    const result = await _Shop.findOne({ where: { id: idToSearch } });

    if (!result) return res.status(404).json({ msg: "Tienda no encontrada" });

    const products = await getShopProducts(idToSearch);

    return res.status(200).json({ ...result.dataValues, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.getAllShops = async (req, res) => {
  try {
    const data = await _Shop.findAll();

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.createShop = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name } = req.body;

  try {
    const newShop = await _Shop.create({ name, user_id: req.user.id });

    return res.status(200).json({ shop: newShop });
  } catch (error) {
    res.status(500).json({ msg: "Ha ocurrido un error" });
  }
};

module.exports.updateShop = async (req, res) => {
  const { name, logo } = req.body;

  const idToUpdate = req.params.id;

  const validUser = await _Shop.findOne({ where: { id: idToUpdate } });

  if (!validUser) return res.status(404).json({ msg: "Tienda no encontrada." });

  if (validUser.user_id !== req.user.id) {
    return res.status(403).json({ msg: "No puedes realizar esta acción." });
  }

  let updateObj = {};

  if (name) updateObj = { ...updateObj, name };
  if (logo) updateObj = { ...updateObj, logo };

  try {
    await _Shop.update(updateObj, { where: { id: idToUpdate } });

    return res.status(202).json({ msg: "Tienda actualizada correctamente." });
  } catch (error) {
    console.log("========== ERROR UPDATE_SHOP ->", error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.deleteShop = async (req, res) => {
  const idToUpdate = req.params.id;

  const validUser = await _Shop.findOne({ where: { id: idToUpdate } });

  if (validUser.user_id !== req.user.id) {
    return res.status(403).json({ msg: "No puedes realizar esta acción." });
  }

  try {
    await _ShopHasProduct.destroy({ where: { shop_id: idToUpdate } });
    await _Shop.destroy({ where: { id: idToUpdate } });

    return res.status(202).json({ msg: "Tienda eliminada correctamente." });
  } catch (error) {
    console.log("========== ERROR DELETE_SHOP ->", error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.deleteShopProduct = async (req, res) => {
  const { shop_id, product_id } = req.params;
  try {
    const validUser = await _Shop.findOne({ where: { id: shop_id } });

    if (validUser.user_id !== req.user.id) {
      return res.status(403).json({ msg: "No puedes realizar esta acción." });
    }

    await _ShopHasProduct.destroy({ where: { product_id } });

    return res.status(202).json({ msg: "Producto eliminado de la tienda." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.addProductShop = async (req, res) => {
  const { shop_id, product_id, price } = req.body;
  try {
    const validUser = await _Shop.findOne({ where: { id: shop_id } });

    if (validUser.user_id !== req.user.id) {
      return res.status(403).json({ msg: "No puedes realizar esta acción." });
    }

    const exist = await _ShopHasProduct.findOne({
      where: { shop_id, product_id },
    });

    if (exist)
      return res
        .status(409)
        .json({ msg: "Este producto ya se encuentra agregado en la tienda." });

    await _ShopHasProduct.create({ shop_id, product_id, price });

    return res.status(202).json({ msg: "Producto agregado a la tienda." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};
