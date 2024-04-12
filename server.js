// dependencies
const express = require("express");
const session = require("express-session");
const path = require("path");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const cloudinary = require('cloudinary').v2;
const paginateHelper = require('express-handlebars-paginate');



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const getAssetInfo = async (publicId) => {

  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
      // Get details about the asset
      const result = await cloudinary.api.resource(publicId, options);
      return result.colors;
      } catch (error) {
      console.error(error);
  }
};

const createImageTag = (publicId, ...colors) => {
    
  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
      { radius: 'max' },
      { effect: 'outline:10', color: effectColor },
      { background: backgroundColor },
    ],
  });

  return imageTag;
};

(async () => {

  // Set the image to upload
  const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

  // Upload the image
  const publicId = await uploadImage(imagePath);

  // Get the colors in the image
  const colors = await getAssetInfo(publicId);

  // Create an image tag, using two of the colors in a transformation
  const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);
})();

// sequelize and SequelizeStore dependencies
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// needs descriptive comment
const hbs = exphbs.create({helpers});
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);

// create session object for user auth
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1800000,
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