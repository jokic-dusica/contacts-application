import { ImWarning } from 'react-icons/im';

import './ConfirmModal.scss';

const ConfirmModal = ({ open, close, title, message, callback, withIcon }) => {

    const handleYes = () => {
        callback();
        close(false)
    }

    const handleNo = () => {
        close(false)
    }

    return (
        <div className="ConfirmModal" hidden={!open}>
            <div className="text-wrapper">
                <h5>{withIcon === true ? <span><ImWarning /></span> : ''}{title}</h5>
                <p>{message}</p>
            </div>
            <div className="button-wrapper">
                <button className="cancel-btn" onClick={handleNo}>Cancel</button>
                <button className="delete-btn" onClick={handleYes}>Delete</button>
            </div>
        </div>
    )
}

export default ConfirmModal;