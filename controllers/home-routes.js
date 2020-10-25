const router = require('express').Router();

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    // console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'title',
            'contents',
            'user_id',
            'createdAt'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text']
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    }).then (dbPostData => {
        // console.log(dbPostData[0]);
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route if user isn't logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

module.exports = router;