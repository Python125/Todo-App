import { useState, React, useEffect } from 'react';
import axios from 'axios';
// import CompletedList from './CompletedList';
// import OverdueList from './OverdueList';

function IncompleteList() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [dueDate, setDueDate] = useState('');

    return (
        <div>
            <h1>Incomplete List</h1>
            <ul>
                <li>Incomplete Todo</li>
            </ul>
        </div>
    )
}

export default IncompleteList;