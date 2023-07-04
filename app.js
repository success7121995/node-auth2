require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user-routes');

// init app
const app = express();

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser);

// view engine
app.set('view engine', 'ejs');

// connect to db
const port = process.env.PORT || 3001;
const db_url = process.env.DB_URL;
const connectdb = async () => {
    try {
        await mongoose.connect(db_url, { useUnifiedTopology: true});
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    } catch (err) {
        console.log(err)
    };
};
connectdb();

// routes

app.use('/users', userRoutes);

// home
app.get('/', (req, res) => {
    res.render('home');
});

// 404
app.use((req, res) => {
    res.render('404');
});

