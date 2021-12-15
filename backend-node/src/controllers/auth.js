const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.login = async (req, res) => {
    const { password, userName } = req.body

    try {
        const user = await User.findOne({userName: userName})
        if (!user) throw Error("User with this username does not exist")

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw Error("Invalid credentials!")

        const userTemplate = {
        id: user.id,
        userName
        }

        const token = jwt.sign(userTemplate, process.env.JWT_SECRET)
        if (!token) throw Error("Something critical happened")

        res.status(200).json({
        token,
        ...userTemplate
        })

    } catch (e){
        res.status(400).json({ error: e.message })
    }
}

exports.signup = async (req, res) => {
    const { userName, email, password, firstName, lastName, privacyToggle, emailNotifications } = req.body

    try {
        const emailCheck = await User.findOne({ email: email })

        if (emailCheck) throw Error("User with that e-mail already exists")

        const userCheck = await User.findOne({ userName: userName })

        if (userCheck) throw Error("User with that username already exists")

        const salt = await bcrypt.genSalt(10)
        if (!salt) throw Error("Something critical happened 483543875")

        const hash = await bcrypt.hash(password, salt)
        if (!hash) throw Error("Something critical happened 123172387")

        const newUser = new User({
        userName,
        email,
        firstName,
        lastName,
        password: hash,
        passwordConfirmation: hash,
        privacyToggle,
        emailNotifications
        })

        const savedUser = await newUser.save()
        if (!savedUser) throw Error("Error saving user")

        res.status(200).json({ message: "User created successfully" })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

exports.getUser = async (req, res) => {
    const { userName } = req.params;
    try{
        const data = await User.findOne({userName: userName})

        if (!data) throw Error("Error finding user")

        res.status(200).json(data)
    } catch (e){
        res.status(400).json({ error: e.message })
    }
}

// exports.updateUser = async (req, res) => {
//     const {userName} = req.params;
//     try{
//         // req.body.password = await bcrypt.hash(req.body.password, 8);
//         var update = {
//         "userName": req.body.userName,
//         "email": req.body.email,
//         // "password": req.body.password,
//         "firstName": req.body.firstName,
//         "lastName": req.body.lastName,
//         "emailNotifications": req.body.emailNotifications
//         };
//         const user = await User.findOneAndUpdate({userName: userName}, update)
//         if(!user) throw Error("error updating user")

//         res.status(200).send("updated user successfully")

//     } catch (e) {
//         res.status(400).json({ error: e.message })
//     }
// }

exports.updateUser = async (req, res) => {
    const {userName} = req.params;
    try{
        const data = await User.findOne({userName: userName})

        if (!data) res.status(404).send("no user with that name")

        const updated = await User.findOneAndUpdate({userName: userName}, req.body,{new: true})

        res.status(200).send(`user ${data} updated to ${updated}`)

    } catch (e) {
        res.status(400).json({ error: e.message })
    }

}

exports.followUser = async (req, res) => {
    const {followedUser, followingUser} = req.body

    try{
        if(followedUser == followingUser) throw Error("Followed user can not be same as following user")

        const followedData = await User.findOne({userName: followedUser})
    
        if (!followedData) throw Error("Error finding followable user")

        const checkFollowerArray = await User.find({userName: followingUser, followedUsers: { $in: [followedUser] } })

        if(checkFollowerArray.length != 0) throw Error("User has already followed this account")
    
        const followerData = await User.findOneAndUpdate({userName: followingUser}, { $push: { followedUsers: followedUser }})
    
        if(!followerData) throw Error("Error following the user")
    
        res.status(200).json({ message: "User followed successfully" })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

exports.unFollowUser = async (req, res) => {
    const {followedUser, followingUser} = req.body

    try{
        if(followedUser == followingUser) throw Error("Followed user can not be same as following user")

        const followedData = await User.findOne({userName: followedUser})
    
        if (!followedData) throw Error("Error finding followable user")

        const checkFollowerArray = await User.find({userName: followingUser, followedUsers: { $in: [followedUser] } })

        if(checkFollowerArray.length == 0) throw Error("User has not followed this account")
    
        const followerData = await User.findOneAndUpdate({userName: followingUser}, { $pull: { followedUsers: followedUser }})
    
        if(!followerData) throw Error("Error unfollowing the user")
    
        res.status(200).json({ message: "User unfollowed successfully" })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}