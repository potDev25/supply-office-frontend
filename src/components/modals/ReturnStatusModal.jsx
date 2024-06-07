import React from "react";
import ModalContainer from "./ModalContainer";

export default function ReturnStatusModal({ handleClose, show, requestId}) {
  return (
    <ModalContainer
      btnText={"Return"}
      handleClose={handleClose}
      show={show}
      modalTitle={"Return to Department?"}
      withCancel={true}
      closeButton={false}
      size={"md"}
      withOkButton={true}
      cancelText={'Close'}
    >
    </ModalContainer>
  );
}
