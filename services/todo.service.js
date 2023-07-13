const {paginate} = require("../helpers/pagination");
const {success, error, validation} = require("../helpers/response");
const db = require('../models/index')
const {request} = require("express");

exports.list = (request) => {
    return new Promise((resolve, reject) => {
        const page = request.params.page ?? 1,
            pageSize = request.params.pageSize ?? 10
        db.Todo.findAll(paginate({}, {page, pageSize}))
            .then((result) => {
                resolve(success(result))
            }).catch((err) => {
            reject(error(err.message))
        })
    })
}


exports.create = async (request) => {
    return new Promise(async (resolve, reject) => {
        const username = request.body.username ?? null,
            email = request.body.email ?? null,
            description = request.body.description
        db.User.getOrCreateUser(username, email).then((user) => {
            const todoData = {
                description,
                userId: user.id,
            }
            db.Todo.create(todoData).then(() => {
                resolve(success('Задача успешно создана'))
            }).catch(err => {
                reject(error(`Ошибка создания добавления задачи: ${err.message}`))
            })
        }).catch((err) => {
            reject(error(err.message))
        })

    })
}

exports.delete = (request) => {
    return new Promise((resolve, reject) => {
        const todoIdForDelete = request.body.id
        if (!todoIdForDelete) {
            reject(error('Переданы неверные параметры запроса'))
            return
        }
        db.Todo.destroy({where: {id: todoIdForDelete}}).then(() => {
            resolve(success('Задача удалена'))
        }).catch((err) => {
            reject(error(err.message))
        })
    })
}


exports.update = (request) => {
    return new Promise((resolve, reject) => {
        const todoIdForUpdate = request.body.id
        if (!todoIdForUpdate) {
            reject(error('Переданы неверные параметры запроса'))
            return
        }

        db.Todo.update(request.body, {where: {id: todoIdForUpdate}}).then(() => {
            resolve(success('Задача успешно обновлена'))
        }).catch((err) => {
            reject(error(err.message))
        })
    })
}
