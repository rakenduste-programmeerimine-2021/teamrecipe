const Recipe = require('../models/Recipe')
const User = require('../models/User')
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

exports.getFollowedRecipes = async (req, res) => {
  const { username } = req.params
  var recipeArray = []

  try{
    const userName = await User.findOne({userName: username})

    if(!userName) throw Error("Invalid username")

    const findRecipes = await Recipe.find({userName: userName.followedUsers})

    if(!findRecipes) throw Error("Error finding followed user's recipes")

    res.status(200).send(findRecipes)
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}

exports.likeRecipe = async (req, res) => {
  const { userName, recipeID } = req.body;
    try{
      const username = await User.findOne({userName: userName})

      if(!username) throw Error("Invalid username")

      const recipe = await Recipe.findOne({recipeID: recipeID})

      if (!recipe) throw Error("Error finding recipe")

      const checkLikesArray = await User.find({userName: userName, likedRecipeIDs: { $in: [recipeID] } })

      if(checkLikesArray.length != 0) throw Error("User has already liked this recipe")

      const addLikeDataToUser = await User.findOneAndUpdate({userName: userName}, { $push: { likedRecipeIDs: recipeID }})

      if(!addLikeDataToUser) throw Error("Error adding like data to user")

      const addLikeDataToRecipe = await Recipe.findOneAndUpdate({recipeID: recipeID}, { $inc: { recipeLikeCount: 1}})

      if(!addLikeDataToRecipe) throw Error("Error adding like data to recipe")

      res.status(200).json({ message: "Recipe successfully liked" })
    } catch (e){
        res.status(400).json({ error: e.message })
    }
}

exports.unLikeRecipe = async (req, res) => {
  const { userName, recipeID } = req.body;
    try{
      const username = await User.findOne({userName: userName})

      if(!username) throw Error("Invalid username")

      const recipe = await Recipe.findOne({recipeID: recipeID})

      if (!recipe) throw Error("Error finding recipe")

      const checkLikesArray = await User.find({userName: userName, likedRecipeIDs: { $in: [recipeID] } })

      if(checkLikesArray.length == 0) throw Error("User has not liked this recipe")

      const addLikeDataToUser = await User.findOneAndUpdate({userName: userName}, { $pull: { likedRecipeIDs: recipeID }})

      if(!addLikeDataToUser) throw Error("Error removing like data from user")

      const addLikeDataToRecipe = await Recipe.findOneAndUpdate({recipeID: recipeID}, { $inc: { recipeLikeCount: -1}})

      if(!addLikeDataToRecipe) throw Error("Error removing like data from recipe")

      res.status(200).json({ message: "Recipe successfully unliked" })
    } catch (e){
      res.status(400).json({ error: e.message })
    }
}

exports.getLikedRecipes = async (req, res) => {
  const { username } = req.params
  var likesArray = []

  try{
    const userName = await User.findOne({userName: username})

    if(!userName) throw Error("Invalid username")

    const findRecipes = await Recipe.find({recipeID: userName.likedRecipeIDs})

    if(!findRecipes) throw Error("Error finding followed user's recipes")

    res.status(200).send(findRecipes)
  } catch (e) {
    res.status(400).json({ Error: e.message })
  }
}
