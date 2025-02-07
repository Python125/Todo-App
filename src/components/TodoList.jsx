import { useState, React, useEffect } from 'react';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;
console.log(`API URL: ${apiURL}`);

function TodoList({ userId }) {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [calenderDate, setCalenderDate] = useState(null);
    const [user, setUser] = useState('');

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

        const fetchUser = async () => {
            const response = await axios.get(`${apiURL}/users/${userId}`);
            setUser(response.data.email);
        }

        fetchTodos();
        fetchUser();

        const interval = setInterval(() => {
            fetchTodos();
        }, 10000);

        return () => clearInterval(interval);
    }, [userId]);

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
                return { ...todo, name, dueDate };
            } else {
                return todo;
            }
        })

        axios.put(`${apiURL}/users/${userId}/todos/${id}`, newTodos).then(() => {
            setTodos(newTodos);
            setEditTodoId(null);
        })
    }

    const deleteTodo = (id) => {
        axios.delete(`${apiURL}/users/${userId}/todos/${id}`)
        .then(() => {
            setTodos(newTodos);
        })
    }

    return (
        <div>
            <h1>Welcome {user}</h1>
            <h2>Incomplete</h2>
            <form onSubmit={submitTodo}>
                <input type="text" value={todoInput} onChange={addTodo} />


                <button type="submit" onClick={submitTodo}>Add</button>

            </form>
            <ul>
                {todos.map(todo => {
                    return (
                        <li key={todo.id}>{todo.name}</li>
                    )
                })}
            </ul>


            {
            /* <h2>Complete</h2>
            <ul>
            </ul>


            <h2>Overdue</h2>
            <ul></ul> */

            }
        </div>
    )
}

export default TodoList;