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

//GET all from breakfast category
router.get('/breakfast', async (req, res) => {
    try {
        const breakfastPosts = await db.Post.find({'category': 'Breakfast'})
        return res.status(200).json(breakfastPosts)
    } catch (error) {
        console.error(error)
    }
})
//GET all from lunch category
router.get('/lunch', async (req, res) => {
    try {
        const lunchPosts = await db.Post.find({'category': 'Lunch'})
        return res.status(200).json(lunchPosts)
    } catch (error) {
        console.error(error)
    }
})
//GET all from dinner category
router.get('/dinner', async (req, res) => {
    try {
        const dinnerPosts = await db.Post.find({'category': 'Dinner'})
        return res.status(200).json(dinnerPosts)
    } catch (error) {
        console.error(error)
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

router.delete("/:id", requireToken, async (req, res, next) => {
    try {
      handleValidateOwnership(req, await db.Post.findById(req.params.id));
      const deletedPost = await db.Post.findByIdAndRemove(req.params.id);
      res.status(200).json(deletedPost);
    } catch (error) {
      console.error(error)
      return next(error)
    }
  });
  

module.exports = router