import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [Text, setText] = useState('')
    const [Day, setDay] = useState('')
    const [Reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!Text) {
            alert('Please add a task')
            return
        }
        onAdd({ Text, Day, Reminder })
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task' 
            value={Text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
            <label>Day + Time</label>
            <input type='text' placeholder='Add day and time!' 
            value={Day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input type='checkbox' 
            checked={Reminder}
            value={Reminder} 
            onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save task'
            className='btn btn-block'/>
        </form>
    )
}

export default AddTask