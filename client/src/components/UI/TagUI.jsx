import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function TagUI({ name, onRemove }) {
    return (
        <li className='tag'>
            <button className='inline-block' onClick={onRemove}>
                <FontAwesomeIcon icon={faXmark} />
                &nbsp;
            </button>
            <span className='inline-block'>{name}</span>
        </li>
    )
}