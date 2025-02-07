import axios from 'axios';
import { useState, React, useEffect } from 'react';
// import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;
console.log(`API URL: ${apiURL}`);

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [calenderDate, setCalenderDate] = useState(null);

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
        };
        fetchTodos();

        const interval = setInterval(() => {
            fetchTodos();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    function addTodo(e) {
        setTodoInput(e.target.value);
    }

    function addDueDate(e) {
        setDueDate(e.target.value);
    }

    function submitTodo(e) {
        e.preventDefault();
        if (!todoInput.trim()) return;

        const dateTime = new Date(calenderDate);
        console.log(dateTime);

        const newTodo = {
            id: todos.length + 1,
            name: todoInput,
            completed: false,
            dueDate: dueDate,
            overdue: false,
            userId: userId,
        }
        console.log(newTodo);

        axios.post(`${apiURL}/users/${userId}/todos`, newTodo).then(response => {
            setTodos([...todos, response.data]);
            setTodoInput('');
            setDueDate('');
            setCalenderDate(null);
        })
    }

    const updateTodo = (id, name, dueDate) => {
        const newTodos = [...todos].map(todo => {
            if (todo.id === id) {
                return { ...todo, name: name, dueDate: dueDate };
            } else {
                return todo;
            }
        })

        axios.put(`${apiURL}/users/${userId}/todos/${id}`, newTodos).then(response => {})
    }


    return (
        <div>
            <h1>Incomplete</h1>
            <ul>
                <li>Incomplete Todo</li>
            </ul>

            {/* <h1>Complete</h1>
            <ul>
                <li>Completed Todo</li>
            </ul>

            <h1>Overdue</h1>
            <ul>
                <li>Overdue Todo</li>
            </ul> */}
        </div>
    )
}

export default TodoList;