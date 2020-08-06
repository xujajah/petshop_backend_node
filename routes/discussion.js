let express = require('express');
let router = express.Router();
let DiscussionModel = require('../model/discussionModel')
let passport = require('passport');


router.post('/ask', passport.authenticate('jwt', {session: false}), function (req, res) {
    let question = new DiscussionModel({
        owner: req.user._id,
        question: req.body.question,
    })

    DiscussionModel.create(question, function (err, data) {
        if (err) {
            return res.json({error: err})
        } else {
            return res.json(data)
        }
    })
})

router.post('/answer/:id', passport.authenticate('jwt', {session: false}), function (req, res) {
    let comment = {
        text: req.body.answer,
        author: req.user._id
    }
    DiscussionModel.update({_id: req.params.id}, {$push: {comments: comment}}, function (err, data) {
        if (err) {
            return res.json({error: err})
        } else {
            return res.json(data)
        }
    });
})

router.get('/', function (req, res, next) {
    DiscussionModel.find({}, function (err, data) {
        if (err) {
            return res.json({error: err})
        } else {
            return res.json(data)
        }
    }).populate({path: 'comments', populate: {path: 'author', select: 'email'}}).populate("owner", "email")
});

module.exports = router;
