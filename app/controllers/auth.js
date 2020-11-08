const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const expressJwt = require('express-jwt'); // for authorization check

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: 0
  })
    .then(user => {
      if (!user) return res.send({error: "Some error occurred while creating the User"});
      user.password = undefined;
      res.json(user);
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};

exports.signin = (req, res) => {
  const {email, password} = req.body;
  User.findOne({
    where: {email}
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({error: "User Not found."});
      }
      let passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({
          error: 'Password dont match'
        });
      }
      const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
      const {id, username, email, role} = user;
      return res.json({token, user: {id, email, username, role}});
    });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
  userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile.id == req.auth.id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied'
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: 'Admin resourse! Access denied'
    });
  }
  next();
};

exports.isOwner = (req, res, next) => {
  let owner = req.file && req.auth && req.file.userId == req.profile.id;
  if (!owner) {
    return res.status(403).json({
      error: 'You do not have permission to access the file'
    });
  }
  next();
};







