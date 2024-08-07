const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../services/JwtService');
const jwt = require('jsonwebtoken'); // Thêm dòng này
const cookieParser = require('cookie-parser'); // Thêm dòng này

const jwtDecode = require('jwt-decode');

class AuthController {
    // POST /register
    register(req, res, next) {
        const { email, username, password } = req.body;
        User.exists({ email })
            .then((exists) => {
                if (exists) {
                    return res.redirect('/user/login');
                }
                const hash = bcrypt.hashSync(password, 10);
                const user = new User({ email, username, password: hash });
                return user.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }

    // POST /login
    login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email })
            .then((user) => {
                if (user) {
                    const access_token = generateAccessToken({ id: user.id, isAdmin: user.isAdmin });
                    const refresh_token = generateRefreshToken({ id: user.id, isAdmin: user.isAdmin });
                    if (bcrypt.compareSync(password, user.password)) {
                        // Lưu token vào cookie
                        res.cookie('access_token', access_token, { httpOnly: true });
                        res.cookie('refresh_token', refresh_token, { httpOnly: true });
                        res.json({ message: 'Login successfully', isLogin: true, isAdmin: user.isAdmin });
                    } else {
                        res.json({ message: 'Wrong password', isLogin: false });
                    }
                } else {
                    res.json({ message: 'User does not exist', isLogin: false });
                }
            })
            .catch(next);
    }

    // GET /login or /register
    loginForm(req, res, next) {
        res.render('signInUp', { layout: false });
    }

    // POST /logout
    logout(req, res, next) {
        try {
            // Xóa token từ cookie
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chính
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    // GET /check-login
    checkLoginStatus(req, res, next) {
        const access_token = req.cookies.access_token;
        // Kiểm tra xem cookies có tồn tại không
        if (!access_token) {
            res.json({ isLoggedIn: false });
            return;
        }
        // Kiểm tra xem cookie access_token có tồn tại không
        jwt.verify(access_token, process.env.ACCESS_TOKEN, function (err, decoded) {
            if (err) {
                console.error('Error decoding JWT:', err);
            } else {
                req.user = decoded;
                // Sử dụng id từ decoded để tìm kiếm người dùng trong model user
                User.findOne({ _id: decoded.id })
                    .then((user) => {
                        if (user) {
                            // Thực hiện các thao tác tiếp theo với người dùng đã tìm thấy
                            if (!access_token) {
                                res.json({ isLoggedIn: false, user: user });
                                return; // Dừng hàm và trả về kết quả
                            } else {
                                res.json({ isLoggedIn: true, user: user });
                            }
                        } else {
                            console.log('User not found');
                        }
                    })
                    .catch((err) => {
                        console.error('Error finding user:', err);
                    });
            }
        });
    }
}

module.exports = new AuthController();
