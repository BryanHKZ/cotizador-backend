const { sequelize } = require("../../../models");

module.exports.getQuotationProducts = (quotation_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await sequelize.query(
        `SELECT product.id, product.name, shop_has_product.price, quotation_has_product."createdAt" FROM quotation_has_product JOIN shop_has_product ON shop_has_product.id = quotation_has_product.shop_has_product_id JOIN product ON product.id = shop_has_product.product_id WHERE quotation_has_product.quotation_id = ${quotation_id}`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
};
