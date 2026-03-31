const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookieparser = require("cookie-parser")
const path = require("path")
const authRouter = require("../Backend/routes/authRoute")
const marketRouter = require("../Backend/routes/marketRoute")
require("../Backend/config/db.config")
app.use(cookieparser())
app.use(express.json())



app.get("/", (req, res) => {
    res.send("hello world ")
})


app.use("/users", authRouter)
app.use("/market", marketRouter)







app.listen(3000, () => {
    console.log("server is running on port 3000")
})