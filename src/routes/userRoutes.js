const express = require("express");
const api = express.Router();
const { check } = require("express-validator");
const { signIn, registerUser } = require("../controller/user/UserController");

api.post(
  "/login",
  [
    check("email", "El Correo electrónico es requerido").isEmail(),
    check("password", "La contraseña debe ser mínimo 8 caracteres").isLength({
      min: 8,
    }),
  ],
  signIn
);

api.post(
  "/register",
  [
    check("firstName", "El primer nombre es requerido"),
    check("lastName", "El apellido es requerido"),
    check("role", "El rol es requerido.").default("USER"),
    check("phone", "El teléfono es requerido.").isLength({ min: 10 }),
    check("email", "El Correo electrónico es requerido").isEmail(),
    check("password", "La contraseña debe ser mínimo 8 caracteres").isLength({
      min: 8,
    }),
  ],
  registerUser
);

module.exports = api;
