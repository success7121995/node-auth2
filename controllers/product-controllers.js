const Smoothies = require('../models/Smoothies');

// go to view products
module.exports.viewProducts_get = async (req, res) => {
    try {
        const products = await Smoothies.find();
        res.render('smoothies', {
            products
        });
    } catch (err) {
        console.log(err);
    };
};

// go to upload page
module.exports.upload_get = (req, res) => {
    res.render('upload');
};

// store products to db
module.exports.upload_post = async (req, res) => {
    res.send('uploaded');
};
