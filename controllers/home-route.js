const { Post, User } = require("../models");
//const witAuth=require("../utils/auth");
const router = require("express").Router();

//router for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("home", {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//this is for the login page
router.get("/login", async (req, res) => {
  /*if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }*/
  res.render("login", { message: req.query.message });
});

//this is for the sign up page
router.get("/signup", async (req, res) => {
  res.render("signup", { message: req.query.message });
});

/*//
router.get("/", async (req, res)=>{

});
*/
module.exports = router;
