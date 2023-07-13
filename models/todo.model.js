'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Todo extends Model {
        static getTodoByUsername(username) {
            return this.findOne({where: {username}});
        }

        toJSON() {
            return {...this.get()};
        }
    }

    Todo.init({
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        sequelize,
        modelName: 'Todo',
        timestamps: true,
    });

    return Todo;
}
