const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                res.render('404', {
                    layout: false,
                    message: 'Unauthorization',
                    status: 'ERROR',
                });
            }
            if (user.isAdmin) {
                next();
            } else {
                // res.redirect('/user/login');
                res.render('403', {
                    layout: false,
                    user,
                    message: 'Unauthorization',
                    status: 'ERROR',
                });
            }
        });
    } else {
        res.redirect('/user/login');
    }
};

const authUserMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    const userName = req.params.name;

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                // return res.status(404).json({ message: 'Unauthorization', status: 'ERROR' });
                res.redirect('/user/login');
            }
            if (user.isAdmin || user.name === userName) {
                next();
            } else {
                res.redirect('/user/login');
            }
        });
    } else {
        res.redirect('/user/login');
    }
};

// phương thức middleware authenticateToken để xác thực access token.
// Sau đó, trong xử lý endpoint, có thể truy cập thông tin người dùng từ req.user
// và sử dụng nó trong xử lý.
const authenticateToken = (req, res, next) => {
    const access_token = req.cookies.access_token;
    // Kiểm tra xem cookies có tồn tại không. Nếu tồn tại thì thực hiện xác thực token
    if (!access_token) {
        // res.json({ isLoggedIn: false });
        req.user = null;
        // return;
        next();
    } else {
        jwt.verify(access_token, process.env.ACCESS_TOKEN, function (err, user) {
            if (err) {
                console.error('Error decoding JWT:', err);
                res.render('403', { layout: false });
            } else {
                req.user = user;
                next();
            }
        });
    }
};

module.exports = { authMiddleware, authUserMiddleware, authenticateToken };
