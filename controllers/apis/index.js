const router = require('express').Router();

// Require all routes
const profileRoutes = require('./profileRoutes');
const userRoutes = require('./userRoutes');

// Use all routes
router.use('/profiles', profileRoutes);
router.use('/users', userRoutes);

module.exports = router;
