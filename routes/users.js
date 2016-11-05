module.exports.index = function(req, res) {
    res.render('index', {
        title: 'Members'
    });
};
module.exports.register = function(req, res) {
    res.render('users/register', {
        title: 'Register'
    });
};
module.exports.login = function(req, res) {
    res.render('users/login', {
        title: 'Login'
    });
};