const router = require("express").Router()
// npm package that checks for user input for email and password that are valid
const { check, validationResult } = require("express-validator")
const { users } = require("../db")
const bcrypt = require("bcrypt")
const { application } = require("express")
const JWT = require("jsonwebtoken")
const env = require("dotenv")

// SIGNUP
router.post('/signup', [
    check("email", "Plesae provide a valid email")
        .isEmail(),
    check("password", "Please provide a password that is greater than 6 characters")
        .isLength({
            min: 6
        })
], async (req,res) => {
    const { password, email } = req.body

    // VALIDATED THE INPUT
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    // VALIDATE IF USER DOESNT ALREADY EXIST
    
    let user = users.find((user) => {
        return user.email === email
    })

    if(user) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "This user already exists",
                }
            ]
        })
    }

    // Hash the pasword
    const hashedPassword = await bcrypt.hash(password, 10)

    // Save the password into the db
    users.push({
        email,
        password: hashedPassword
    })

    // Provided not so secure secret key
    const token = await JWT.sign({
        email
    },"12321dsf23effcvklfwe", {
        expiresIn: 3600000
    })

    res.json({
        token
    })

})

// LOGIN
router.post('/login', async (req,res) => {
    const { password, email } = req.body

    // Checking if user exits

    let user = users.find((user) => {
        return user.email === email
    })

    if(!user) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid Credentials",
                }
            ]
        })
    }

    // Checking if the password if valid
    let isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid Credentials",
                }
            ]
        })
    }

    // Will send JWT
    const token = await JWT.sign({
        email
    },"12321dsf23effcvklfwe", {
        expiresIn: 3600000
    })

    res.json({
        token
    })
})

router.get("/all", (req,res) => {
    res.json(users)
})

module.exports = router