"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).json({ todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        content: body.content,
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Todo added", todos });
});
router.get("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    const todo = todos.find((t) => t.id === todoId);
    res.status(200).json({
        data: {
            todo,
        },
    });
});
router.put("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const todoId = params.todoId;
    const content = body.content;
    const todoIndex = todos.findIndex((t) => t.id === todoId);
    if (todoIndex >= 0) {
        const updatedTodo = todos[todoIndex];
        updatedTodo.content = content;
        todos[todoIndex] = updatedTodo;
        return res.status(201).json({ message: "Updated todo", todos });
    }
    res.status(404).json({ message: "Could not find todo for this id" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const todoId = req.params.todoId;
    todos = todos.filter((todo) => todo.id !== todoId);
    res.status(200).json({
        message: "Todo deleted successfully.",
        todos,
    });
});
exports.default = router;
