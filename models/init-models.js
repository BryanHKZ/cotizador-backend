var DataTypes = require("sequelize").DataTypes;
var _cart = require("./cart");
var _cart_has_product = require("./cart_has_product");
var _notification = require("./notification");
var _product = require("./product");
var _product_image = require("./product_image");
var _quotation = require("./quotation");
var _quotation_has_product = require("./quotation_has_product");
var _scores = require("./scores");
var _shop = require("./shop");
var _user = require("./user");

function initModels(sequelize) {
  var cart = _cart(sequelize, DataTypes);
  var cart_has_product = _cart_has_product(sequelize, DataTypes);
  var notification = _notification(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_image = _product_image(sequelize, DataTypes);
  var quotation = _quotation(sequelize, DataTypes);
  var quotation_has_product = _quotation_has_product(sequelize, DataTypes);
  var scores = _scores(sequelize, DataTypes);
  var shop = _shop(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  cart.belongsToMany(product, { as: 'product_id_products', through: cart_has_product, foreignKey: "cart_id", otherKey: "product_id" });
  product.belongsToMany(cart, { as: 'cart_id_carts', through: cart_has_product, foreignKey: "product_id", otherKey: "cart_id" });
  product.belongsToMany(quotation, { as: 'quotation_id_quotations', through: quotation_has_product, foreignKey: "product_id", otherKey: "quotation_id" });
  product.belongsToMany(user, { as: 'user_id_users', through: scores, foreignKey: "product_id", otherKey: "user_id" });
  quotation.belongsToMany(product, { as: 'product_id_product_quotation_has_products', through: quotation_has_product, foreignKey: "quotation_id", otherKey: "product_id" });
  user.belongsToMany(product, { as: 'product_id_product_scores', through: scores, foreignKey: "user_id", otherKey: "product_id" });
  cart_has_product.belongsTo(cart, { as: "cart", foreignKey: "cart_id"});
  cart.hasMany(cart_has_product, { as: "cart_has_products", foreignKey: "cart_id"});
  cart_has_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(cart_has_product, { as: "cart_has_products", foreignKey: "product_id"});
  product_image.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_image, { as: "product_images", foreignKey: "product_id"});
  quotation_has_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(quotation_has_product, { as: "quotation_has_products", foreignKey: "product_id"});
  scores.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(scores, { as: "scores", foreignKey: "product_id"});
  quotation_has_product.belongsTo(quotation, { as: "quotation", foreignKey: "quotation_id"});
  quotation.hasMany(quotation_has_product, { as: "quotation_has_products", foreignKey: "quotation_id"});
  product.belongsTo(shop, { as: "shop", foreignKey: "shop_id"});
  shop.hasMany(product, { as: "products", foreignKey: "shop_id"});
  cart.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(cart, { as: "carts", foreignKey: "user_id"});
  notification.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(notification, { as: "notifications", foreignKey: "user_id"});
  quotation.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(quotation, { as: "quotations", foreignKey: "user_id"});
  scores.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(scores, { as: "scores", foreignKey: "user_id"});
  shop.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(shop, { as: "shops", foreignKey: "user_id"});

  return {
    cart,
    cart_has_product,
    notification,
    product,
    product_image,
    quotation,
    quotation_has_product,
    scores,
    shop,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
