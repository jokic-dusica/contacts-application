import './ConfirmModal.scss';

const ConfirmModal = ({ open, close, title, message, callback }) => {

    const handleYes = () => {
        callback();
        close(false)
    }
    const handleNo = () => {
        close(false)
    }

    return (
        <div className="ConfirmModal" hidden={!open}>
            <h3>{title}</h3>
            <span>{message}</span>
            <button onClick={handleYes}>Yes</button>
            <button onClick={handleNo}>No</button>
        </div>
    )
}

export default ConfirmModal;