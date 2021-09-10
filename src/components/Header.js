import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
    // const onClick = () => {
    //     console.log('Click')}
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (
            <Button 
            color={showAdd ? 'red' : 'green'}
            text={showAdd ? 'Close' : 'Add'} 
            onClick={onAdd} 
            />
            )}
        </header>    
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string
}

// Header.propTypes = {
//     title: PropTypes.string.isRequired,
// }

// We can also make CSS in JS 
// also can change props for the header

export default Header