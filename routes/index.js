const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
let DiscussionModel = require('../model/discussionModel')
let AdModel = require('../model/AdModel')


const router = express.Router();

router.post('/signup', passport.authenticate('signup', {session: false}), async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.json({"error": "Error Occurred"});
            }
            req.login(user, {session: false}, async (error) => {
                if (error) return next(error)
                const body = {_id: user._id, email: user.email};
                const token = jwt.sign({user: body}, 'top_secret');
                return res.json({token});
            });
        } catch (error) {
            return res.json({error});
        }
    })(req, res, next);
});

router.get("/profile", passport.authenticate('jwt', {session: false}), function (req, res) {
    DiscussionModel.find({owner: req.user._id}, function (err, discussions) {
        if (err) {
            return res.json({error: err})
        } else {
            AdModel.find({owner: req.user._id}, function (err, ads) {
                if (err) {
                    return res.json({error: err})
                } else {
                    return res.json({
                        discussions: discussions,
                        ads: ads
                    })
                }
            }).select('title');
        }
    }).select('question');
})

router.get("/delete/:type/:id", passport.authenticate('jwt', {session: false}), function (req, res) {
    if (req.params.type === "Q"){
        DiscussionModel.remove({_id: req.params.id}, function (err, done) {
            if (err){
                return res.json({error: err})
            }
            if (done){
                return res.json(done)
            }
            else{
                return res.json({error: "I don't know what happened."})
            }
        })
    }else if (req.params.type === "A"){
        AdModel.remove({_id: req.params.id}, function (err, done) {
            if (err){
                return res.json({error: err})
            }
            if (done){
                return res.json(done)
            }
            else{
                return res.json({error: "I don't know what happened."})
            }
        })
    }
})

router.get('/', function (req, res, next) {
    res.json({title: 'App is working...'});
});

module.exports = router;