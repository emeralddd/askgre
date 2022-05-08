require('dotenv').config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const verifyToken = require('../middleware/auth')

const users = require('../models/users')
const members = require('../models/members')
const task = require('../models/task')
const { ERROR_500, SUCCESS, MISSING_PERMISSION, NOT_FOUND, MISSING_REGISTER_INFO, USERNAME_EXIST, WRONG_ACCOUNT } = require('../VariableName')

//Create new Account
router.post('/createNewUser', verifyToken, async (req,res) => {
    const {username, password, departments} = req.body
    if(!username || !password || !departments)
        return res.status(400).json({
            success: false,
            message: MISSING_REGISTER_INFO
        })
    
    const executor = await users.findOne({username:req.executor.username})

    if(!executor) {
        return res.status(403).json({
            success: false
        })
    }

    if(executor.permission!=='admin') {
        return res.status(403).json({
            success: false, 
            message: MISSING_PERMISSION
        })
    }

    try {
        const foundUser = await users.findOne({username})
        if(foundUser) {
            return res.status(400).json({
                success: false,
                message: USERNAME_EXIST
            })
        }

        const hasedPassword = await argon2.hash(password)
        const newUser = new users({username,password:hasedPassword,departments})
        await newUser.save()

        newUser.delete('password')

        res.json({
            success: true,
            message: SUCCESS,
            payload: newUser
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

//Get All Group Deadline
router.get('/getAllMembersMedia', verifyToken, async (req, res) => {
    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(403).json({
                success: false
            })
        }

        const departments = executor.departments

        let allMembers = []

        for(const department of departments) {
            const foundMembers = await members.find({department}).select('-psid')
            allMembers= [...allMembers,...foundMembers]
        }

        res.json({
            success: true,
            message: SUCCESS,
            payload: allMembers
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

//Update Deadline Status
router.put('/updateMemberTask', verifyToken, async (req,res) => {
    const {_id, finished, note} = req.body

    try {
        const member = await members.findById(_id)
        
        if(!member) {
            return res.status(404).json({
                success: false,
                message: NOT_FOUND
            })
        }

        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        const departments = executor.departments

        if(!departments.includes(member.department)) {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const updatedMember = await members.findByIdAndUpdate(
            _id,
            {finished, note},
            {new:true}
        ).select('-psid')

        res.json({
            success: true,
            message: SUCCESS,
            payload: updatedMember
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/updateTask', verifyToken, async (req,res) => {
    const {active,content,title,deadline} = req.body

    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const updatedTask = await task.findOneAndUpdate(
            {id:1},
            {active,title,content,deadline},
            {new:true}
        )

        res.json({
            success: true,
            message: SUCCESS,
            payload: updatedTask
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/verifyMember', verifyToken, async (req,res) => {
    const {_id,fullname,department} = req.body

    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const updatedMember = await members.findByIdAndUpdate(
            _id,
            {fullname,department,verify:true},
            {new:true}
        )

        res.json({
            success: true,
            message: SUCCESS,
            payload: updatedMember
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.delete('/deleteMember', verifyToken, async (req,res) => {
    const {_id} = req.body

    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        await members.findByIdAndRemove(_id)

        res.json({
            success: true,
            message: SUCCESS,
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.get('/getQueue', verifyToken, async (req,res) => {
    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const queue = await members.find({verify:false}).select('-psid')

        res.json({
            success: true,
            message: SUCCESS,
            payload: queue
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/editMemberProfile', verifyToken, async (req,res) => {
    const {_id,firstName,lastName,fullName,department} = req.body

    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const find = await members.findById(_id)

        if(!find) {
            return res.status(404).json({
                success: false,
                message: NOT_FOUND
            })
        }

        const updatedMember = await members.findByIdAndUpdate(
            _id,
            {firstName,lastName,fullName,department},
            {new:true}
        )

        res.json({
            success: true,
            message: SUCCESS,
            payload: updatedMember
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.get('/getAllUsers', verifyToken, async (req, res) => {
    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const find = await users.find({}).select('-password')

        if(!find) {
            return res.status(404).json({
                success: false,
                message: NOT_FOUND
            })
        }

        res.json({
            success: true,
            message: SUCCESS,
            payload: find
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/changeUserPassword', verifyToken, async (req, res) => {
    const {username,newPassword}=req.body
    console.log('abnc')
    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }
        
        const hasedPassword = await argon2.hash(newPassword)

        const find = await users.findOneAndUpdate(
            {username},
            {password:hasedPassword},
            {new:true}
        )

        if(!find) {
            return res.status(404).json({
                success: false,
                message: NOT_FOUND
            })
        }

        res.json({
            success: true,
            message: SUCCESS
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.put('/editUser', verifyToken, async (req, res) => {
    const {username,departments,permission}=req.body
    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        const find = await users.findOneAndUpdate(
            {username},
            {username,departments,permission},
            {new:true}
        )

        if(!find) {
            return res.status(404).json({
                success: false,
                message: NOT_FOUND
            })
        }

        res.json({
            success: true,
            message: SUCCESS,
            payload: find
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

router.delete('/deleteUser', verifyToken, async (req,res) => {
    const {_id} = req.body

    try {
        const executor = await users.findOne({username:req.executor.username})

        if(!executor) {
            return res.status(401).json({
                message: WRONG_ACCOUNT,
                success: false
            })
        }

        if(executor.permission!=='admin') {
            return res.status(403).json({
                success: false,
                message: MISSING_PERMISSION
            })
        }

        await users.findByIdAndRemove(_id)

        res.json({
            success: true,
            message: SUCCESS,
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: ERROR_500
        })
    }
})

module.exports = router
