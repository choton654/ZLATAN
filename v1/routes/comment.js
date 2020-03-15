const express = require('express')
const router = express.Router()
const yelCamp = require("../models/yel_model")
const Comment = require('../models/comment')

router.get('/campground/:id/comment/new', isLoggedIn, (req, res) => {
    yelCamp.findById(req.params.id)
        .then((data) => {
            res.render('comments', {
                data: data
            })
        })
        .catch(err => console.log(err))

})
router.post('/campground/:id/comment', (req, res) => {
    yelCamp.findById(req.params.id, (err, camp) => {
        if (err) {
            console.log(err);

        } else {
            Comment.create(req.body.comment, (err, data) => {
                if (err) {
                    console.log(err);

                } else {
                    data.author.id = req.user._id;
                    data.author.username = req.user.username;
                    data.save();
                    camp.comments.push(data);
                    camp.save();
                    // console.log(data);

                    res.redirect('/campground/' + camp._id);
                }
            })
        }
    })
})


router.get('/campground/:id/comment/:comment_id/edit', checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, data) => {
            if (err) {
                res.redirect('back');

            } else {
                res.render('comedit', { comment: data, data_id: req.params.id })
            }
        })
        // res.send('hello')
})

router.put('/campground/:id/comment/:comment_id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
                if (err) {
                    res.redirect('back')
                } else {
                    res.redirect('/campground/' + req.params.id);
                }
            }


        )
        // res.send('hello')
})

router.delete('/campground/:id/comment/:comment_id', checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            console.log(err);

        } else {
            res.redirect('/campground/' + req.params.id)
        }
    })
})

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, data) => {
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



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


module.exports = router