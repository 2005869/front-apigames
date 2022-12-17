const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const UserController = require('./users/UsersController');
const session = require('express-session');
const usersAuth = require('./middlewares/usersauth');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// session
app.use(session({
    secret: "gyagdfygaysdgafsdaa",
    cookie: {maxAge: 30000}
}));



app.use('/', UserController);

//Rotes
app.get('', (req, res) => {
    res.render('index');
});


app.listen(PORT, () => {
    console.log('front-apigames start');
});