const express = require('express');
let router = express.Router();

router.use('/dev', require('./devRoutes'))
router.use('/user', require('./commonRoutes'))
router.use('/admin', require('./adminRoutes'))
router.use('/cluster', require('./clusterRoute'))
router.use('/country-lead', require('./countryLeadRoute.js'))
router.use('/cluster-lead', require('./clusterLeadRoutes'))
router.use('/manager', require('./managerRoutes'))
router.use('/bd', require('./bdRoutes'))

module.exports = router;