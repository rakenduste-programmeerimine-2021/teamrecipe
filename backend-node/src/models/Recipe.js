const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
    recipeID: { type: Number, required: true, unique: true},
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    recipeName: { type: String, required: true, maxLength: 75 },
    recipeDescription: { type: String, required: true, maxLength: 300 },
    recipeSteps: { type: String, required: true, maxLength: 1000 },
    recipePicture: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe