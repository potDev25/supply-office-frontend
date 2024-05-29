import React from 'react'
import Modal from 'react-bootstrap/Modal';

export default function ModalContainer({show, handleClose, children, title, handleSubmit, btnText, modalTitle, withCancel = true, closeButton = true}) {
  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton={closeButton}>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary btn-round"
            onClick={handleClose}
          >
            {btnText}
          </button>
          {
            withCancel ?
            <button
                type="button"
                className="btn btn-secondary btn-round"
                onClick={handleClose}
            >
                Cancel
            </button>
            : null
          }
        </Modal.Footer>
      </Modal>
  )
}
