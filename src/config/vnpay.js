const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();

module.exports = {
    vnpay: {
        vnp_TmnCode: 'B9J82O5K',
        vnp_HashSecret: 'CYKEBWCVDUWVRNICDHGUWDGRNNVXZGBS',
        vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        vnp_ReturnUrl: 'https://travel-web-ks0z.onrender.com/api/payment/vnpay_return',
        vnp_Api: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
    },
};
