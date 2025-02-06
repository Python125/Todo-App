import { useState, React, useEffect } from 'react';
// import axios from 'axios';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [dueDate, setDueDate] = useState('');

    return (
        <div>
            <h1>Incomplete</h1>
            <ul>
                <li>Incomplete Todo</li>
            </ul>

            <h1>Complete</h1>
            <ul>
                <li>Completed Todo</li>
            </ul>

            <h1>Overdue</h1>
            <ul>
                <li>Overdue Todo</li>
            </ul>
        </div>
    )
}

export default TodoList;