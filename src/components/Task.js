import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.Reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.TaskId)}>
        <h3>{task.Text} <FaTimes style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => onDelete(task.TaskId)}
        />
        </h3>
        <p>{task.Day}</p>
        </div>
    )
}

export default Task