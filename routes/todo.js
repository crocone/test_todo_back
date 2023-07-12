const express = require('express');
const router = express.Router();
const todoService = require('../services/todo.service');

router.get('/', function (req, res) {
    const todoList = todoService.list(req)
    res.status(todoList.status).json(todoList);
});

module.exports = router;
