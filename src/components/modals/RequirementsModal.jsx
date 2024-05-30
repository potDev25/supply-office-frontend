import React from "react";
import ModalContainer from "./ModalContainer";

export default function RequirementsModal({ handleClose, show }) {
  return (
    <ModalContainer
      btnText={"Upload"}
      handleClose={handleClose}
      show={show}
      modalTitle={"Requirements Submitted"}
      withCancel={true}
      closeButton={false}
      size={"lg"}
      withOkButton={false}
      cancelText={'Close'}
    >
      <div className="table-responsive">
        <table className="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
          <thead>
            <tr>
              <th>Cedula</th>
              <th>Sanitary Permit</th>
              <th>Barangay Certificate</th>
              <th>Status</th>
              <th>Validity Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>File</td>
              <td>File</td>
              <td>File</td>
              <td><span className="badge badge-success ml-0 mr-0">Valid</span></td>
              <td>2024-05-09</td>
            </tr>
            <tr>
              <td>File</td>
              <td>File</td>
              <td>File</td>
              <td><span className="badge badge-danger ml-0 mr-0">Expired</span></td>
              <td>2024-05-09</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ModalContainer>
  );
}
