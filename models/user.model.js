'use strict';
const {Model} = require('sequelize'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto')
const {validation} = require("../helpers/response");
const db = require("./index");

module.exports = (sequelize, DataTypes) => {

    class User extends Model {
        static getUserByEmail(email) {
            return this.findOne({where: {email}});
        }

        static getUserByUsername(username) {
            return this.findOne({where: {username}});
        }

        static async getOrCreateUser(username, email) {
            return new Promise(async (resolve, reject) => {
                if (!username && !email) {
                    reject(validation('Укажите имя пользователя или Email'))
                    return;
                }
                let user;

                if (email) {
                    user = await this.getUserByEmail(email)
                }
                if (!user) {
                    user = await this.getUserByUsername(username)
                }
                if (!user) {
                    const newUser = new this();
                    newUser.username = username ?? crypto.randomBytes(12).toString('hex')
                    newUser.email = email ?? `${newUser.username}@example.com`;
                    newUser.password_hash = bcrypt.hashSync(crypto.randomBytes(6).toString('hex'), 8);
                    newUser.save().then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject(err.message);
                    });
                }
                resolve(user)
            })

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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
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
