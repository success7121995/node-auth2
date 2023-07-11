const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/product-img');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

// upload img
module.exports.uploadImg = multer({ storage }).single('image');