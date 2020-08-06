let express = require('express');
let AdModel = require('../model/AdModel')
let passport = require('passport');
let fs = require('fs');
let path = require('path');
let multer = require('multer');

let router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({storage: storage});

router.post('/ad', passport.authenticate('jwt', {session: false}), upload.single('image'), function (req, res) {
    console.log(req.user)
    let newAd = new AdModel(
        {
            owner: req.user._id,
            phone: req.body.phone,
            price: req.body.price,
            description: req.body.description,
            title: req.body.title,
            type: req.body.title,
            city: req.body.city,
            category: req.body.category,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
    )
    AdModel.create(newAd, function (err, data) {
        if (err) {
            res.json(err)
        } else {
            fs.unlink(path.join(__dirname + '/../uploads/' + req.file.filename), (err) => {
                if (err) throw err;
                console.log(req.file.filename + ' was deleted');
            });
            res.json(data)
        }
    })
})


router.get('/', function (req, res, next) {
    AdModel.find({}, function (err, result) {
        if (err) {
            return res.json({error: err})
        } else {
            return res.json(result)
        }
    })
});

module.exports = router;
