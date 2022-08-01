import { Router } from "express";

import { Todo } from "../models/todo";

type RequestBody = {
  content: string;
};

type ReqParams = {
  todoId: string;
};

let todos: Array<Todo> = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    content: body.content,
  };

  todos.push(newTodo);

  res.status(201).json({ message: "Todo added", todos });
});
router.get("/todo/:todoId", (req, res, next) => {
  const params = req.params as ReqParams;
  
  const todoId:string = params.todoId;

  const todo = todos.find((t) => t.id === todoId);

  res.status(200).json({
    data: {
      todo,
    },
  });
});
router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as ReqParams;
  const body = req.body as RequestBody;
  const todoId:string = params.todoId;
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

export default router;
