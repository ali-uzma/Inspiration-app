const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const blog = require("./models/blog");
const user = require("./models/user");
const middleware = require("./middleware");
const flash = require('connect-flash');
const port = process.env.PORT || 3000;




app = express();
app.use(require("express-session")({
    secret: "im the best",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
const url = process.env.dataBaseURL || "mongodb://localhost/blog1";
mongoose.connect(url, { useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology:true }).then(()=>{
    console.log("connected");
}).catch((err)=>{
    throw err;
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));



passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.message = req.flash("message");
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();
});


app.get('/',(req,res,next) => {
    if(!req.isAuthenticated()){
        return next();
    }
    res.render("index2");
},function (req, res){
    res.render('index');
});


app.get("/stories",(req,res) => {

    blog.find({},(err,items) => {
        if(err){
            req.flash("message","Something went wrong! Please try again ... ");
            res.redirect("/");
        } else{
            !req.isAuthenticated() ? res.render("stories", {blogs:items}) : res.render("stories2", {blogs:items});
        }
    });
});



app.get("/new",middleware.isLoggedin, (req,res) => {
    res.render("enter");
});

//create route
app.post("/stories", (req,res) => {
    const id = mongoose.Types.ObjectId(req.user._id);
    req.body.blog.author = id;
    blog.create(req.body.blog, (err,newblog) => {
        if(err){
            req.flash("message","Something went wrong! Please try again ... ");
            res.redirect("/stories");
        }else{
            req.flash("success","Story added successfuly");
            res.redirect("/stories");
        }
    });
});

app.get("/stories/share", (req,res) => {
    res.render("new");

});
///handling user signup
app.post('/stories/share', (req, res, next) => {
    req.body.username = req.body.username.toLowerCase();
    next();
},(req,res) => {
    user.register(new user({username:req.body.username}), req.body.password, (err, user) => {
        if(err){
            ///add that username exists error
            req.flash('message', err.message);
            res.redirect("/stories/share")
        }
        passport.authenticate("local")(req,res, () => {
            req.flash('success', 'Welcome!');
            res.redirect("/");
        })
    });
});


app.get("/stories/:id", (req,res) => {
        
    blog.findById(req.params.id, (err,blog) => {

        if(err  || !blog){
            req.flash("message","Something went wrong! Please try again ... ");
            res.redirect("/stories");
        }else{
            user.findById(blog.author, (err,user) => {
                if(err){
                    req.flash("message","Something went wrong! Please try again ... ");
                    res.redirect("/stories");
                } else{
                    const items ={blog,user};
                    req.isAuthenticated() ? res.render("article2", {blog:items}) : res.render("article", {blog:items});
                }
            });
        }
    });
});


///login routes//////////
app.get("/login",(req,res) => {
    res.render("login");
});
//login logic
app.post("/login", (req, res, next) => {
    req.body.username = req.body.username.toLowerCase();
    next();
}, passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash: true
}),(req,res) => {
    res.redirect("back");
});


///logout route
app.get("/logout",(req,res) => {
    req.logout();
    req.flash('message', 'You Logged Out');
    res.redirect("/");
});


//Edit routes

app.get("/stories/:id/edit",middleware.checkBlogOwnership, (req,res) => {
        blog.findById(req.params.id, (err,blog) => {

            if(err || !blog){
                req.flash("message","Something went wrong! Please try again ... ")
                res.redirect("/stories")
            } else{
                res.render("edit", {blog:blog});
            }
        });

});

//update routes
app.put("/stories/:id",middleware.checkBlogOwnership, (req,res,next) => {
    blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err || !updatedBlog){
            req.flash("message","Something went wrong! Please try again ... ");
            res.redirect("/stories");
        }
        else{
            req.flash("message","Successfuly updated! ");
            res.redirect("/stories/"+req.params.id);
        }
    })
});

// delete route

app.delete("/stories/:id",middleware.checkBlogOwnership, (req,res) => {
    blog.findByIdAndRemove(req.params.id, err => {
        if(err){
            req.flash("message","Something went wrong! Please try again ... ");
            res.redirect("/stories");
        }
        else{
            req.flash("success","Your story is deleted successfuly! ");
            res.redirect("/stories");
        }
    });
});



app.listen(port,process.env.IP,() => {
    console.log("server is running");
});