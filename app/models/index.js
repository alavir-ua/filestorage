const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: 0,

  pool: {
    max: parseInt(process.env.POOL_MAX),
    min: parseInt(process.env.POOL_MIN),
    acquire: parseInt(process.env.POOL_ACQUIRE),
    idle: parseInt(process.env.POOL_IDLE)
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.files = require("./file.js")(sequelize, Sequelize);

db.users.hasMany(db.files, { as: "files" });

db.files.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
  onDelete: 'cascade',
  hooks: true
});

module.exports = db;





