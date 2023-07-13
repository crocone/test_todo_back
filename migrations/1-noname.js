'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Todos", deps: [Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-07-13T05:17:45.508Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "Users",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "username": {
                        "type": Sequelize.STRING,
                        "field": "username",
                        "trim": true,
                        "unique": true,
                        "allowNull": false
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email",
                        "trim": true,
                        "allowNull": false
                    },
                    "password_hash": {
                        "type": Sequelize.STRING,
                        "field": "password_hash",
                        "private": true,
                        "trim": true,
                        "allowNull": false
                    },
                    "access_token": {
                        "type": Sequelize.STRING(512),
                        "field": "access_token",
                        "private": true
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "charset": "utf8",
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Todos",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description",
                        "allowNull": false
                    },
                    "status": {
                        "type": Sequelize.BOOLEAN,
                        "field": "status",
                        "defaultValue": false,
                        "allowNull": false
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "userId": {
                        "type": Sequelize.INTEGER,
                        "field": "userId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "Users",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "charset": "utf8",
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["Todos", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Users", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
