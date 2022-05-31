const { sequelize } = require("../../../models");

module.exports.getQuotationProducts = (quotation_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await sequelize.query(
        `SELECT product.id, shop_has_product.id AS "shopProductId", product.name, shop_has_product.price, quotation_has_product."createdAt" FROM quotation_has_product JOIN shop_has_product ON shop_has_product.id = quotation_has_product.shop_has_product_id JOIN product ON product.id = shop_has_product.product_id WHERE quotation_has_product.quotation_id = ${quotation_id}`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.getQuotationLikes = (quotation_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const likes = await sequelize.query(
        `SELECT CONCAT("user"."firstName", ' ', "user"."lastName") AS "name", "user".id from quotation_likes join "user" on quotation_likes.user_id = "user".id WHERE quotation_likes.quotation_id = ${quotation_id}`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(likes);
    } catch (error) {
      reject(error);
    }
  });
};
