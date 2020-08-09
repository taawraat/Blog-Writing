const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const blogRoute = require('./routes/blog');
const contactRoute = require('./routes/contact');
const auth = require('./routes/auth');
const passport = require('passport');
const flash = require('connect-flash');

require('./controller/config/passport')(passport);

dotenv.config();

mongoose.connect(process.env.URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false},
    () => console.log('connected to db'))


app.set('views','src/views')
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static('src/public'));

app.use(
    session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

app.use(express.json())

app.use((req, res, next) => {
	res.locals.isLoggedIn = req.session.isLoggedIn;
	next();
})


app.get('/', (req,res) => {
    res.render('index');
})


//ssl certificate validation
app.get('/.well-known/pki-validation/7DBF9E39D236051771DCA4B4361D7C2E.txt',(req,res) => {
    res.sendFile('/.well-known/pki-validation/7DBF9E39D236051771DCA4B4361D7C2E.txt')
})

app.use('/auth/my/secret/path', auth);
app.use('/blog', blogRoute);
app.use('/contact', contactRoute);

server.listen(process.env.PORT || 5000, () => console.log('connected'))