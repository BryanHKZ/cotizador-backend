const {
  shop_has_product: _ShopHasProduct,
  product: _Product,
  scores: _Score,
  sequelize,
} = require("../../../models");

module.exports.getShopProducts = (shopId) => {
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

module.exports.getOtherProductPrices = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const otherPrices = await sequelize.query(
        `SELECT shop.name, shop.logo, shop.id, shop_has_product.price FROM shop_has_product JOIN shop ON shop.id = shop_has_product.shop_id WHERE shop_has_product.product_id = ${productId}`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(otherPrices);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.getProductTags = (productId) => {
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

module.exports.getProductScore = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const scores = await _Score.findAll({ where: { product_id: productId } });

      let data = scores.reduce((acc, cur) => acc.score + cur.score, 0);

      resolve({
        score: data / scores.length === 0 ? 1 : scores.length,
        califications: scores.length,
      });
    } catch (error) {
      reject(error);
    }
  });
};
