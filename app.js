require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParer = require('cookie-parser');
const userRoutes = require('./routes/user-routes');
const productRouter = require('./routes/product-routes');
const auth = require('./middlewares/auth');

// init app
const app = express();

// connect to db
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true });
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        })
    } catch (err) {
        console.log(err);
    };
};
connectDb();

// middlewwares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParer());
app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    cookie: {
        httpOnly: true,
        expires: 1000 * 24 * 60 * 60
    }
}));

// view engine
app.set('view engine', 'ejs');

// route
app.get('*', auth.checkUser);
app.use('/users', userRoutes);
app.use('/smoothies', productRouter);

// go to home page
app.get('/', (req, res) => {
    res.render('home');
});

// logout
app.get('/logout', (req, res) => {
    res.clearCookie('sid');
    res.redirect('/');
}); 

// 404
app.use((req, res) => {
    res.status(404).render('404')
});
