const Recipe = require('../models/Recipe')

exports.getRecipes = async (req, res) => {
  const recipe = await Recipe.find({})
  
  res.status(200).send(recipe)
}

exports.createRecipe = async (req, res) => {
  const newRecipe = (req.body)

  const createdRecipe = new Recipe(newRecipe)

  const savedRecipe = createdRecipe.save()

  res.status(200).send("created")
}

exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  
  const recipe = await Recipe.findOneAndDelete({ _id: id })

  res.status(200).send("deleted")
}