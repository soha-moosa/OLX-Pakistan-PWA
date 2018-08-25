const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('./productController');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString() + file.originalname);
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);

    }
});
const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.post('/addProduct', checkAuth, upload.single('productImage'), controller.addProduct);
router.get('/allProduct', controller.getAllProduct);
router.get('/searchById/:id', controller.searchProduct);
router.post('/searchByCategory', checkAuth, controller.searchByCategory);
router.post('/searchByName', checkAuth, controller.searchByName);
router.delete('/deleteProduct/:id', checkAuth, controller.deleteProduct);
module.exports = router;

