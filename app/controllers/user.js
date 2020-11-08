const db = require("../models");
const User = db.users;
const pagination = require("../helpers/pagination");
const Op = db.Sequelize.Op;

exports.userById = (req, res, next, id) => {
  User.findByPk(id, {
    attributes: ["id", "username", "email", "role"]
  })
    .then(user => {
      if (!user) return res.status(400).json({error: 'User not found'});
      req.profile = user;
      next();
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
}

exports.read = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile);
};

exports.list = (req, res) => {
  const {username, page, size,} = req.query;

  const {limit, offset} = pagination.getPagination(page, size);

  let options = {
    attributes: ['id', 'username', 'email', 'createdAt'],
    order: [['id', 'DESC']],
    where:
      {role: 0},
    limit,
    offset
  };

  if (username) {
    options.where = {
      role: 0,
      username: {[Op.like]: `%${username}%`}
    };
  }

  return User.findAndCountAll(options)
    .then(data => {
      const response = pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users for admin"
      });
    });
};

exports.deleteUser = (req, res) => {

  User.destroy({
    where: {id: req.params.id}
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.status(500).send({
          message: `Cannot delete user with id=${req.params.id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting user"
      });
    });
}


















