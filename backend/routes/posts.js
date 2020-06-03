const express = require('express');
const PostController = require('./../controllers/PostController');
const isAuth = require('./../middleware/isAuth');
const { body } = require('express-validator');
const multer = require('multer');
const router = express.Router();

router.get('', PostController.getAllPost);

chekData = [

    body('title').isLength({
        min: 5,
    }).withMessage("cette valeur ne respecte pas l'titlel !!"),

    body('description').isLength({
        min: 6,

    }).withMessage("cette valeur ne respecte pas icon !!"),


]

// init uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
};
  
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//Define routes
router.post('',isAuth, upload.single('urlImage'), chekData, PostController.storePost);
router.put('/:id',isAuth, chekData, PostController.updatePost);
router.get('/:id', PostController.showOnePost);
router.patch('/:id',isAuth, chekData, PostController.patchPost);
router.delete('/:id',isAuth, PostController.deletePost);

module.exports = router;