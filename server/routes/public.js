require('dotenv').config()
const express = require('express')
const router = express.Router()
 const task = require('../models/task')
const members = require('../models/members')
const { SUCCESS, NOT_FOUND, ERROR505OR404 } = require('../VariableName')

//Display Deadline
router.get('/displayTask', async (req,res) => {
    const fetchedTask = await task.findOne({id:1})
    if(fetchedTask) {
        return res.json({
            success: true,
            message: SUCCESS,
            payload: fetchedTask
        })
    } else {
        return res.status(404).json({
            success: false,
            message: NOT_FOUND
        })
    }
})

//Find Image Video
router.get('/getImageVideo/:id', async (req,res) => {
    const id = req.params.id
    try {
        const foundMember = await members.findById(id).select('-psid')
        if(foundMember) {
            return res.json({
                success: true,
                message: SUCCESS,
                payload: foundMember
            })
        } else {
            return res.status(404).json({
                success: false,
                message: NOT_FOUND
            })
        }
    } catch(err) {
        console.log(err)
        return res.status(404).json({
            success: false,
            message: ERROR505OR404
        })
    }
})

module.exports = router