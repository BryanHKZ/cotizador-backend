const express = require("express");
const api = express.Router();
const { getTagsAndCategories } = require("../controller/extra/extraController");

api.get("/", [], getTagsAndCategories);

module.exports = api;
