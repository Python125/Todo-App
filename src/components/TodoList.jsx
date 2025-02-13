import { useState, React, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { DateTimePicker } from '@mantine/dates';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import EditTodo from './Edit';
import { Text, Button, Input, Box } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_API_URL;

function TodoList({ userId }) {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);
    const [dueDate, setDueDate] = useState('');
    const [calendarDate, setCalendarDate] = useState(null);
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get(`${apiURL}/users/${userId}`);
            const updatedTodos = response.data.todos.map(todo => {
                if (!todo.completed && new Date(todo.dueDate) < new Date()) {
                    return { ...todo, overdue: true };
                } else {
                    return { ...todo, overdue: false };
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
        if (!todoInput.trim()) return;
        if (!calendarDate) return;

        const dateTime = new Date(calendarDate);
        console.log(dateTime);

        const newTodo = {
            id: todos.length + 1,
            name: todoInput.trim(),
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
            setCalendarDate(null);
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
            <Box textAlign='center'>
                <Text fontWeight='bold' fontSize='2xl'>Welcome {user}</Text>
                <form onSubmit={submitTodo}>
                    <div style={{ width: '250px', margin: 'auto' }}>
                        <Input variant='subtle' type="text" value={todoInput} onChange={addTodo} />
                        <DateTimePicker value={calendarDate} onChange={(newDate) => setCalendarDate(newDate)} onCancel={() => setCalendarDate(null)} placeholder="Pick a date and time"/>
                    </div>
                    <Button variant='surface' marginTop='3' width='100px' fontWeight='bold' type="submit" onClick={submitTodo}>Add Todo</Button>
                </form>
                <Text fontWeight='bold' fontSize='xl' marginTop='5'>Incomplete</Text>
                <ul>
                    {incompleteTodo.map(todo => {
                        return (
                            <li key={todo.id}>
                                {editTodoId === todo.id ? (
                                    <EditTodo todo={todo} onSave={updateTodo} onCancel={() => setEditTodoId(null)} />
                                ) : (
                                    <>
                                        {todo.name} - Due: {format(new Date(todo.dueDate), 'M-d-yyyy h:mm a')}
                                        <Button variant='surface' marginLeft='2' marginTop='2' width='100px' fontWeight='bold' onClick={() => setEditTodoId(todo.id)}>Edit</Button>
                                        <Button variant='surface' marginLeft='2' marginTop='2' width='100px' fontWeight='bold' onClick={() => deleteTodo(todo.id)}>Delete</Button>
                                        <Button variant='surface' marginLeft='2' marginTop='2' width='100px' fontWeight='bold' onClick={() => completeTodo(todo.id)}>Complete</Button>
                                    </>
                                )}
                            </li>
                        )
                    })}
                </ul>

                <Text fontWeight='bold' fontSize='xl' marginTop='5'>Complete</Text>
                <ul>
                    {todos.filter(todo => todo.completed).map(todo => {
                        return (
                            <li key={todo.id}>
                                {todo.name}
                                <Button variant='surface' marginLeft='2' marginTop='2' width='100px' fontWeight='bold' onClick={() => deleteTodo(todo.id)}>Delete</Button>
                                <Button variant='surface' marginLeft='2' marginTop='2' width='100px' fontWeight='bold' onClick={() => undoCompleteTodo(todo.id)}>Undo</Button>
                            </li>
                        )
                    })}
                </ul>

                <Text fontWeight='bold' fontSize='xl' marginTop='5'>Overdue</Text>
                <ul>
                    {todos.filter(todo => todo.overdue && !todo.completed).map(todo => {
                        return (
                            <li key={todo.id}>
                                {todo.name} - Due: {format(new Date(todo.dueDate), 'M-d-yyyy h:mm a')}
                            </li>
                        )
                    })}
                </ul>
            </Box>
        </MantineProvider>
    )
}

export default TodoList;