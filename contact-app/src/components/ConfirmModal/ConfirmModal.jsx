import { useState } from 'react';
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
            <div className="textWrapper">
                <h5>{withIcon === true ? <span><ImWarning /></span> : ''}{title}</h5>
                <p>{message}</p>
            </div>
            <div className="buttonWrapper">
                <button className="cancelBtn" onClick={handleNo}>Cancel</button>
                <button className="saveBtn" onClick={handleYes}>Delete</button>
            </div>
        </div>
    )
}

export default ConfirmModal;