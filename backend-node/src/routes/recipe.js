const router = require("express").Router()
const recipeController = require("../controllers/recipe")

router.get("/", recipeController.getRecipes)
router.post("/create", recipeController.createRecipe)
router.delete("/delete/:id", recipeController.deleteRecipe)

module.exports = router