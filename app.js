require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const productRoutes = require('./routes/product-routes');
const cookieParser = require('cookie-parser');

// init app
const app = express();

// middlewares
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

//connect to db
const port = process.env.PORT;
const db_url = process.env.DB_URL;
const connectdb = async () => {
    try {
        await mongoose.connect(db_url, {
            useUnifiedTopology: true
        });
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    } catch (err) {
        console.log(err);
    };
};
connectdb();

// home page
app.get('/', (req, res) => {
    res.render('home');
})

// 404 not found
app.use((req, res) => {
    res.render('404')
})