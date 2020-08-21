// all the middlewares are here

var blog = require("../models/blog");
var middlewareObj = {};
middlewareObj.isLoggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('message', 'Please Login to continue!');
    res.redirect("/login");
};

middlewareObj.checkBlogOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        blog.findById(req.params.id,function(err,blog){

            if(err || !blog){
                req.flash("message","Item not found ..");
                res.redirect("/stories");
            } else{
               // yes. is user authorized, own the blog?
            //    if (!blog) {
            //     req.flash("message", "Item not found.");
            //     return res.redirect("back");
            // }
                if(blog.author.equals(req.user._id)){
                    next();
                }else{
                    req.flash("message","Permission denied, you need authorization to change this blog ...");
                    res.redirect("/stories");
                }
            }
        });

    }else{
        req.flash("message", "You need to Login first!")
        res.redirect("/login");
    }
};

module.exports = middlewareObj;