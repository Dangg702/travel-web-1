const User = require('../models/User');
const { refreshTokenJwtService } = require('../services/JwtService');
const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();

class UserController {
    // GET /user/account/:id
    async getAccount(req, res, next) {
        const userId = req.params.id;
        const user = await User.findById(userId);
        res.render('account', { cssLink: '/css/account.css', user });
    }

    // GET /api/user/edit-form/:id
    async editForm(req, res, next) {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.render('edit-user', { layout: 'layouts/dashboard-layout', user });
        }
    }

    // PATCH /api/user/update-user/:id
    updateUser(req, res, next) {
        const userId = req.params.id;
        const updateData = req.body;
        User.findByIdAndUpdate(userId, updateData)
            .then((updateUser) => {
                const successMessage = 'User updated successfully';
                res.write(
                    '<script>alert("' +
                        successMessage +
                        '"); window.location.href="https://travel-web-ks0z.onrender.com/api/user/manage";</script>',
                );
                res.end();
                return;
            })
            .catch(next);
    }

    // DELETE /api/user/delete-user/:id
    deleteUser(req, res, next) {
        const userId = req.params.id;
        User.findByIdAndDelete(userId)
            .then(() => res.status(200).json({ message: 'User deleted successfully' }))
            .catch(next);
    }

    // GET /api/user/get-all
    getAllUsers(req, res, next) {
        User.find().then((allUsers) => {
            if (allUsers.length < 0) {
                return res.status(404).json({ message: 'No user' });
            }
            res.status(200).json({ message: 'Success', data: allUsers });
        });
    }

    // GET /api/user/get-user/:name
    getUser(req, res, next) {
        const userName = req.params.name;
        User.find({ name: { $regex: userName, $options: 'i' } })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                } else {
                    res.status(200).json({ message: 'Success', user });
                }
            })
            .catch(next);
    }

    // GET /api/user/manage
    userPage(req, res, next) {
        const userId = req.user.id;
        const user = User.findById(userId);
        res.render('user-management', { layout: 'layouts/dashboard-layout', user });
    }

    // GET /api/user/refresh-token ( generate a new access token )
    async refreshToken(req, res, next) {
        const token = req.headers.token.split(' ')[1];
        if (!token) {
            return res.status(404).json({ message: 'The token is required', status: 'ERROR' });
        }
        const response = await refreshTokenJwtService(token);
        res.status(200).json({ message: 'Success', status: 'OK', data: response });
    }
}

module.exports = new UserController();
