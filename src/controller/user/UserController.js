const { user: User } = require("../../../models");
const aes256 = require("aes256");
const services = require("../../services");
const { validationResult } = require("express-validator");

module.exports.signIn = async (req, res) => {
  try {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no Registrado" });
    }
    const decryptedPlainText = aes256.decrypt(
      process.env.ENCRYPT_PASS,
      user.password
    );
    if (decryptedPlainText === password) {
      const token = services.createToken(user);

      user.password = "";

      res.json({ token: token, user: user });
    } else {
      return res.status(401).json({ msg: "Contraseña Incorrecta" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.registerUser = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(403).json({ msg: "El usuario ya existe" });
    }

    req.body.password = aes256.encrypt(process.env.ENCRYPT_PASS, password);

    await User.create(req.body);

    return res.status(201).send({ msg: "Usuario registrado correctamente." });
  } catch (error) {
    console.log(error);
  }
};
