const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/play", (req, res) => {
    console.log(req.flash("loginError"))
    res.render(path.join(__dirname, "..", "..", "views", "play"), {
        session: req.session.login,
        login: {error: req.flash("loginError"), username: true, password: true},
        register: {error: true, username: true, password: true, confirm: true, user: true}
    });
})

module.exports = router;