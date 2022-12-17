const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const session = require('express-session');


router.get('/login', (req, res) => {
    res.render('users/signin');
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/create', (req, res) => {
    var {email, password} = req.body;

    User.findOne({where: {email: email}}).then(user => {
        if (user == undefined){
            console.log('you can add this user');
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect('/login');
            }).catch(err => {
                console.log(err);
                res.redirect('/');
            });
        }else{
            console.log('existing user');
            res.redirect('/login');
        }
    }).catch(err => {
        console.log(err);
    });
    
});

router.post('/users/login', (req, res) => {
    var {email, password} = req.body;

    User.findOne({where: {
        email: email
    }}).then(user => {
        if (user != undefined){
            var correct = bcrypt.compareSync(password, user.password);

            if (correct){
                req.session.user = {
                    email: user.email,
                    id: user.id
                }
                res.redirect('/');
            }else{
                res.redirect('/login');
            }
        }else{
            res.redirect('/login');
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    });
});

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

module.exports = router;