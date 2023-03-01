const router = require('express').Router();

// Require all controllers
const apiRoutes = require('./apis');
const homeRoutes = require('./homeRoutes');

// Use all controllers
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;