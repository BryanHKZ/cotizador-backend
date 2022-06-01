const {
  product: _Product,
  product_has_tag: _ProductHasTags,
  tag: _Tag,
  product_image: _ProductImage,
  category: _Category,
  scores: _Score,
  shop_has_product: _ShopHasProduct,
  shop: _Shop,
} = require("../../../models");

const { validationResult } = require("express-validator");
const {
  getProductData,
  getBestQualification,
} = require("../../services/products/shopProducts");

module.exports.getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await getProductData(id, req, res);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.createProduct = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name, description, tags, photos, category_id, shop_id, price } =
    req.body;
  try {
    const existShop = await _Shop.findOne({ where: { id: shop_id } });

    if (!existShop)
      return res.status(404).json({ msg: "Tienda no encontrada." });

    if (existShop.user_id !== req.user.id)
      return res.status(401).json({ msg: "No puedes realizar esta acción." });

    const existCategory = await _Category.findOne({
      where: { id: category_id },
    });

    if (!existCategory)
      return res.status(400).json({ msg: "La categoría no es válida." });

    const product = await _Product.create({ name, description, category_id });

    await _ShopHasProduct.create({
      shop_id: existShop.id,
      price,
      product_id: product.id,
    });

    tags.forEach(async (t) => {
      let exist = await _Tag.findOne({ where: { id: t } });
      if (exist) {
        await _ProductHasTags.create({
          product_id: product.id,
          tag_id: exist.id,
        });
      }
    });

    photos.forEach(async (i) => {
      await _ProductImage.create({ product_id: product.id, image: i });
    });

    return res.status(201).json({ ...product.dataValues });
  } catch (error) {}
};

module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  if (req.user.role !== "ADMIN")
    return res.status(401).json({ msg: "No puedes realizar esta acción." });

  const existProduct = await _Product.findOne({ where: { id } });

  if (!existProduct)
    return res.status(404).json({ msg: "Producto no encontrado." });

  try {
    await _ShopHasProduct.destroy({ where: { product_id: existProduct.id } });
    await _ProductHasTags.destroy({ where: { product_id: existProduct.id } });
    await _ProductImage.destroy({ where: { product_id: existProduct.id } });
    await _Score.destroy({ where: { product_id: existProduct.id } });

    await existProduct.destroy();

    return res.status(200).json({ msg: "Producto eliminado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.qualifyProduct = async (req, res) => {
  const user_id = req.user.id,
    { product_id, score } = req.body;

  try {
    const existProduct = await _Product.findOne({
      where: { id: product_id },
    });

    if (!existProduct)
      return res.status(404).json({ msg: "No se ha encontrado el producto." });

    const existQualification = await _Score.findOne({
      where: { user_id, product_id },
    });

    if (existQualification) {
      await existVotation.update({ product_id });
    } else {
      await _Score.create({ user_id, product_id, score });
    }

    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error", status: false });
  }
};

module.exports.bestQualificationProduct = async (req, res) => {
  try {
    const bqp = await getBestQualification();

    const arrData = [];
    for (let i = 0; i < bqp.length; i++) {
      const element = bqp[i];

      arrData.push(await getProductData(element.id));
    }

    res.status(200).json(arrData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error" });
  }
};
