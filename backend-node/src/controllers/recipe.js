const Recipe = require('../models/Recipe')
var mongoose = require('mongoose');

exports.getRecipes = async (req, res) => {
  const recipe = await Recipe.find({})
  res.status(200).send(recipe)
}

exports.getRecipe = async (req, res) => {
  const { recipeID } = req.params;
    try{
        const recipe = await Recipe.findOne({recipeID: recipeID})

        if (!recipe) throw Error("Error finding recipe")

        res.status(200).json(recipe)
    } catch (e){
        res.status(400).json({ error: e.message })
    }
}

exports.createRecipe = async (req, res) => {
  const newRecipe = new Recipe ({
    "userName": req.body.userName,
    "recipeName": req.body.recipeName,
    "recipePrivacy": req.body.recipePrivacy,
    "recipeType": req.body.recipeType,
    "recipeDescription": req.body.recipeDescription,
    "recipeSteps": req.body.recipeSteps,
    "recipeIngredients": req.body.recipeIngredients,
    "recipeIngredientAmount": req.body.recipeIngredientAmount,
    "imageURL":  `http://localhost:8081/api/images/${req.file.filename}`
  })
  newRecipe.save()
    .then(() =>{
      res.status(200).send("Recipe has been uploaded")
    }).catch(err => res.status(500).json(err))
}

exports.deleteRecipe = async (req, res) => {
  console.log(req.body)
  const id = req.body.recipeID;
  const parameter = req.body.filename
  var gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "images"
  });

  if(parameter == undefined){
    const recipe = await Recipe.findOneAndDelete({ recipeID: id })
    if(!recipe) throw Error("Error deleting recipe")
    res.status(200).send("Recipe deleted")
  } else {
    const recipe = await Recipe.findOneAndDelete({ recipeID: id })
    if(!recipe) throw Error("Error deleting recipe")

    const files = await gridfs.find({filename: parameter}).toArray();
    if (files.length === 0) {
        throw new Error('File not found!');
    }
    return Promise.all(
        files.map((img) => {
            return (gridfs.delete(img._id), res.status(200).send("Recipe deleted"))
    }));
  }
}

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  var gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "images"
  });

  var update = {};
  if(req.file != undefined){
    update = {
      "recipeName": req.body.recipeName,
      "recipeDescription": req.body.recipeDescription,
      "recipePrivacy": req.body.recipePrivacy,
      "recipeType": req.body.recipeType,
      "recipeSteps": req.body.recipeSteps,
      "recipeIngredients": req.body.recipeIngredients,
      "recipeIngredientAmount": req.body.recipeIngredientAmount,
      "imageURL": `http://localhost:8081/api/images/${req.file.filename}`
    }
  } else {
    update = {
      "recipeName": req.body.recipeName,
      "recipeDescription": req.body.recipeDescription,
      "recipePrivacy": req.body.recipePrivacy,
      "recipeType": req.body.recipeType,
      "recipeSteps": req.body.recipeSteps,
      "recipeIngredients": req.body.recipeIngredients,
      "recipeIngredientAmount": req.body.recipeIngredientAmount,
    }
  }

  if(req.file == undefined){
    const recipe = await Recipe.findOneAndUpdate({ recipeID: id }, update)
    if(!recipe) throw Error("Error updating recipe")

    res.status(200).send("updated")
  } else {
    const recipe = await Recipe.findOneAndUpdate({ recipeID: id }, update)

    if(!recipe) throw Error("Error updating recipe")
    
    const previousImage = req.body.prevImage
    const files = await gridfs.find({filename: previousImage}).toArray();

    if (files.length === 0) {
        throw new Error('File not found!');
    }

    return Promise.all(
        files.map((img) => {
            return (gridfs.delete(img._id), res.status(200).send("updated and changed the image"))
    }));
  }
}
