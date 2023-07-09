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

// store products to db
module.exports.uploadProduct_post = async (req, res) => {
    const { name, desc, price } = req.body;

    try {
        const product = await Smoothies.create({ name, desc, price });
        res.json({ product });
    } catch (err) {
        console.log(err);
    };
};
