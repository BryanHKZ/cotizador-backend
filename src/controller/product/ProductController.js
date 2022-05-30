const {
  product: _Product,
  product_has_tag: _ProductHasTags,
  tag: _Tag,
  product_image: _ProductImage,
  category: _Category,
  scores: _Score,
  shop_has_product: _ShopHasProduct,
} = require("../../../models");

const { validationResult } = require("express-validator");
const {
  getOtherProductPrices,
  getProductTags,
  getProductScore,
} = require("../../services/products/shopProducts");

module.exports.getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const existProduct = await _Product.findOne({ where: { id } });
    if (!existProduct)
      return res.status(404).json({ msg: "Producto no encontrado." });

    const prices = await getOtherProductPrices(existProduct.id);
    const tags = await getProductTags(existProduct.id);
    const category = await _Category.findOne({
      where: { id: existProduct.category_id },
    });
    const photos = await _ProductImage.findAll({
      where: { product_id: existProduct.id },
    });

    const score = await getProductScore(existProduct.id);

    return res.status(200).json({
      ...existProduct.dataValues,
      score,
      tags,
      category: { id: category.id, name: category.name },
      prices,
      photos: photos.map((e) => e.image),
    });
  } catch (error) {}
};

module.exports.createProduct = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { name, description, tags, photos, category_id } = req.body;

  const existCategory = await _Category.findOne({ where: { id: category_id } });

  if (!existCategory)
    return res.status(400).json({ msg: "La categoría no es válida." });

  try {
    const product = await _Product.create({ name, description, category_id });

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

    return res.status(202).json({ msg: "Producto eliminado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};
