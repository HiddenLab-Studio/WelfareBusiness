const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/play", (req, res) => {
    res.render(path.join(__dirname, "..", "..", "views", "play"), {
        session: req.session.login,
        username: req.session.username,
        avatar: req.session.avatar,
        loginFlash: {error: req.flash("loginError"), username: req.flash("loginUsernameError"), password: req.flash("loginPasswordError")},
        registerFlash: {error: req.flash("registerError"), username: req.flash("registerUsernameError"), usernameAlreadyRegistered: req.flash("registerUsernameAlreadyUsed"), password: req.flash("registerPasswordError"), confirm: req.flash("registerConfirmError")}
    });
})

module.exports = router;