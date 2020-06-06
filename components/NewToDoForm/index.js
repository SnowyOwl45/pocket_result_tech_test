import React, { useState } from 'react';
import axios from 'axios';

const NewToDoForm = ({addData, todolist}) => {
    const [content, setContent] = useState('')
    
    const onSubmitClick = async () => {
        let hostUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        const axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
        var response;
        if(content && todolist.id_todo_list) {
            response = await axios.post(`${hostUrl}/api/todos`, {"id_todo_list": todolist.id_todo_list, "status": "todo", "content": content}, axiosConfig);
            addData({...response.data, "owner": todolist.owner, "name": todolist.name})
        }
    }
    return (
        <div className="flexCContainer" style={{width: '50%'}}>
            <h4>Création d'un nouveau toDo</h4>
            <label> Description :</label>
            <input 
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}/>
            <button onClick={onSubmitClick} className="validationButton">
                Valider 
            </button>
        </div>
    )
}

export default NewToDoForm;