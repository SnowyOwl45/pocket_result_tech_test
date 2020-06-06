import React, {useEffect, useState} from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useRouter } from 'next/router'
import axios from 'axios';

//Layout
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//component
import DrawerNav from '../components/DrawerNav';
import withWindowDimensions from '../components/withWindowDimensions';
import TableToDo from '../components/TableToDo';
import NewToDoListForm from '../components/NewToDoListForm';

//icon
import AddIcon from '@material-ui/icons/Add';

const myTodos = ({isSmallScreen}) => {
    const [email, setEmail] = useState([])
    const [userData, setUserData] = useState([])
    const [todoLists, setTodoLists] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isActiveTodoList, setIsActiveTodoList] = useState({});
    const [showNewToDoList, setShowNewToDoList] = useState(false)

    useEffect(() => {
        let hostUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        var searchParams = new URLSearchParams(window.location.search)
        var email = searchParams.get("e");
        const axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};
        setEmail(email);
        async function fetchData() {
            setIsLoading(true);
            const responses = await axios.all([axios.get(`${hostUrl}/api/datauser?email=${email}`, { data: null }, axiosConfig),
                    axios.get(`${hostUrl}/api/todolist?email=${email}`, { data: null }, axiosConfig)
                ]);
            const userDataFromQuery = responses[0].data
            const toDoListsData = responses[1].data
            setUserData(userDataFromQuery)
            setTodoLists(toDoListsData)
            if(toDoListsData.length) setIsActiveTodoList(toDoListsData[0]);
            setIsLoading(false);
        }
        if(email) fetchData();
    }, []);

    //add to local storage
    const addData = (data) => {
        setUserData([...userData, data])
    }

    //add to local storage
    const addTodoList = (data) => {
        setTodoLists([...todoLists, data])
    }

    const modifyContentData = (id, content) => {
        const nextData = userData.map(elt => elt.id_todo === id ? { ...elt, ["content"]: content } : elt);
        setUserData(nextData)
    }

    const modifyStatusData = (id, newStatus) => {
        const nextData = userData.map(elt => elt.id_todo === id ? { ...elt, ["status"]: newStatus } : elt);
        setUserData(nextData)
    }

    //delete from local storage
    const deleteData = (id) => {
        var newData = userData.filter((todo) => todo.id_todo !== id);
        setUserData(newData)
    }


    const hideNewToDoList = () => {
        setShowNewToDoList(false)
    }

    const setActiveToDoList = (obj) => {
        setIsActiveTodoList(obj)
    }
    
    return (
        <div>
            {isSmallScreen && <DrawerNav isActiveTodoList={isActiveTodoList} todoLists={todoLists}/>}
            {isLoading && <div>Loading ...</div>}
            <Container fluid>
                <Row style={{height: '100vh'}}>
                    {!isSmallScreen && <Col sm={2} style={{backgroundColor: '#007BFF', paddingRight: '0px'}}>
                        <div className="flexCContainer">
                            {todoLists.map((todolist, index) => {
                                    var isActiveTodoListBool = isActiveTodoList.id_todo_list === todolist.id_todo_list
                                    return (<div key={index} onClick={() => {setIsActiveTodoList(todolist); setShowNewToDoList(false)}} style={{cursor: 'pointer', backgroundColor: isActiveTodoListBool ? 'white' : '#007BFF', color: isActiveTodoListBool ? '#007BFF' : 'white', padding: '1vw', width: '100%'}}>
                                        {todolist.name}
                                    </div>)
                                }
                            )}
                            <div onClick={() => setShowNewToDoList(!showNewToDoList)} style={{cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', padding: '1vw', width: '100%'}}>
                                <AddIcon />
                                Nouvelle ToDo List
                            </div>
                        </div>
                    </Col>}
                    <Col sm={10}>
                        {showNewToDoList && <NewToDoListForm setActiveToDoList={setActiveToDoList} hideNewToDoList={hideNewToDoList} addTodoList={addTodoList} email={email}/>}
                        {!showNewToDoList && <TableToDo addData={addData} modifyContentData={modifyContentData} modifyStatusData={modifyStatusData} deleteData={deleteData} todoList={isActiveTodoList} userData={userData}/>}
                        {userData.length === 0 && <p>Aucune ToDo pour le moment</p>}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default withWindowDimensions(myTodos);