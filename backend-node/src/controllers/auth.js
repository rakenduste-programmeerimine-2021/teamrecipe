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
        if (!token) throw Error("Something critical happened 99981811")

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