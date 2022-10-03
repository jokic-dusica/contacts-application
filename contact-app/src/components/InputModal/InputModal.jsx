import { useEffect, useState } from 'react';

import './InputModal.scss';

const InputModal = ({ open, close, title, callback }) => {

    const [label, setLabel] = useState("");

    const handleYes = () => {
        callback(label);
        setLabel("");
        close(false)
    };

    const handleNo = () => {
        close(false)
    };

    return (
        <div className="InputModal" hidden={!open}>
            <div className="text-wrapper">
                <h5>{title}</h5>
            </div>
            <div className='wrapper-input'>
                <input type="text" onChange={(e) => setLabel(e.target.value)} value={label} />
            </div>
            <div className="button-wrapper">
                <button className="cancel-btn" onClick={handleNo}>Cancel</button>
                <button className="submit-btn" onClick={handleYes}>Save</button>
            </div>
        </div>
    )
}

export default InputModal;