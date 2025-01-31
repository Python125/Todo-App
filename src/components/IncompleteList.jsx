import { useState, React } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);

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