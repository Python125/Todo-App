import { useState, React, useEffect } from 'react';
// import axios from 'axios';
import CompleteList from './CompleteList';
// import OverdueList from './OverdueList';



function IncompleteList() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [dueDate, setDueDate] = useState('');

    return (
        <div>
            <h1>Incompleted</h1>
            <ul>
                <li>Incomplete Todo</li>
            </ul>
            <CompleteList todos={todos} />
        </div>
    )
}


export default IncompleteList;