const {paginate} = require("../helpers/pagination");
const {success, error} = require("../helpers/response");
const db = require('../models/index')

exports.list = async (request) => {
    try {
        const page = request.params.page,
            pageSize = request.params.pageSize

        db.Todo.findAll(paginate({}, {page, pageSize}))
            .then((result) => {
                return success(result)
            }).catch((err) => {
            return error(err)
        })
    } catch (err) {
        return error(err)
    }
}
