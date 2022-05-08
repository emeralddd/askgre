const express = require('express')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const verifyToken = require('../middleware/auth')
const users = require('../models/users')
const { ERROR_500, WRONG_ACCOUNT, MISSING_LOGIN_INFO, LOGIN_FAIL, LOGIN_SUCCESS } = require('../VariableName')

const router = express.Router()

//Verify User
router.get('/', verifyToken, async(req, res) =>{
    try {
        const foundUser = await users.findById(req.executor._id).select('-password')
        if(!foundUser) {
            return res.status(400).json({
                success: false,
                message: WRONG_ACCOUNT
            })
        }
        res.json({
            success: true,
            payload: foundUser
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

//Login
router.post('/login', async (req, res) => {
    const {username, password} = req.body
    if(!username || !password) 
        return res.status(400).json({
            success: false, 
            message: MISSING_LOGIN_INFO
        })
    
    try {
        const foundUser = await users.findOne({username})

        if(!foundUser) {
            return res.status(400).json({
                success: false, 
                message: LOGIN_FAIL
            })
        }
        
        const passwordCheck = await argon2.verify(foundUser.password,password)
        
        if(!passwordCheck) {
            return res.status(400).json({
                success: false, 
                message: LOGIN_FAIL
            })
        }

        const accessToken = jwt.sign({
                _id: foundUser._id,
                username: foundUser.username
            },
            process.env.SECRET_TOKEN,
            {expiresIn: "7d"}
        )

        res.json({
            success: true,
            message: LOGIN_SUCCESS,
            payload: accessToken
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

module.exports = router