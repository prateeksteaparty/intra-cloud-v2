const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
const registerRouter = require('./register');

const dashboardRoutes = require('./dashboard');


router.use('/', loginRouter);
router.use('/', registerRouter);
router.use('/', dashboardRoutes);



module.exports = router;
