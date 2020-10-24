const router = require('express').Router();

// const apiRoutes = require ('./api');
const homeRoutes = require('./home-routes.js');

// API routes, this is the 2nd tier of 
// functionality to the web application beyond
// the home page and the login page
// router.use('/api', apiRoutes);

// This is the routes to the home page and login page / data
// these serve as the primary 'portals' or entry points into
// the applicatin for users
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end()
});

module.exports = router;