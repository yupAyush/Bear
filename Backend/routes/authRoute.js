const express = require("express")
const router = express.Router()
const { handleUserSignup, handleUserLogin } = require("../controller/authController")
const {
    tokenVerification
} = require("../middleware/authMiddleware")

router.post("/signup", tokenVerification, handleUserSignup)
router.post("/login", tokenVerification, handleUserLogin)


module.exports = router