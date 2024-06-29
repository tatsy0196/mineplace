const express = require('express');

const router = express.Router();

const enchereCtrl = require('../controller/enchere');
const authCtrl = require('../controller/auth');

router.get('/', enchereCtrl.getAllEncheres);
router.get('/:id', enchereCtrl.getEnchere);
router.post('/:id/mise', authCtrl.verifyAuth, enchereCtrl.mise);


module.exports = router;