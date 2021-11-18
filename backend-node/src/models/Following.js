const { Schema, model } = require('mongoose')

const followingSchema = new Schema({
    UserID: { type: Number, required: true, unique: true, ref: "User"},
    FolloweeID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
});

const Following = model("Following", followingSchema)

module.exports = Following