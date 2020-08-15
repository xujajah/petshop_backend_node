let express = require('express');
let cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let logger = require('morgan');
let cors = require('cors')
let mongoose = require('mongoose');
let passport = require('passport');

let indexRouter = require('./routes/index');
let shopRouter = require('./routes/shop');
let discussion = require('./routes/discussion');
let contact = require('./routes/contact');

let app = express();

mongoose.connect("mongodb+srv://root:root@cluster0-eamcp.mongodb.net/pets?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use( bodyParser.urlencoded({ extended : false }) );
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors())

app.use('/', indexRouter);
app.use('/shop', shopRouter);
app.use('/discuss', discussion);
app.use('/contact', contact);

module.exports = app;
