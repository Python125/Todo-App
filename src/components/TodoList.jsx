import { useState, React, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { DateTimePicker } from '@mantine/dates';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import EditTodo from './Edit';

const apiURL = import.meta.env.VITE_API_URL;

function TodoList({ userId }) {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [calenderDate, setCalenderDate] = useState(null);
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(`${apiURL}/users/${userId}`);
            const updatedTodos = response.data.todos.map(todo => {
                if (!todo.completed && new Date(todo.dueDate) < new Date()) {
                    return { ...todo, overDue: true };
                } else {
                    return { ...todo, overDue: false };
                }
            });
            setTodos(updatedTodos);
            setUser(response.data.email);
        };

        fetchTodos();

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
        if (!todoInput.trim() && !dueDate.trim()) return;

        const dateTime = new Date(calenderDate);
        console.log(dateTime);

        const newTodo = {
            id: todos.length + 1,
            name: todoInput,
            completed: false,
            dueDate: dateTime.toISOString(),
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

        axios.put(`${apiURL}/users/${userId}/todos/${id}`, { name: name, dueDate: dueDate })
        .then(() => {
            setTodos(newTodos);
            setEditTodoId(null);
        })
    }

    const deleteTodo = (id) => {
        const newTodos = [...todos].filter(todo => {
            const isOverdue = new Date(todo.dueDate) < new Date();
            if (todo.id === id) {
                return false;
            } else {
                return true;
            }
        });
        
        axios.delete(`${apiURL}/users/${userId}/todos/${id}`)
        .then(() => {
            setTodos(newTodos);
        })
    }

    const completeTodo = (id) => {
        const newTodos = [...todos].map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: true };
            } else {
                return todo;
            }
        })

        axios.put(`${apiURL}/users/${userId}/todos/${id}`, { completed: true })
        .then(() => {
            setTodos(newTodos);
        })
    }

    const incompleteTodo = todos.filter(todo => {
        if (todo.completed === false) {
            return true;
        } else {
            return false;
        }
    })

    const undoCompleteTodo = (id) => {
        const newTodos = [...todos].map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: false };
            } else {
                return todo;
            }
        })

        axios.put(`${apiURL}/users/${userId}/todos/${id}`, { completed: false })
        .then(() => {
            setTodos(newTodos);
        })
    }

    return (
        <MantineProvider>
            <div style={{ backgroundColor: 'lightgreen' }}>
                <h1>Welcome {user}</h1>
                <form onSubmit={submitTodo}>
                    <div style={{ width: '250px', margin: 'auto' }}>
                        <input style={{ width: '100%' }} type="text" value={todoInput} onChange={addTodo} />
                        <DateTimePicker value={calenderDate} onChange={(newDate) => setCalenderDate(newDate)} onCancel={() => setCalenderDate(null)} placeholder="Select date and time" />
                    </div>
                    <button type="submit" onClick={submitTodo}>Add Todo</button>
                </form>
                <h2>Incomplete</h2>
                <ul>
                    {incompleteTodo.map(todo => {
                        return (
                            <li key={todo.id}>
                                {editTodoId === todo.id ? (
                                    <EditTodo todo={todo} onSave={updateTodo} onCancel={() => setEditTodoId(null)} />
                                ) : (
                                    <>
                                        {todo.name} - Due: {format(new Date(todo.dueDate), 'M-d-yyyy hh:mm a')}
                                        <button onClick={() => setEditTodoId(todo.id)}>Edit</button>
                                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                                        <button onClick={() => completeTodo(todo.id)}>Complete</button>
                                    </>
                                )}
                            </li>
                        )
                    })}
                </ul>

                <h2>Complete</h2>
                <ul>
                    {todos.filter(todo => todo.completed).map(todo => {
                        return (
                            <li key={todo.id}>
                                {todo.name}
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                                <button onClick={() => undoCompleteTodo(todo.id)}>Undo</button>
                            </li>
                        )
                    })}
                </ul>

                <h2>Overdue</h2>
                <ul>
                    {todos.filter(todo => todo.overDue && !todo.completed).map(todo => {
                        return (
                            <li key={todo.id}>
                                {todo.name} - Due: {format(new Date(todo.dueDate), 'M-d-yyyy hh:mm a')}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </MantineProvider>
    )
}

export default TodoList;