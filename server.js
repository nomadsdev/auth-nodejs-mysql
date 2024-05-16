const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: 'strict'
    }
}));

const router = require('./router/main');
const Auth = require('./Api/Auth');

app.get('/', router.GetIndex);
app.get('/login', router.GetLogin);
app.get('/register', router.GetRegister);

app.post('/api/auth/login', Auth.Login);
app.post('/api/auth/register', Auth.Register);
app.get('/api/auth/logout', Auth.Logout)

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
})