const express = require('express')
const router = express.Router()
const yelCamp = require("../models/yel_model")

router.get('/campground', (req, res) => {
    yelCamp.find({}).then((data) => res.render('yelcamp', {
        data: data,
        currentuser: req.user
    }))
})
router.get('/campground/new', isLoggedIn, (req, res) => {
    res.render('campForm')
})
router.post('/campground', isLoggedIn, (req, res) => {
    const camp = req.body.camp
    const image = req.body.image_url
    const desc = req.body.description
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCamp = {
        title: camp,
        image: image,
        description: desc,
        author: author,
    }

    yelCamp.create(newCamp).then((newlycamp) => {
        // console.log(newlycamp);
        res.redirect('/campground')
    })

})
router.get('/campground/:id', (req, res) => {
    yelCamp.findById(req.params.id).populate('comments').exec(function(err, doc) {
        if (err) {
            console.log(err);

        } else {
            // console.log(doc);
            res.render('show', {
                doc: doc
            })

        }
    })

})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("Success", "Please Login")
    res.redirect('/login')
}


module.exports = router