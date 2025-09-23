const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

let port = 8090;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Data store
let tasks = [
  { id: uuidv4(), username: "Aman", content: "Buy groceries" },
  { id: uuidv4(), username: "Ravi", content: "Complete project" },
  { id: uuidv4(), username: "Sara", content: "Go to gym" },
];

// Routes
app.get("/tasks", (req, res) => {
  res.render("index.ejs", { tasks });
});

app.get("/tasks/new", (req, res) => {
  res.render("lindex.ejs");
});

app.post("/tasks", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  tasks.push({ id, username, content });
  res.redirect("/tasks");
});

app.get("/tasks/:id", (req, res) => {
  let { id } = req.params;
  let task = tasks.find((t) => t.id === id);
  res.render("show.ejs", { task });
});

app.get("/tasks/:id/edit", (req, res) => {
  let { id } = req.params;
  let task = tasks.find((t) => t.id === id);
  res.render("edit.ejs", { task });
});

app.patch("/tasks/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let task = tasks.find((t) => t.id === id);
  task.content = newContent;
  res.redirect("/tasks");
});

app.delete("/tasks/:id", (req, res) => {
  let { id } = req.params;
  tasks = tasks.filter((t) => t.id !== id);
  res.redirect("/tasks");
});

// Start server
app.listen(port, () => {
  console.log(`✅ App is running on http://localhost:${port}`);
});
