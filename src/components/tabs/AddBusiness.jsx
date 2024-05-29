import React, { useState } from "react";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import DateInput from "../Forms/DateInput";
import UploadRequirementsModal from "../modals/UploadRequirementsModal";

export default function AddBusiness() {
  const [uploadModal, setUploadModal] = useState(false)

  const handleCloseModal = () => {
    setUploadModal(false)
  } 
  return (
    <div className="tab-pane" id="e_add">
      <div className="body">
        <div className="row clearfix">
          <Input
            placeholder={"Business Name / Company Name"}
            label={"Lastname"}
            col={"6"}
            name={"company_name"}
          />

          <Select col={"6"} label={"Business Type"} name={"business_type"} />

          <Input
            placeholder={"Business Location"}
            label={"Business Location"}
            col={"6"}
            name={"business_location"}
          />

          <Select col={"6"} label={"Business Owner"} name={"applicant_id"} />

          <DateInput
            placeholder={"Date Started"}
            label={"Date Started"}
            col={"6"}
            name={"date_started"}
          />

          <Select col={"6"} label={"Status"} name={"status"} />

          <div className="col-12" style={{ display: "flex", gap: "5px" }}>
            <button
              type="button"
              className="btn btn-primary btn-round"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={ev => setUploadModal(true)}
            >
              Register
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-round"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <UploadRequirementsModal show={uploadModal} handleClose={handleCloseModal}/>

    </div>
  );
}
