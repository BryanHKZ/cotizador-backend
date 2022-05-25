const moment = require("moment");
const jwt = require("jsonwebtoken");

module.exports.createToken = (data) => {
  const payload = {
    sub: data.id,
    iat: moment().unix(),
    exp: moment().add(1, "week").unix(),
  };

  return jwt.sign(payload, process.env.JWT_PASS);
};

module.exports.decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.sign(token, process.env.clave);
      if (payload.exp <= moment.unix()) {
        reject({
          status: 401,
          msg: "El token ha expirado",
        });
      }

      resolve(payload);
    } catch (error) {
      reject({
        status: 500,
        msg: "Token invalido",
      });
    }
  });
};
