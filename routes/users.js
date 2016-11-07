var User = require("../models/user");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                console.log("Unknowт User");
                return done(null, false, { message: "Unknowт User" })

            }
            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                }
            })
        })

    }
));
module.exports.loginpost = passport.authenticate("local", { failureRdirect: "/users/login", failureFlash: " invalid username or password" }),
    function(req, res) {

        console.log("authentication Successful");
        req.flash("success", "You are logged in");
        res.redirect("/");

    };
module.exports.registerpost = function(req, res) {
    req.body.name;
    req.body.email;
    req.body.username;
    req.body.password;
    req.body.password2;

    if (req.files.profileimage) {
        console.log("upload image...");
        // info
        var profileImageOriginalName = req.files.profileimage.originalname;
        var profileImageName = req.files.profileimage.name;
        var profileImageMime = req.files.profileimage.mimetype;
        var profileImagePath = req.files.profileimage.path;
        var profileImageExt = req.files.profileimage.extension;
        var profileImageSize = req.files.profileimage.size;

    } else {

        var profileImageName = "noimage.png";
    }
    req.checkBody("name", "Name field ir required").noEmpty();
    req.checkBody("email", "Email field ir required").noEmpty();
    req.checkBody("email", "Email field ir required").isEmail();
    req.checkBody("username", "Username field ir required").noEmpty();
    req.checkBody("password", "password field ir required").noEmpty();
    req.checkBody("password2", "passwords is dont´t match").equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render("register", {
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2
        });
    } else {

        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            profileimage: profileImageName
        });

        // Create User

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);

        });

        // Success message 
        req.flash("success", "you are now registed and may log in");
        res.location("/");
        res.redirect("/");
    }

};
module.exports.logout = function(req, res) {
    res.logout;
    req.flash("success", "you have logout");
    res.redirect("/users/login");
};