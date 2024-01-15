const Modal = () => {

    return (
        <div className="modal">
            <div>✖</div>
            <div className="img-container">
                <img src={""} alt="uploaded image" />
            </div>
            <button>Upload</button>
            <button>Close this and try again</button>
        </div>
    )
}

export default Modal