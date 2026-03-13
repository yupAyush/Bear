const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 12
const jwt = require("jsonwebtoken")

async function handleUserSignup(req, res) {
    const { email, password } = req.body




    try {
        const isInDatabase = await User.findOne({ email: email })
        if (!isInDatabase) {
            const hash = await bcrypt.hash(password, saltRounds)
            const user = await User.create({
                email: email,
                password: hash
            })

            if (user) {
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY)
                res.cookie("uid", token)
                res.status(200).send("Signed in")

            } else {
                res.status(400).send("error signing in ")
            }
        } else {
            res.status(409).send("already signed in")


        }

    } catch (error) {
        console.log(error)

        res.status(400).send("bad request")


    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).select("+password")
    try {
        if (user) {
            if (bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY)
                res.cookie("uid", token)
                res.status(200).send("user logged in")
            } else {
                res.status(401).send("unathorized")

            }

        } else {
            res.status(401).send("unauthorized")
        }
    } catch (error) {
        console.log(error)

    }


}


module.exports = {
    handleUserSignup,
    handleUserLogin

}