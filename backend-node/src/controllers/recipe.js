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

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  var update = {};
  update.recipe = req.body.recipe
  try{
    const recipe = await Recipe.findOneAndUpdate({ _id: id }, { recipe: update.recipe })

    if(!recipe) throw Error("Error updating recipe")

    res.status(200).send("updated")
    
  } catch (e){
    res.status(400).json({ error: e.message })
  }
}

exports.getRecipe = async (req, res) => {
  const { id } = req.params;
    try{
        const recipe = await Recipe.findOne({_id: id})

        if (!recipe) throw Error("Error finding recipe")

        res.status(200).json(recipe)
    } catch (e){
        res.status(400).json({ error: e.message })
    }
}