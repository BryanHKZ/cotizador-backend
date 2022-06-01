const { tag: _Tags, category: _Categories } = require("../../../models");

module.exports.getTagsAndCategories = async (req, res) => {
  try {
    const tags = await _Tags.findAll();
    const categories = await _Categories.findAll();

    return res.status(200).json({ tags, categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Ha ocurrido un error." });
  }
};
