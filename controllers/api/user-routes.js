const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all users
// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a single user
// GET /api/users/:id
router.get('/:id', (req, res) => {
    User.findOne({
        attibutes: { exclude: ['password'] },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'contents', 'created_at']
            },
            //Need to update after crating routes for comments
            // {
            //     model: Comment,
            //     attributes: ['id', '']
            // }
        ],
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.statust(404).json({message: 'No User found with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// add a user
// POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a user
// DESTROY /api/users/:id
router.delete('/:id', (req, res) =>{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this ID'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


module.exports = router;