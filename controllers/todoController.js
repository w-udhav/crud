const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/data.json");

//* Helper functions
//? Read data from data.json file
const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

//? Write data to data.json file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw error;
  }
};

//* Controller functions

//? Get all todos
exports.getAllTodos = (req, res) => {
  try {
    const todos = readData();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//? Create a todo
exports.createTodo = (req, res) => {
  try {
    const todos = readData();
    const lastUpdated = new Date().toISOString();
    const newTodo = { id: todos.length + 1, data: req.body.data, lastUpdated };
    todos.push(newTodo);
    writeData(todos);
    res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//? Update a todo
exports.updateTodo = (req, res) => {
  try {
    const todos = readData();
    const todoId = parseInt(req.params.id);
    const updateTodo = req.body;
    const index = todos.findIndex((todo) => todo.id === todoId);

    if (index !== -1) {
      const lastUpdated = new Date().toISOString();
      todos[index] = { ...todos[index], ...updateTodo, lastUpdated };
      writeData(todos);
      res.status(200).json({ message: "Todo updated successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//? Delete a todo
exports.deleteTodo = (req, res) => {
  try {
    const todos = readData();
    const todoId = parseInt(req.params.id);
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    if (updatedTodos.length < todos.length) {
      writeData(updatedTodos);
      res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
