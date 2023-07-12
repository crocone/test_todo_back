'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    class User extends Model {
        static getUserByEmail(email) {
            return this.findOne({where: {email}});
        }

        toJSON() {
            const values = {...this.get()};
            delete values.password_hash;
            delete values.access_token;
            return values;
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            trim: true
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            validate: {
                len: [6, Infinity]
            },
            private: true
        },
        access_token: {
            type: DataTypes.STRING(512),
            private: true
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
    });

    User.associate = (models) => {
        User.hasMany(models.Todo, {as: 'todos', foreignKey: 'userId'});
    }
    return User;
}
