const router = require("express").Router()
const recipeController = require("../controllers/recipe")
const upload = require("../middleware/upload")

router.get("/", recipeController.getRecipes)
router.post("/create", upload.single("image"), recipeController.createRecipe)
router.post("/update/:id", upload.single("image"), recipeController.updateRecipe)
router.put("/like", recipeController.likeRecipe)
router.put("/unlike", recipeController.unLikeRecipe)
router.delete("/delete", recipeController.deleteRecipe)
router.get("/followed/:username", recipeController.getFollowedRecipes)
router.get("/like/:username", recipeController.getLikedRecipes)
router.get("/:recipeID", recipeController.getRecipe)

module.exports = router