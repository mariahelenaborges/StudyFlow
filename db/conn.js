const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");


const pastaBanco = path.join(__dirname, "..", "database");

if (!fs.existsSync(pastaBanco)) {
    fs.mkdirSync(pastaBanco, { recursive: true });
}
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(pastaBanco, "studyflow.sqlite")
});


module.exports = sequelize;
