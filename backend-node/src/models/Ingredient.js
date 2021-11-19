const { Schema, model } = require('mongoose')

const ingredientSchema = new Schema({
    ingredientID: { type: Number, required: true, unique: true},
    recipeID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Recipe"},
    ingredientName: { type: String, required: true, maxLength: 75 },
    ingredientAmount: { type: Number, required: true }
});

const Ingredient = model("Ingredient", ingredientSchema)

module.exports = Ingredient