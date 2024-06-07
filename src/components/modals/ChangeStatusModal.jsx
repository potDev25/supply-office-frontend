import React from "react";
import ModalContainer from "./ModalContainer";

export default function ChangeStatusModal({ handleClose, show, requestId}) {
  return (
    <ModalContainer
      btnText={"Upload"}
      handleClose={handleClose}
      show={show}
      modalTitle={"Change Status"}
      withCancel={true}
      closeButton={false}
      size={"md"}
      withOkButton={false}
      cancelText={'Close'}
    >
      <label>Change Status</label>
      <div className="form-group">
        <select className="custom-select" name='status'>
          <option selected>Select Status</option>
          <option value={1}>Supply Office</option>
          <option value={2}>Accounting Office</option>
          <option value={3}>VP Office</option>
          <option value={3}>President Office</option>
        </select>
        {/* {
            error ? 
            <p className="text-danger mt-1" style={{fontSize: '12px', fontStyle: 'italic'}}> <i className="icon-info"></i> Error</p>
            : null
        } */}
      </div>
    </ModalContainer>
  );
}
