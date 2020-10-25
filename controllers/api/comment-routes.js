const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'user_id',
            'post_id',
            'comment_text'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['title', 'contents']
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

// post new comment
router.post('/', (req, res) => {
  // check the session
  // if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.body.user_id
        // use the id from the session
        // user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  // }
});

router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;