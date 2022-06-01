const {
  quotation: _Quotation,
  user: _User,
  sequelize,
} = require("../../../models");

const getMostLikedQuotations = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await sequelize.query(
        `select quotation.id, count(quotation_likes.quotation_id) from quotation join quotation_likes on quotation_likes.quotation_id = quotation.id group by quotation.id order by count(quotation_likes.quotation_id) desc`,
        { type: sequelize.QueryTypes.SELECT }
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const getQuotationProducts = (quotation_id) => {
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

const getQuotationLikes = (quotation_id) => {
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

async function getQuotationData(id) {
  const data = await _Quotation.findOne({ where: { id } });

  if (!data) throw new Error({ msg: "Cotización no encontrada.", status: 404 });

  const user = await _User.findOne({ where: { id: data.user_id } });
  const products = await getQuotationProducts(data.id);
  const likes = await getQuotationLikes(data.id);

  return { ...data.dataValues, user, products, likes };
}

module.exports = {
  getQuotationProducts,
  getQuotationLikes,
  getQuotationData,
  getMostLikedQuotations,
};
