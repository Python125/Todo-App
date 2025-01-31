import React from 'react';
import { format } from 'date-fns';

function OverdueList() {
    const overdueTodos = props.todos.filter(todo => todo.overdue);

    return (
        <div>
            <h5>Overdue</h5>
            <ul>
                {overdueTodos.map(overdueTodo => {
                    return <li key={overdueTodo.id}>
                        {overdueTodo.name} due on {format(overdueTodo.dueDate, 'MM-dd-yyyy hh:mm a')}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default OverdueList;