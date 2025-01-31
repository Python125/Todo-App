import { useState, React } from 'react';

function TodoList() {
    const [userTodos, setUserTodos] = useState([]);
    const [userTodoInput, setUserTodoInput] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);

    const addUserTodo = (e) => {
        setUserTodoInput(e.target.value);
    }

    const submitUserTodo = (e) => {
        e.preventDefault();

        const newUserTodo = {
            id: userTodos.length + 1,
            name: userTodoInput,
            completed: false,
            dueDate: new Date().toISOString(),
            overdue: false,
            userId: userId,
        }
        console.log(newUserTodo);

        axios.post(`${apiURL}/users/${userId}/todos`, newUserTodo).then(response => {
            setUserTodos([])
        })
    }

    const incompleteUserTodo = () => {}

    const editUserTodo = () => {}

    const deleteUserTodo = () => {}

    const completeUserTodo = () => {}

    const undoCompletedUserTodo = () => {}

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