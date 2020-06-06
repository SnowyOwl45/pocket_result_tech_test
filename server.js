const express = require('express')
const next = require('next')
const path = require('path')
const url = require('url');
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./pool.js')
const db = require('./queries')

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;


const nextApp = next({ dir: '.', dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(cors());
    server.use('/static', express.static(path.join(__dirname, 'static'), {
        maxAge: dev ? '0' : '365d'
    }));

    //TODOLIST
    server.get('/api/todolist', db.getTodoList)
    server.post('/api/todolist', db.insertTodoList)
    server.delete('/api/todolist/:id', db.deleteTodoList)

    //TODO
    server.get('/api/todos', db.getTodos)
    server.post('/api/todos', db.insertTodo)
    server.put('/api/todos/:id', db.updateTodo)
    server.delete('/api/todos/:id', db.deleteTodo)

    server.get('/api/datauser', db.getDataUser)

    // Default catch-all renders Next app
    server.get('*', (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        nextHandler(req, res, parsedUrl);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Listening on http://localhost:${port}`);
    });
})