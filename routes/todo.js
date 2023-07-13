const express = require('express');
const router = express.Router();
const todoService = require('../services/todo.service');

router.get('/', async (req, res) => {
    todoService.list(req).then((todoList) => {
        res.status(todoList.code).json(todoList)
    }).catch((error) => {
        res.status(error.code).json(error)
    })
});

router.post('/', (req, res) => {
    todoService.create(req).then((result) => {
        res.status(result.code).json(result)
    }).catch((error) => {
        res.status(error.code).json(error)
    })
})

router.put('/', (req, res) => {
    todoService.update(req).then((result) => {
        res.status(result.code).json(result)
    }).catch((error) => {
        res.status(error.code).json(error)
    })
})

router.delete('/', (req, res) => {
    todoService.delete(req).then((result) => {
        res.status(result.code).json(result)
    }).catch((error) => {
        res.status(error.code).json(error)
    })
})

module.exports = router;
