const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../src/index');
const User = require('../src/models/User');

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('Test User API', () => {
    before(async () => {
        // Clear the User collection before the tests start
        await User.deleteMany({});
    });

    after((done) => {
        // Close the server connection after all tests are finished
        server.close(() => {
            done();
        });
    });

    describe('Create a new User', () => {
        // Test case for registering a new user
        it('should register a new user', (done) => {
            chai.request(app)
                .post('/user/register')
                .send({ email: 'test@example.com', username: 'test', password: 'password' })
                .redirects(1) // Allow one redirect
                .end((err, res) => {
                    res.should.have.status(200);
                    res.redirects.should.have.lengthOf(1);
                    console.log('Actual redirect URL:', res.redirects[0]);
                    const redirectUrl = new URL(res.redirects[0]);
                    const expectedPath = '/';
                    redirectUrl.pathname.should.equal(expectedPath);
                    done();
                });
        });
    });

    describe('Check redirect if email is already registered', () => {
        // Test case for redirecting to login if email is already registered
        it('should redirect to login if email is already registered', (done) => {
            const existingUser = new User({
                email: 'existing@example.com',
                username: 'existinguser',
                password: 'existingpassword',
            });

            existingUser
                .save()
                .then(() => {
                    const userData = {
                        email: 'existing@example.com',
                        username: 'existinguser',
                        password: 'existingpassword',
                    };

                    chai.request(app)
                        .post('/user/register')
                        .send(userData)
                        .redirects(1) // Allow one redirect
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.redirects.should.have.lengthOf(1);
                            console.log('Actual redirect URL:', res.redirects[0]);
                            const redirectUrl = new URL(res.redirects[0]);
                            const expectedPath = '/user/login';
                            redirectUrl.pathname.should.equal(expectedPath);
                            done();
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
    });

    describe('Get a User', () => {
        // Test case for get a user
        describe('Get an existing user', () => {
            it('should return the user when a valid username is provided', (done) => {
                const testUser = new User({
                    username: 'getuser',
                    email: 'getuser@example.com',
                    password: 'password',
                });

                testUser
                    .save()
                    .then(() => {
                        const username = testUser.username;
                        chai.request(app)
                            .get(`/api/user/get-user/${username}`)
                            .end((err, res) => {
                                res.should.have.status(200);
                                expect(res.body.user[0]).to.be.an('object');
                                expect(res.body.user[0].username).to.equal('getuser');
                                expect(res.body.user[0].email).to.equal('getuser@example.com');
                                done();
                            });
                    })
                    .catch((error) => {
                        done(error);
                    });
            });
        });

        describe('Get a non-existing user', () => {
            it('should return a "User not found" message when an invalid username is provided', (done) => {
                chai.request(app)
                    .get('/api/user/nonexistinguser')
                    .end((err, res) => {
                        res.should.have.status(404);
                        // res.body.message.should.equal('User not found');
                        done();
                    });
            });
        });
    });

    describe('Update User', () => {
        // Test case for updating a user
        it('should update the user and send a success message', (done) => {
            const testUpdateUser = new User({
                email: 'testupdate@example.com',
                username: 'testupdate',
                password: 'testpassword',
            });

            testUpdateUser
                .save()
                .then((user) => {
                    const userId = user._id;
                    const updateData = { username: 'updateduser' };

                    chai.request(app)
                        .patch(`/api/user/update-user/${userId}`)
                        .send(updateData)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
    });

    describe('Delete User', () => {
        // Test case for deleting a user
        it('should delete the user and send a success message', (done) => {
            const testDelUser = new User({
                email: 'testdelete@example.com',
                username: 'testdelete',
                password: 'testpassword',
            });

            testDelUser
                .save()
                .then((user) => {
                    const userId = user._id;

                    chai.request(app)
                        .delete(`/api/user/delete-user/${userId}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                })
                .catch((error) => {
                    done(error);
                });
        });
    });

    describe('Login API', () => {
        // Test cases for login functionality
        it('should return "Login successfully" and set cookies when valid credentials are provided', (done) => {
            chai.request(app)
                .post('/user/login')
                .send({ email: 'test@example.com', password: 'password' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Login successfully');
                    expect(res).to.have.cookie('access_token');
                    expect(res).to.have.cookie('refresh_token');
                    done();
                });
        });

        it('should return "Wrong password" when invalid password is provided', (done) => {
            chai.request(app)
                .post('/user/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Wrong password');
                    done();
                });
        });

        it('should return "User does not exist" when invalid email is provided', (done) => {
            chai.request(app)
                .post('/user/login')
                .send({ email: 'invalid@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('User does not exist');
                    done();
                });
        });
    });
});
