const express = require('express');
const app = express();
const port = 4000;

const tasks = {};

app.use(express.static('build'));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Todo app is running!');
});

// Get all tasks
app.get('/tasks', (req, res) => {    
    res.send(tasks);
});

// Create a task
app.post('/tasks', (req, res) => {
    const requestBody = req.body;
    tasks[requestBody.task_id] = {
        taskName: requestBody.task_name,
        status: "undone"
    };

    res.send(tasks[requestBody.task_id]);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const task_id = req.params.id;
    delete tasks[task_id];
    res.send({});
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
  console.log('GET    ---   /tasks');
  console.log('POST   ---   /tasks');
  console.log('DELETE ---   /tasks');
});
