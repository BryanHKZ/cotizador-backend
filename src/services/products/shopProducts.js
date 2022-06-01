const {
  shop_has_product: _ShopHasProduct,
  product: _Product,
  scores: _Score,
  category: _Category,
  product_image: _ProductImage,
  sequelize,
} = require("../../../models");

const getShopProducts = (shopId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await sequelize.query(
        `SELECT product.*, shop_has_product.price FROM shop_has_product JOIN product ON shop_has_product.product_id = product.id WHERE shop_has_product.shop_id = ${shopId}`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
};

const getOtherProductPrices = (searchTerms) => {
  return new Promise(async (resolve, reject) => {
    try {
      const otherPrices = await sequelize.query(
        `SELECT shop.name, shop.logo, shop.id, shop_has_product.price, shop_has_product.id AS "shopProductId" FROM shop_has_product JOIN shop ON shop.id = shop_has_product.shop_id JOIN product ON product.id = shop_has_product.product_id WHERE product.name ILIKE '%${searchTerms}%'`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(otherPrices);
    } catch (error) {
      reject(error);
    }
  });
};

const getProductTags = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tags = await sequelize.query(
        `select tag.id, tag.name from tag join product_has_tag on tag.id = product_has_tag.tag_id where product_id = ${productId}`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(tags);
    } catch (error) {
      reject(error);
    }
  });
};

const getProductScore = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const scores = await _Score.findAll({ where: { product_id: productId } });

      let data = scores.reduce((acc, cur) => acc + cur.score, 0);

      resolve({
        score: data / (scores.length === 0 ? 1 : scores.length),
        califications: scores.length,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getBestQualification = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await sequelize.query(
        `select product.id, avg(scores.score) from scores join product on product.id = scores.product_id group by product.id order by avg(scores.score) desc`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

async function getProductData(id) {
  try {
    const existProduct = await _Product.findOne({ where: { id } });
    if (!existProduct) throw new Error({ msg: "Producto no encontrado." });

    const prices = await getOtherProductPrices(existProduct.name);
    const tags = await getProductTags(existProduct.id);
    const category = await _Category.findOne({
      where: { id: existProduct.category_id },
    });
    const photos = await _ProductImage.findAll({
      where: { product_id: existProduct.id },
    });

    const score = await getProductScore(existProduct.id);

    return {
      ...existProduct.dataValues,
      score,
      tags,
      category: { id: category.id, name: category.name },
      prices,
      photos: photos.map((e) => e.image),
    };
  } catch (error) {}
}

module.exports = {
  getShopProducts,
  getOtherProductPrices,
  getProductScore,
  getProductTags,
  getBestQualification,
  getProductData,
};
