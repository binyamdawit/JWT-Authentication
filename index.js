const express = require("express")
const auth = require("./routes/auth")
const post = require("./routes/post")
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", auth)
app.use("/posts", post)

app.get("/", (req,res) => {
    res.send("HELLO WORLD!")
})


app.listen(5000, () => {
    console.log("Now running on port 5000")
})