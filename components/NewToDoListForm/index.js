import React, { useState } from 'react';
import axios from 'axios';
import withWindowDimensions from '../withWindowDimensions';


const NewToDoListForm = ({setActiveToDoList, hideNewToDoList, email, addTodoList, isSmallScreen}) => {
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

    const onCancelClick = () => {
        hideNewToDoList();
    }

    return (
        <div className="flexCContainer" style={{width: isSmallScreen ? '80%' : '50%', marginLeft: isSmallScreen ? '10%' : '25%'}}>
            <h4 className="title">Création nouvelle todolist</h4>
            <label> Nom de la toDo Liste :</label>
            <input 
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}/>
            <button onClick={onSubmitClick} className="validationButton">
                Valider 
            </button>
            <button onClick={onCancelClick} className="cancelButton">
                Annuler 
            </button>
        </div>
    )
}

export default withWindowDimensions(NewToDoListForm);