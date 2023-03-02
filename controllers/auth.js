const express = require("express");
const db = require('../models')
const bcrypt = require("bcrypt");
const { createUserToken, requireToken } = require("../middleware/auth");

const router = express.Router();

router.get("/logout", requireToken, async (req, res, next) => {
    try {
        const currentUser = req.user.username
        delete req.user
        res.status(200).json({
            message: `${currentUser} currently logged out`,
            isLoggedIn: false,
            token: "",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/register", async (req, res, next) => {
    //has the password before storing the user info in the database
    try {

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const pwStore = req.body.password;
        //we store this temporarily so the origin plain text password can be parsed by the createUserToken();

        req.body.password = passwordHash;
        //modify req.body (for storing hash in db)

        const newUser = await db.User.create(req.body);

        if (newUser) {
            req.body.password = pwStore;
            const authenticatedUserToken = createUserToken(req, newUser);
            res.status(201).json({
                user: newUser,
                isLoggedIn: true,
                token: authenticatedUserToken,
            });
        } else {
            res.status(400).json({ error: "Something went wrong" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const loggingUser = req.body.username;
        const foundUser = await db.User.findOne({ username: loggingUser });
        const token = await createUserToken(req, foundUser);
        res.status(200).json({
            user: foundUser,
            isLoggedIn: true,
            token,
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;