if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const db = require("../models");
const File = db.files;
const User = db.users;

const bcrypt = require("bcryptjs");
const faker = require("faker");

const crypto = require("../helpers/crypto");
const buffer_txt = require("../buffers/txt.json");
const buffer_pdf = require("../buffers/pdf.json");
const buffer_mp3 = require("../buffers/mp3.json");
const buffer_exe = require("../buffers/exe.json");
const buffer_docx = require("../buffers/docx.json");

const run = async () => {

  await User.create({
    username: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("11111A", 8),
    role: 1
  }).then((user) => {
    console.log("Created user: " + JSON.stringify(user, null, 4));
    return user;
  })
    .catch((err) => {
      console.log("Error while creating user: ", err);
    });


  for (let i = 2; i < 4; i++) {
    const name = faker.name.findName();
    const email = (name + '@email.com').split(' ').join('');

    await User.create({
      username: name,
      email: email.toLowerCase(),
      password: bcrypt.hashSync("11111U", 8),
      role: 0
    }).then((user) => {
      console.log("Created user: " + JSON.stringify(user, null, 4));
      return user;
    })
      .catch((err) => {
        console.log("Error while creating user: ", err);
      });

    const plain_txt = Buffer.from(buffer_txt);
    const encrypted_txt = crypto.encrypt(plain_txt);

    await File.create({
      type: 'text/plain',
      name: 'Code_js.txt',
      size: '1.9 kB',
      data: encrypted_txt,
      userId: i
    })
      .then(file => {
        file.data = undefined;
        console.log("Created file: " + JSON.stringify(file, null, 4));
      })
      .catch((err) => {
        console.log("Error while creating file: ", err);
      });

    const plain_pdf = Buffer.from(buffer_pdf);
    const encrypted_pdf = crypto.encrypt(plain_pdf);

    await File.create({
      type: 'application/pdf',
      name: 'cheatsheet-emmet.pdf',
      size: '262.38 kB',
      data: encrypted_pdf,
      userId: i
    })
      .then(file => {
        file.data = undefined;
        console.log("Created file: " + JSON.stringify(file, null, 4));
      })
      .catch((err) => {
        console.log("Error while creating file: ", err);
      });

    const plain_mp3 = Buffer.from(buffer_mp3);
    const encrypted_mp3 = crypto.encrypt(plain_mp3);

    await File.create({
      type: 'audio/mpeg',
      name: 'Saksofon.mp3',
      size: '515.26 kB',
      data: encrypted_mp3,
      userId: i
    })
      .then(file => {
        file.data = undefined;
        console.log("Created file: " + JSON.stringify(file, null, 4));
      })
      .catch((err) => {
        console.log("Error while creating file: ", err);
      });

    const plain_exe = Buffer.from(buffer_exe);
    const encrypted_exe = crypto.encrypt(plain_exe);

    await File.create({
      type: 'application/x-msdownload',
      name: 'flux-setup.exe',
      size: '837.42 kB',
      data: encrypted_exe,
      userId: i
    })
      .then(file => {
        file.data = undefined;
        console.log("Created file: " + JSON.stringify(file, null, 4));
      })
      .catch((err) => {
        console.log("Error while creating file: ", err);
      });

    const plain_docx = Buffer.from(buffer_docx);
    const encrypted_docx = crypto.encrypt(plain_docx);

    await File.create({
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      name: 'Phpstorm.docx',
      size: '15.72 kB',
      data: encrypted_docx,
      userId: i
    })
      .then(file => {
        file.data = undefined;
        console.log("Created file: " + JSON.stringify(file, null, 4));
      })
      .catch((err) => {
        console.log("Error while creating file: ", err);
      });
  }
};

db.sequelize.sync({force: true}).then(() => {
  console.log("Drop and re-sync db.");
  run();
});


