import { useState } from 'react';

import './InputModal.scss';

const InputModal = ({ open, close, title, callback }) => {

    const[label, setLabel] = useState("");

    const handleYes = () => {
        callback(label);
        close(false)
    }

    const handleNo = () => {
        close(false)
    }

    return (
        <div className="InputModal" hidden={!open}>
            <div className="textWrapper">
                <h5>{title}</h5>
            </div>
            <div>
                <input type="text" onChange={(e) => setLabel(e.target.value)}/>
            </div>
            <div className="buttonWrapper">
                <button className="cancelBtn" onClick={handleNo}>Cancel</button>
                <button className="saveBtn" onClick={handleYes}>Save</button>
            </div>
        </div>
    )
}

export default InputModal;