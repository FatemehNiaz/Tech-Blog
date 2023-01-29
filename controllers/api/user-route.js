const router = require("express").Router();
const { User } = require("../../models");

// post route for logging in
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.usernameField },
    });
    if (!userData) {
      res.redirect("/login?message=incorrect username");
    }

    const validPassword = await userData.checkPassword(req.body.passwordField);

    if (validPassword == false) {
      res.redirect("/login?message=incorrect password");
    } else {
      res.redirect("/profile");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// post route for signing up
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    res.redirect("/profile");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
