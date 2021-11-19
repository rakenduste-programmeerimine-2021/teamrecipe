const { Schema, model } = require('mongoose')

const likingSchema = new Schema({
    UserID: { type: Number, required: true, unique: true, ref: "User"},
    RecipeID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Recipe"},
});

const Liking = model("Liking", likingSchema)

module.exports = Liking