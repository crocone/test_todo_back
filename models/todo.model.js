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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        },
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
