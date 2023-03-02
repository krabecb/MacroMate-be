const express = require("express")
const db = require('../models')
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const allPosts = await db.Post.find({})
        return res.status(200).json(allPosts)
    } catch (error) {
        console.error(error)
        return next(error)
    }
})

router.post("/", requireToken, async (req, res, next) => {
    try {
        // passport will verify the the token passed with the request's Authorization headers and set the current user for the request. 
        const user = req.user._id
        req.body.user = user
        const newPost = await db.Post.create(req.body);
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error)
        return next(error)
    }
});

router.put('/:id', requireToken, async (req, res, next) => {
    try {
        handleValidateOwnership(req, await db.Post.findById(req.params.id))
        const updatedPost = await db.Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(updatedPost)
    } catch (error) {
        console.error(error)
        return next(error)
    }
})

module.exports = router