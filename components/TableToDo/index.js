import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewToDoForm from '../NewToDoForm';
import withWindowDimensions from '../withWindowDimensions';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const TableToDo = ({modifyContentData, modifyStatusData, deleteData, addData, todoList, userData, isSmallScreen}) => {
    const [data, setData] = useState([])
    const [isVisibleNewTodo, setIsVisibleNewTodo] = useState(false)
    const [idToModify, setIdToModify] = useState(0)
    const [todoContentToModify, setTodoContentToModify] = useState('')

    useEffect(() => {
        const dataToShow = userData.filter(todo => todo.name === todoList.name && todo.id_todo != null);
        setData(dataToShow);
    }, [userData, todoList]);

    const toggleStatus = async (todo) => {
        let hostUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        const axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
        var newStatus = todo.status === 'done' ? 'todo' : 'done';
        if(todo.id_todo && newStatus) {
            //modify in database
            await axios.put(`${hostUrl}/api/todos/${todo.id_todo}`, {"status": newStatus}, axiosConfig);
            //modify in local storage
            modifyStatusData(todo.id_todo, newStatus)
        }
    }

    const toggleModificationTodo = (id, content, e) => {
        e.stopPropagation();
        setIdToModify(id);
        setTodoContentToModify(content)
    }

    const modifyTodo = async (e) => {
        e.stopPropagation();
        let hostUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        const axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
        if(idToModify && todoContentToModify) {
            //modify content in database
            await axios.put(`${hostUrl}/api/todos/${idToModify}`, {"content": todoContentToModify}, axiosConfig);
            //modify content in local storage
            modifyContentData(idToModify, todoContentToModify)
        }
        setIdToModify(0)
        setTodoContentToModify('')
    }

    const deleteTodo = async (id, e) => {
        e.stopPropagation();
        let hostUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        const axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
        if(id) {
            //delete in database
            await axios.delete(`${hostUrl}/api/todos/${id}`, {"data": null}, axiosConfig);
            //delete in local storage
            deleteData(id)
        }
    }

    return (
        <div style={{width: isSmallScreen ? '80%' : '50%', marginLeft: isSmallScreen ? '10%' : '25%'}}>
            <h4 className="title">{todoList.name}</h4>
            {data.length === 0 && <div>
                Aucun todo pour le moment 
            </div>}
            <button onClick={() => setIsVisibleNewTodo(!isVisibleNewTodo)} className="validationButton">
                {isVisibleNewTodo ? "Masquer le bandeau" : "Nouveau todo"}
            </button>
            {isVisibleNewTodo && <NewToDoForm addData={addData} todolist={todoList}/> }
            {data.map((todo, index) => {
                var isModify = (idToModify === todo.id_todo);
                var contentToShow = todo.status === 'done' ? 
                    (<div style={{width: '100%', wordBreak: 'normal', overflowWrap: 'anywhere', cursor:'pointer'}} onClick={() => toggleStatus(todo)}>
                        <del>
                            {todo.content}
                        </del>
                    </div>) : 
                        (<div style={{width: '100%', wordBreak: 'normal', overflowWrap: 'anywhere', cursor:'pointer'}} onClick={() => toggleStatus(todo)}>
                            {todo.content}
                        </div>);
                if(isModify) contentToShow = (
                    <>
                        <textarea 
                            style={{width:'80%'}}
                            type="text"
                            value={todoContentToModify}
                            onChange={(e) => setTodoContentToModify(e.target.value)}/>
                        <button onClick={(e)=> modifyTodo(e)} className="modificationValidationButton">
                            {isSmallScreen ? 'OK' : 'Valider'} 
                        </button>
                    </>
                )
                return (
                    <div key={todo.id_todo} style={{padding: '10px'}}>
                        {index !== 0 && <div style={{width:'100%', height: '1px', backgroundColor: '#007BFF'}}></div>}
                        <div className="todoRow">
                            {!isModify && <button onClick={(e) => toggleModificationTodo(todo.id_todo, todo.content, e)} className="actionToDo" style={{backgroundColor: '#ffc107'}}>
                                {isSmallScreen ? <EditIcon /> : 'Modifier'}
                            </button>}
                            {!isModify && <button onClick={(e) => deleteTodo(todo.id_todo, e)}className="actionToDo" style={{backgroundColor: '#dc3545'}}>
                                {isSmallScreen ? <DeleteIcon /> : 'Supprimer'}
                            </button>}
                            {contentToShow}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default withWindowDimensions(TableToDo);