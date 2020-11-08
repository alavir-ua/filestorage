const stream = require('stream');
const db = require('../models/index');
const File = db.files;
const pagination = require("../helpers/pagination");
const crypto = require("../helpers/crypto");
const Op = db.Sequelize.Op;
const slugify = require('slugify');
const fileSize = require('filesize');

exports.fileById = (req, res, next, id) => {
  File.findByPk(id, {
    attributes: ["id", "type", "name", "userId"]
  })
    .then(file => {
      if (!file) return res.status(400).json({error: 'File not found'});
      req.file = file;
      next();
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
}

exports.uploadFile = async (req, res) => {
  const plain = Buffer.from(req.file.buffer);
  const encrypted = crypto.encrypt(plain);
  const filesize = fileSize(req.file.size, {base: 10});
  const filename = slugify(req.file.originalname, {
    replacement: '_',
    remove: undefined,
    lower: false,
    locale: 'en'
  });

  File.create({
    type: req.file.mimetype,
    name: filename,
    size: filesize,
    data: encrypted,
    userId: req.profile.id
  })
    .then(() => {
      res.json({message: 'File uploaded successfully! -> filename = ' + req.file.originalname});
    })
    .catch(err => {
      res.status(500).json({message: err.message});
    });
}

exports.listAllFiles = (req, res) => {
  const {name, page, size} = req.query;

  const {limit, offset} = pagination.getPagination(page, size);

  let options = {
    attributes: ['id', 'name', 'size', 'createdAt'],
    order: [['id', 'DESC']],
    where: {userId: req.profile.id},
    limit,
    offset
  };

  if(name) {
    options.where = {
      userId: req.profile.id,
      name: {[Op.like]: `%${name}%`}
    };
  }

  return File.findAndCountAll(options)
    .then(data => {
      const response = pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving files info"
      });
    });
};

exports.downloadFile = (req, res) => {

  File.findByPk(req.file.id)
    .then(file => {
      const decrypted = crypto.decrypt(file.data);
      const fileContents = Buffer.from(decrypted);
      const readStream = new stream.PassThrough();
      readStream.end(fileContents);
      res.set('Content-disposition', 'attachment; filename=' + file.name);
      res.set('Content-Type', file.type);
      readStream.pipe(res);
    })
    .catch(err => {
      res.status(404).send({message: err.message});
    });
}

exports.deleteFile = (req, res) => {

  File.destroy({
    where: {id: req.file.id}
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "File was deleted successfully!"
        });
      } else {
        res.status(500).send({
          message: `Cannot delete file with id=${req.params.id}. Maybe File was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while deleting file"
      });
    });
}









