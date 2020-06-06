import React, {useEffect} from 'react';
import Link from 'next/link'
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

//drawer component
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

export default function TemporaryDrawer({todoLists}) {
    const [state, setState] = React.useState({
        isOpen: false
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ isOpen: open });
    };

    const list = () => (
        <div style={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
            {
                todoLists.map((todolist)=>
                    <ListItem className="" button key={todolist.id}>
                        <ListItemText primary={todolist.name} />
                    </ListItem>
                )
            }
            <Divider />
            <ListItem className="" button key="addNewTodoList">
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary="Nouvelle ToDo List" />
            </ListItem>
            </List>
        </div >
    );

    return (
        <div style={{ width: '100%', backgroundColor: '#007BFF', position: 'sticky', top: '0px', textAlign: 'left', color: 'white', zIndex: 1000 }}>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon style={{color: 'white'}} fontSize='large'/>
            </Button>
            To Do List
            <Drawer anchor="left" open={state["isOpen"]} onClose={toggleDrawer(false)}>
                {list("left")}
            </Drawer>
        </div>
    );
}
