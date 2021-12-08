const router = require("express").Router()
const recipeController = require("../controllers/recipe")
const imageController = require("../controllers/images")
const upload = require("../middleware/upload")

router.get("/", recipeController.getRecipes)
router.post("/create", upload.single("image"), recipeController.createRecipe)
router.post("/update/:id", upload.single("image"), recipeController.updateRecipe)
router.delete("/delete", recipeController.deleteRecipe)
router.get("/:recipeID", recipeController.getRecipe)

module.exports = router