const express = require('express')
const router = express.Router({ mergeParams: true })
const yelCamp = require("../models/yel_model")
const Comment = require('../models/comment')

router.get('/campground/:id/edit', checkChampgroundOwnership, (req, res) => {
    yelCamp.findById(req.params.id, (err, data) => {
        res.render('edit', { data: data })
    })

})
router.put('/campground/:id', checkChampgroundOwnership, (req, res) => {
    yelCamp.findByIdAndUpdate(req.params.id, {
        title: req.body.camp,
        image: req.body.image_url,
        description: req.body.description
    }, (err, data) => {
        if (err) {
            console.log(err);

        } else {
            res.redirect('/campground/' + data._id)
        }
    })
})

router.get('/campground/:id/delete', checkChampgroundOwnership, (req, res) => {
    yelCamp.findById(req.params.id, (err, data) => {
        if (err) {
            console.log(err);

        } else {
            res.render('delete', { data: data })
        }
    })
})

router.delete('/campground/:id', (req, res) => {
    yelCamp.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);

        } else {

            res.redirect('/campground')
        }
    })
})

function checkChampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        yelCamp.findById(req.params.id, (err, data) => {
            if (err) {
                res.redirect('back');
            } else {
                // console.log(data.author.id);
                // console.log(req.user._id);
                if (data.author.id.equals(req.user._id)) {
                    next();

                } else {
                    res.redirect('back')
                }
            }
        })
    } else {
        res.redirect('back')
    }
}


module.exports = router