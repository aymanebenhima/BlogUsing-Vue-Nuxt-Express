const express = require('express');
const PostController = require('./../controllers/PostController');
const isAuth = require('./../middleware/isAuth');
var multer = require('multer');



const {
    body
} = require('express-validator');




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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/posts')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname) //Appending .jpg
    }
})

var upload = multer({
    dest: 'uploads/posts',
    storage: storage
});



router.post('',isAuth, upload.single('urlImage'), chekData, PostController.storePost);
router.put('/:id',isAuth, chekData, PostController.updatePost);
router.get('/:id', PostController.showOnePost);
router.patch('/:id',isAuth, chekData, PostController.patchPost);
router.delete('/:id',isAuth, PostController.deletePost);

module.exports = router;