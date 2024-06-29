const express = require('express');

const router = express.Router();

const parcelleCtrl = require('../controller/parcelle');
const authCtrl = require('../controller/auth');

router.get('/', parcelleCtrl.getAllParcelles);
router.get('/my', authCtrl.verifyAuth, parcelleCtrl.getMyParcelles);
router.get('/:id', parcelleCtrl.getParcelle);
router.put('/:id/sell', authCtrl.verifyAuth, parcelleCtrl.sellParcelle);


module.exports = router;
