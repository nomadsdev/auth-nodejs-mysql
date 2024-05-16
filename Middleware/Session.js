const session = require('express-session');

const sessionMiddleware = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: 'strict'
    }
});

module.exports = sessionMiddleware;