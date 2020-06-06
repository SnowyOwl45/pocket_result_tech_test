import React, { useState } from 'react';
import axios from 'axios';

const NewToDoListForm = ({setActiveToDoList, hideNewToDoList, email, addTodoList}) => {
    const [listName, setListName] = useState('')
    
    const onSubmitClick = async () => {
        hideNewToDoList()
        let hostUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        const axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
        var response;
        if(listName && email) {
            response = await axios.post(`${hostUrl}/api/todolist`, {"owner": email, "name": listName}, axiosConfig);
            addTodoList({...response.data})
            setActiveToDoList({...response.data})
        }
    }

    return (
        <div className="flexCContainer" style={{width: '50%'}}>
            <h4>Création nouvelle todolist</h4>
            <label> Nom de la toDo Liste :</label>
            <input 
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}/>
            <button onClick={onSubmitClick} className="validationButton">
                Valider 
            </button>
        </div>
    )
}

export default NewToDoListForm;