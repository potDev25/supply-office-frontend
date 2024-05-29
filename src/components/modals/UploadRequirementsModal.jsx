import React from 'react'
import ModalContainer from './ModalContainer'

export default function UploadRequirementsModal({handleClose, show}) {
  return (
    <ModalContainer
        btnText={'Upload'}
        handleClose={handleClose}
        show={show}
        modalTitle={'Upload Requirements'}
        withCancel={false}
        closeButton={false}
    >
        Upload Requirements
    </ModalContainer>
  )
}
