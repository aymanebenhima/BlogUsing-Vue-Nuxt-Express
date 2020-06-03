const express = require('express');
const CommentController = require('./../controllers/CommentController');
const isAuth = require('./../middleware/isAuth');

const {
    body
} = require('express-validator');

const router = express.Router();

router.get('', CommentController.getAllComments);

checkData = [
    body('commentaire').isLength({
        min: 5,
    }).withMessage("comment not found !!! ")
]
router.post('', isAuth, checkData, CommentController.storeComment);
router.put('/:id', isAuth, checkData, CommentController.updateComment);
router.get('/:id', CommentController.showOneComment)
router.delete('/:id', isAuth, CommentController.deleteComment)
router.patch('/:id', isAuth, checkData, CommentController.patchComment)

module.exports = router;