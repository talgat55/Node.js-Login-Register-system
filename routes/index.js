 module.exports = ensureAuthenticated,
     function(req, res) {
         res.render('index', { title: 'Express' });
     };

 function ensureAuthenticated(req, res, next) {
     if (req.isAuthenticated()) {

         return next();

     }
     res.redirect("/users/login");
 }
 module.exports.all = function(id, callback) {

     res.locals.user = req.user || null;

 }