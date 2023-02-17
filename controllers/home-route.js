const { Post, User, Comment } = require("../models");
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
//This is the route for the dashboard
router.get("/dashboard", async (req, res) => {
  try {
    if (!req.session.isLoggedIn) {
      res.redirect("/login");
      return;
    }
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//check other alternative /post/:id
router.get("/singlePost/:id", async (req, res) => {
  //console.log("req.params.id",req.params.id)
  try {
    const postData = await Post.findByPk(req.params.id, {
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
        {
          model: Comment,
          attributes: ["commentContent", "commentDate"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    const commentsData = await Comment.findAll({
      where: {
        postId: post.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    console.log("post=", post);

    const comments = commentsData.map((comment) =>
      comment.get({ plain: true })
    );
    console.log(comments);
    res.render("singlePost", {
      post,
      comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/managePost/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {});
    const post = postData.get({ plain: true });
    console.log("post=", post);
    res.render("managePost", {
      post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/comment/:id", async (req, res) => {
  //console.log("req.params.id",req.params.id)
  try {
    if (!req.session.isLoggedIn) {
      res.redirect("/login");
      return;
    }
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log("post=", post);
    res.render("addComment", {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//this is for the login page
router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login", { message: req.query.message });
});
//this is the route for logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login?message=logged out");
  });
});

//this is for the sign up page
router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup", { message: req.query.message });
});

// displays the profile page
router.get("/profile", async (req, res) => {
  res.render("profile");
});

// displays the create post page
router.get("/create_post", async (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("create_post");
});

// create a post route
router.post("/create_post", async (req, res) => {
  try {
    if (!req.session.isLoggedIn) {
      res.redirect("/login");
      return;
    }
    const postData = await Post.create({
      ...req.body,
      userId: req.session.userId,
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
    if (!req.session.isLoggedIn) {
      res.redirect("/login");
      return;
    }
    const postData = await Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/delete_post", async (req, res) => {
  try {
    if (!req.session.isLoggedIn) {
      res.redirect("/login");
      return;
    }
    const postData = await Post.destroy({
      where: {
        id: req.body.id,
      },
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.status(400).json(err);
  }
});
// this route is for posting=creating a comment
router.post("/comment", async (req, res) => {
  try {
    if (!req.session.isLoggedIn) {
      res.redirect("/login");
      return;
    }

    const commentData = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.redirect("/singlePost/" + commentData.postId);
  } catch (err) {
    res.status(400).json(err);
  }
});

/*//
router.get("/", async (req, res)=>{

});
*/
module.exports = router;
