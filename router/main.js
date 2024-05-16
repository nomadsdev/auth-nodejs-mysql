function GetIndex(req, res) {
    res.render('Index', { title: 'Home', LogIn: req.session.loggedin, username: req.session.username })
};
function GetLogin(req, res) {
    if (req.session.loggedin) {
        res.redirect('/');
    } else {
        res.render('Login', { title: 'Sign In' });
    }
};
function GetRegister(req, res) {
    if (req.session.loggedin) {
        res.redirect('/');
    } else {
        res.render('Register', { title: 'Sign Up' });
    }
}

module.exports = {
    GetIndex,
    GetLogin,
    GetRegister
}