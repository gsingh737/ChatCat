/**
 * Created by User on 2/17/2017.
 */
'use strict';
const passport = require('passport');
const config = require('../config');
const logger = require('../logger');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const h = require('../helpers');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        //Find the user and fetch user
        h.findById(id)
            .then(user => done(null, user))
            .catch(error => logger.log("error", 'Error when deserializing user error: ' + error));
    });
    let authProcessor = (accessToken, refreshToken, profile, done) => {
        //Find a user in the local db using profile.id
        //if user is found, return the data using done()
        //if use is not found, create one in the local db and return
        h.findOne(profile.id)
            .then(result => {
                if(result){
                    done(null, result);
                } else {
                    //create  a new user amd return
                    h.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error => logger.log('error', 'Error when creating new user: ' + error));
                }
            });
    }
    passport.use(new FacebookStrategy(config.fb, authProcessor));
    passport.use(new TwitterStrategy(config.twitter, authProcessor));

}
