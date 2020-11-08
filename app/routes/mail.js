const {sendmail} = require("../controllers/mail");
const {userSendMailValidator} = require("../validator");

module.exports = app => {

  app.post("/api/sendmail", userSendMailValidator, sendmail);

}






