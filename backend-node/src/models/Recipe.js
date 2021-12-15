const { Schema, model } = require('mongoose')
var mongoose = require('mongoose');

const recipeSchema = new Schema({
    recipeID: { type: Number, required: true, unique: true,  default: Date.now},
    userName: { type: mongoose.Schema.Types.String, required: true, ref: "User"},
    recipeName: { type: String, required: true, maxLength: 75 },
    recipePrivacy: {type: String, required: true, maxLength: 150},
    recipeType: {type: String, required: true, maxLength: 75},
    recipeDescription: { type: String, required: true, maxLength: 300 },
    recipeSteps: [{}],
    recipeIngredients: [{}],
    recipeIngredientAmount: [{}],
    imageURL: { type: String },
    recipeLikeCount: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe