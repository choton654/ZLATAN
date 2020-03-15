const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require("../models/user")


router.get('/', (req, res) => {
    res.render('index')
})
router.get('/register', (req, res) => res.render('register'))

router.post('/register', (req, res) => {
    var newUser = new User({
        username: req.body.username
    })
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register')
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campground')
        })
    })
})

router.get('/login', (req, res) => {
    res.render('login', { message: req.flash("error") })
})


router.post('/login', passport.authenticate('local', {
    successRedirect: '/campground',
    failureRedirect: '/login'
}), (req, res) => {})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campground')
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login first")
    res.redirect("/login")
}


module.exports = router