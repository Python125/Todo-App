import { useState, React, useEffect } from 'react';
import axios from 'axios';
import CompletedList from './CompletedList';
import OverdueList from './OverdueList';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [dueDate, setDueDate] = useState('');

    // const apiURL = process.env.REACT_API_URL;
    // console.log(`API URL: ${apiURL}`);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(`${apiURL}/users/${userId}/todos`);
            const updatedTodos = response.data.map(todo => {
                if (!todo.completed && new Date(todo.dueDate) < new Date()) {
                  return { ...todo, overdue: true };
                } else {
                  return { ...todo, overdue: false };
                }
              });
            setTodos(updatedTodos);
        }
        fetchTodos();
    }, [])

    const addTodo = (e) => {
        setTodoInput(e.target.value);
    }

    const submitTodo = (e) => {
        e.preventDefault();

        const newTodo = {
            id: todos.length + 1,
            name: todoInput,
            completed: false,
            dueDate: new Date().toISOString(),
            overdue: false,
            userId: id,
        }
        console.log(newTodo);

        axios.post(`${apiURL}/users/${userId}/todos`, newTodo).then(response => {
            setTodos([]);
            setTodoInput('');
            setEditTodoId(null);
        })
    }

    const incompleteTodo = () => {}

    const editTodo = () => {}

    const deleteTodo = () => {}

    const completeTodo = () => {}

    const undoCompletedTodo = () => {}

    return (
        <div>
            <h1>Incomplete List</h1>
            <ul>
                <li>Incomplete Todo</li>
            </ul>
        </div>
    )
}

export default TodoList;