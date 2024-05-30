import React from 'react'
import Modal from 'react-bootstrap/Modal';

export default function ModalContainer({show, handleClose, children, cancelText, handleSubmit, btnText, modalTitle, withCancel = true, withOkButton = true, closeButton = true, size}) {
  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size={size}
      >
        <Modal.Header closeButton={closeButton}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          {
            withOkButton ? <>
              <button
                type="button"
                className="btn btn-primary btn-round"
                onClick={handleClose}
              >
                {btnText}
              </button>
            </> : null
          }
          {
            withCancel ?
            <button
                type="button"
                className="btn btn-secondary btn-round"
                onClick={handleClose}
            >
                {cancelText}
            </button>
            : null
          }
        </Modal.Footer>
      </Modal>
  )
}
