const SequelizeAuto = require("sequelize-auto")
const config = require("./sq.config.js")


const auto = new SequelizeAuto(config.dbname, config.user, config.pass, config.autoOptions);

auto.run().then(data => {
    const tableNames = Object.keys(data.tables);
    console.log(tableNames);
});
