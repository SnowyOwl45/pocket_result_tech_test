const { pool } = require('./pool.js')

const getTodoList = (request, response) => {
    const email = request.query.email;
    pool.query('SELECT * FROM todo_list WHERE owner = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const insertTodoList = (request, response) => {
    const { owner, name } = request.body
    pool.query('INSERT INTO todo_list (owner,name) VALUES ($1, $2) RETURNING *', [owner, name], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).json(result.rows[0])
    })
}

const deleteTodoList = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM todo_list WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const getTodos = (request, response) => {
    const { email } = request.body;
    pool.query('SELECT * FROM todo WHERE id = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const insertTodo = (request, response) => {
    const { content, status, id_todo_list } = request.body
    pool.query('INSERT INTO todo (content, status, id_todo_list) VALUES ($1, $2, $3) RETURNING *', [content, status, id_todo_list], (error, result) => {
        if (error) {
            throw error
        }
        response.status(201).json(result.rows[0])
    })
}

const updateTodo = (request, response) => {
    const id = parseInt(request.params.id)
    const { content, status } = request.body;
    var q;
    var valueArray = []
    if(content) {
        q = 'UPDATE todo SET content = $1 WHERE id_todo = $2';
        valueArray = [content, id];
    }
    if(status) {
        q = 'UPDATE todo SET status = $1 WHERE id_todo = $2';
        valueArray = [status, id];
    }
    if(content || status){
        pool.query(q, valueArray,
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`todo modified with ID: ${id}`)
            }
        )
    }
}

const deleteTodo = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM todo WHERE id_todo = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`todo deleted with ID: ${id}`)
    })
}

const getDataUser = (request, response) => {
    const email = request.query.email;
    pool.query('SELECT * FROM todo_list FULL JOIN todo ON todo.id_todo_list=todo_list.id_todo_list WHERE owner = $1', [email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getTodoList,
    insertTodoList,
    deleteTodoList,
    getTodos,
    insertTodo,
    updateTodo,
    deleteTodo,
    getDataUser
}