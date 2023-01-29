const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const routes = require("./controllers");
const sequelize = require("./config/connections");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

/*const s={
  secret:"secret",
  cookie:{},
  resave:false,
  saveUninitialized:true,
  store:new SequelizeStore({
    db:sequelize
  })
};*/

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;
//app.use(session(s));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(PORT, () => {
  console.log("app is running on port " + PORT);
});
