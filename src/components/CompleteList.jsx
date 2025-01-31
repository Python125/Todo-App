import React from 'react';

function CompleteList(props) {
    const completedTodos = props.todos.filter(todo => todo.completed);

    return (
        <div>
            <h5>Complete</h5>
            <ul>
                {completedTodos.map(completedTodo => {
                    return <li key={completedTodo.id}>{completedTodo.name}
                        <button onClick={() => props.undoCompletedTodo(completedTodo.id)}>Undo</button>
                        <button onClick={() => props.deleteCompletedTodo(completedTodo.id)}>Delete</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default CompleteList;