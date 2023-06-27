require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const itemRoutes = require('./routes/item-routes');
const cookieParser = require('cookie-parser');

// init app
const app = express();

// middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// connect to db
const db_url = process.env.DB_URL;
const port = process.env.PORT;
const connectdb = async () => {
    try {
        await mongoose.connect(db_url, { useUnifiedTopology: true});
        
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    } catch (err) {
        console.log(err);
    };
};
connectdb();

// routes
app.use('/users', userRoutes);
app.use(itemRoutes);

// home page
app.get('/', (req, res) => {
    res.render('home');
});

// 404
app.use((req, res) => {
    res.render('404');
});