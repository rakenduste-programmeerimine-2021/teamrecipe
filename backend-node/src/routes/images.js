const router = require("express").Router()
const imagesController = require("../controllers/images")

router.get("/:filename", imagesController.getRecipeImage)

module.exports = router