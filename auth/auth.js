const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/model');

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({usernameField: 'email', passwordField: 'password'},
        async (email, password, done) => {
            try {
                //Save the information provided by the user to the the database
                const user = await UserModel.create({email, password});
                //Send the user information to the next middleware
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        //Find the user associated with the email provided by the user
        const user = await UserModel.findOne({email});
        if (!user) {
            //If the user isn't found in the database, return a message
            console.log("user not found")
            return done(null, false, {message: 'User not found'});
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
            console.log("password wrong")
            return done(null, false, {message: 'Wrong Password'});
        }
        //Send the user information to the next middleware
        console.log("login match")
        return done(null, user, {message: 'Logged in Successfully'});
    } catch (error) {
        return done(error);
    }
}));


const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));