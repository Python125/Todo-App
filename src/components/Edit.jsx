import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';

function EditTodo({ todo, onSave, onCancel }) {
    const [editValue, setEditValue] = useState(todo.name);
    const [editDueDate, setEditDueDate] = useState(new Date(todo.dueDate));

    const editTodo = (e) => {
        setEditValue(e.target.value);
    }

    const editDueDateHandler = (e) => {
        setEditDueDate(e.target.value);
    }

    const submitEditedTodo = (e) => {
        e.preventDefault();
        if (!editValue.trim()) return;
        if (!editDueDate) return;

        const dueDateString = new Date(editDueDate);
        const userDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/New_York', hour12: true }).format(dueDateString);

        onSave(todo.id, editValue, dueDateString, userDate);
        console.log(userDate);
    }

    return (
        <form onSubmit={submitEditedTodo}>
            <Input variant='subtle' width='250px' marginLeft='2' marginTop='5' type="text" value={editValue} onChange={editTodo} />
            <Input variant='subtle' width='250px' marginLeft='2' marginTop='5' value={editDueDate.toLocaleString()} onChange={editDueDateHandler} />
            <Button variant='surface' marginLeft='2' marginBottom='1' width='100px' fontWeight='bold' type="submit">Save</Button>
            <Button variant='surface' marginLeft='2' marginBottom='1' width='100px' fontWeight='bold' onClick={onCancel}>Cancel</Button>
        </form>
    )
}

export default EditTodo;