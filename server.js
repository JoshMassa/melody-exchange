// dependencies
const express = require("express");
const session = require("express-session");
const path = require("path");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers")

// sequelize and SequelizeStore dependencies
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// needs descriptive comment
const hbs = exphbs.create({helpers});

// create session object for user auth
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// set handlebars as the templating engine
app.engine('handlebars', hbs.engine);
app.set("view engine", "handlebars");

// middleware to parse json post/put requests so they are available in the req.body
app.use(express.json());

// middleware to parse incoming request bodies in url encoded format commonly sent by HTML forms when data is submitted
app.use(express.urlencoded({ extended: true }));

// middleware to look for static files in the public folder
app.use(express.static(path.join(__dirname, "public")));

// look in the controllers folder for routes
app.use(routes);

// starts the server and syncs the sequelize database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
});