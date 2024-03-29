var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _notification = require("./notification");
var _product = require("./product");
var _product_has_tag = require("./product_has_tag");
var _product_image = require("./product_image");
var _quotation = require("./quotation");
var _quotation_has_product = require("./quotation_has_product");
var _quotation_likes = require("./quotation_likes");
var _scores = require("./scores");
var _shop = require("./shop");
var _shop_has_product = require("./shop_has_product");
var _tag = require("./tag");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var notification = _notification(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_has_tag = _product_has_tag(sequelize, DataTypes);
  var product_image = _product_image(sequelize, DataTypes);
  var quotation = _quotation(sequelize, DataTypes);
  var quotation_has_product = _quotation_has_product(sequelize, DataTypes);
  var quotation_likes = _quotation_likes(sequelize, DataTypes);
  var scores = _scores(sequelize, DataTypes);
  var shop = _shop(sequelize, DataTypes);
  var shop_has_product = _shop_has_product(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  product.belongsToMany(tag, { as: 'tag_id_tags', through: product_has_tag, foreignKey: "product_id", otherKey: "tag_id" });
  product.belongsToMany(user, { as: 'user_id_user_scores', through: scores, foreignKey: "product_id", otherKey: "user_id" });
  quotation.belongsToMany(shop_has_product, { as: 'shop_has_product_id_shop_has_products', through: quotation_has_product, foreignKey: "quotation_id", otherKey: "shop_has_product_id" });
  quotation.belongsToMany(user, { as: 'user_id_users', through: quotation_likes, foreignKey: "quotation_id", otherKey: "user_id" });
  shop_has_product.belongsToMany(quotation, { as: 'quotation_id_quotations', through: quotation_has_product, foreignKey: "shop_has_product_id", otherKey: "quotation_id" });
  tag.belongsToMany(product, { as: 'product_id_products', through: product_has_tag, foreignKey: "tag_id", otherKey: "product_id" });
  user.belongsToMany(product, { as: 'product_id_product_scores', through: scores, foreignKey: "user_id", otherKey: "product_id" });
  user.belongsToMany(quotation, { as: 'quotation_id_quotation_quotation_likes', through: quotation_likes, foreignKey: "user_id", otherKey: "quotation_id" });
  product.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(product, { as: "products", foreignKey: "category_id"});
  product_has_tag.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_has_tag, { as: "product_has_tags", foreignKey: "product_id"});
  product_image.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_image, { as: "product_images", foreignKey: "product_id"});
  scores.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(scores, { as: "scores", foreignKey: "product_id"});
  shop_has_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(shop_has_product, { as: "shop_has_products", foreignKey: "product_id"});
  quotation_has_product.belongsTo(quotation, { as: "quotation", foreignKey: "quotation_id"});
  quotation.hasMany(quotation_has_product, { as: "quotation_has_products", foreignKey: "quotation_id"});
  quotation_likes.belongsTo(quotation, { as: "quotation", foreignKey: "quotation_id"});
  quotation.hasMany(quotation_likes, { as: "quotation_likes", foreignKey: "quotation_id"});
  shop_has_product.belongsTo(shop, { as: "shop", foreignKey: "shop_id"});
  shop.hasMany(shop_has_product, { as: "shop_has_products", foreignKey: "shop_id"});
  quotation_has_product.belongsTo(shop_has_product, { as: "shop_has_product", foreignKey: "shop_has_product_id"});
  shop_has_product.hasMany(quotation_has_product, { as: "quotation_has_products", foreignKey: "shop_has_product_id"});
  product_has_tag.belongsTo(tag, { as: "tag", foreignKey: "tag_id"});
  tag.hasMany(product_has_tag, { as: "product_has_tags", foreignKey: "tag_id"});
  notification.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(notification, { as: "notifications", foreignKey: "user_id"});
  quotation.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(quotation, { as: "quotations", foreignKey: "user_id"});
  quotation_likes.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(quotation_likes, { as: "quotation_likes", foreignKey: "user_id"});
  scores.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(scores, { as: "scores", foreignKey: "user_id"});
  shop.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(shop, { as: "shops", foreignKey: "user_id"});

  return {
    category,
    notification,
    product,
    product_has_tag,
    product_image,
    quotation,
    quotation_has_product,
    quotation_likes,
    scores,
    shop,
    shop_has_product,
    tag,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
