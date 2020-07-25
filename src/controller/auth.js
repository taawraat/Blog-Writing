const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');

const index = async (req, res) => {
    res.render('login/index')
};

const signup = (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];

    if (!name || !email || !password) {
        errors.push({ msg: 'Please enter all fields' });
    } 

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.send('check fields/password');
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                res.send('user already exists');
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.send('user saved');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
};


const login = (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/blog/create/new',
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout();
    req.session.isLoggedIn = false;
    res.redirect('/');
  };
  

exports.index = index
exports.signup = signup
exports.login = login
exports.logout = logout