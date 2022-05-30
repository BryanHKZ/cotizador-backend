const {
  quotation: _Quotation,
  shop_has_product: _ShopHasProduct,
  quotation_has_product: _QuotationHasProduct,
  user: _User,
} = require("../../../models");
const {
  getQuotationProducts,
} = require("../../services/products/quotationProducts");

module.exports.getQuotation = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await _Quotation.findOne({ where: { id } });

    if (!data)
      return res.status(404).json({ msg: "Cotización no encontrada." });

    const user = await _User.findOne({ where: { id: data.user_id } });
    const products = await getQuotationProducts(data.id);

    return res.status(200).json({ ...data.dataValues, user, products });
  } catch (error) {}
};

module.exports.getQuotationByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const userQuotations = await _Quotation.findAll({ where: { user_id } });

    const data = [];
    for (let i = 0; i < userQuotations.length; i++) {
      data.push({
        ...userQuotations[i].dataValues,
        products: await getQuotationProducts(userQuotations[i].id),
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.createQuotation = async (req, res) => {
  const { products, name, description } = req.body;

  try {
    const newQuota = await _Quotation.create({
      name,
      description,
      user_id: req.user.id,
    });

    products.forEach(async (element) => {
      const existItem = await _ShopHasProduct.findOne({
        where: { id: element },
      });
      if (existItem) {
        await _QuotationHasProduct.create({
          quotation_id: newQuota.id,
          shop_has_product_id: existItem.id,
        });
      }
    });

    const list = await getQuotationProducts(newQuota.id);

    return res.status(201).json({ ...newQuota.dataValues, products: list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.addQuotationProduct = async (req, res) => {
  const { quotation_id, shop_has_product_id } = req.body;

  try {
    const existQuotation = await _Quotation.findOne({
      where: { id: quotation_id },
    });
    if (!existQuotation)
      return res.status(404).json({ msg: "No se encontró esa cotización." });

    if (existQuotation.user_id !== req.user.id)
      return res.status(401).json({ msg: "No puedes realizar esta acción." });

    const existItem = await _ShopHasProduct.findOne({
      where: { id: shop_has_product_id },
    });
    if (existItem) {
      await _QuotationHasProduct.create({
        quotation_id: existQuotation.id,
        shop_has_product_id: existItem.id,
      });
    }

    return res.status(202).json({ msg: "Agregado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.deleteQuotationProduct = async (req, res) => {
  const { quotation_id, shop_has_product_id } = req.params;

  try {
    const existQuotation = await _Quotation.findOne({
      where: { id: quotation_id },
    });

    if (!existQuotation)
      return res.status(404).json({ msg: "No se encontró esa cotización." });

    if (existQuotation.user_id !== req.user.id)
      return res.status(401).json({ msg: "No puedes realizar esta acción." });

    const existItem = await _ShopHasProduct.findOne({
      where: { id: shop_has_product_id },
    });
    if (existItem) {
      await _QuotationHasProduct.destroy({
        where: {
          shop_has_product_id: existItem.id,
        },
      });
    }

    return res.status(202).json({ msg: "Eliminado correctamente." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};

module.exports.deleteQuotation = async (req, res) => {
  const { id } = req.params;

  try {
    const exist = await _Quotation.findOne({ where: { id } });

    if (exist.user_id !== req.user.id)
      return res.status(401).json({ msg: "No puedes realizar esta acción." });

    await _QuotationHasProduct.destoy({ where: { quotation_id: id } });

    await exist.destroy();

    res.status(200).json({ msg: "Eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error" });
  }
};
