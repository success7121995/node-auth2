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

// go to view single product
module.exports.viewProduct_get = async (req, res) => {
    const product = req.param.id
}

// go to upload page
module.exports.upload_get = (req, res) => {
    res.render('upload');
};

// store products to db
module.exports.upload_post = async (req, res) => {
    const { name, desc, price } = req.body;
    const img = {
        data: req.file.filename,
        contentType: 'image/jpg'
    };
    try {
        await Smoothies.create({ name, desc, price, img });
        res.redirect('/smoothies');
    } catch (err) {
        console.log(err);
    };
};