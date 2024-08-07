/**
 * Created by CTT VNPAY
 */
let express = require('express');
let router = express.Router();
const paymentController = require('../controllers/PaymentController');

router.get('/', paymentController.showOrderList);
router.get('/create_payment_url', paymentController.showOrder);
router.get('/querydr', paymentController.showQuerydr);
router.get('/refund', paymentController.showRefund);
router.post('/create_payment_url', paymentController.createPaymentUrl);
router.get('/vnpay_return', paymentController.showVnpayReturn);
router.get('/vnpay_ipn', paymentController.vnpayIpn);
router.post('/querydr', paymentController.querydr);
router.post('/refund', paymentController.refund);

module.exports = router;
