const connectMysql = require('../Lib/mysql');
const bcrypt = require('bcrypt');

async function Register(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    connectMysql.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) throw err;
        res.redirect('/login');
    });
}
function Login(req, res) {
    const { username, password } = req.body;
    const SqlLogin = `SELECT * FROM users WHERE username = ?`;

    connectMysql.query(SqlLogin, [username], async (err, results) => {
        if (results.length > 0) {
            const comparison = await bcrypt.compare(password, results[0].password);
            if (comparison) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
        } else {
            res.send('Incorrect Username and/or Password!');
        }
    });
}
function Logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error occurred while logging out.');
        }
        res.redirect('/');
    });
}

module.exports = {
    Login,
    Register,
    Logout
}