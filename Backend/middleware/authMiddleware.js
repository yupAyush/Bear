const jwt = require("jsonwebtoken")


const tokenVerification = async(req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.uid;
    console.log(token)
    if (!token) {

        return next()
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        return res.status(200).send("User already authenticated")

    } catch (error) {
        res.clearCookie("uid")

        return next()

    }

}


module.exports = { tokenVerification }