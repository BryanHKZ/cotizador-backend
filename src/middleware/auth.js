const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "Token de autorización requerido." });
  }
  try {
    const cifrado = jwt.verify(token, process.env.JWT_PASS);
    req.user = cifrado.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token Inválido." });
  }
};
