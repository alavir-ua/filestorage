const {verifySignUp} = require("../middleware");
const {userSignupValidator} = require("../validator");
const {signup, signin} = require("../controllers/auth");

module.exports = app => {

  app.post("/api/signup", userSignupValidator,[verifySignUp.checkDuplicateUsernameOrEmail], signup);

  app.post("/api/signin", signin);
}


