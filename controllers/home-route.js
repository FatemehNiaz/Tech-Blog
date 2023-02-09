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
//check other alternative /post/:id
router.get("/singlePost/:id", async (req, res) => {
  console.log("req.params.id",req.params.id)
  try {
    const postData = await Post.findByPk(req.params.id,{
      // include: [
      //   User,
      //   {
      //     model: Comment,
      //     include: [User],
      //   },
      // ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log("post=",post)
    res.render("singlePost", {
      post,
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

// displays the profile page
router.get("/profile", async (req, res) => {
  res.render("profile");
});

// displays the create post page
router.get("/create_post", async (req, res) => {
  res.render("create_post");
});

// create a post route
router.post("/create_post", async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      userId: 4,
    });

    console.log(postData);

    res.redirect("/");
  } catch (err) {
    res.status(400).json(err);
  }
});

// displays the posts where you can select which one to delete
router.get("/manage_posts", async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });
  const posts = postData.map((post) => post.get({ plain: true }));

  res.render("manage_posts", {
    posts,
  });
});
// update a post 
router.post("/update_post", async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    res.redirect("/manage_posts");
  } catch (err) {
    res.status(400).json(err);
  }
});
// delete a post from the database
router.post("/delete_post", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.body.id,
      },
    });

    res.redirect("/manage_posts");
  } catch (err) {
    res.status(400).json(err);
  }
});


/*//
router.get("/", async (req, res)=>{

});
*/
module.exports = router;
