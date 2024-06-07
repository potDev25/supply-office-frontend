import React, { useState } from "react";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import DateInput from "../Forms/DateInput";
import UploadRequirementsModal from "../modals/UploadRequirementsModal";

const options = [
  {
    text: 'Office',
    value: 'Office'
  },
  {
    text: 'School',
    value: 'School'
  },
]

const optionsStatus = [
  {
    text: 'Active',
    value: 'Active'
  },
  {
    text: 'Draft',
    value: 'Draft'
  },
]

export default function AddApplicant() {
  const [uploadModal, setUploadModal] = useState(false)

  const handleCloseModal = () => {
    setUploadModal(false)
  } 
  return (
    <div className="tab-pane" id="e_add">
      <div className="body">
        <div className="row clearfix">
          <Input
            placeholder={"Department Name"}
            label={"Department Name"}
            col={"12"}
            name={"department_name"}
          />

          <Select col={"12"} label={"Department Type"} name={"department_type"} options={options}/>

          <Select col={"12"} label={"Status"} name={"status"} options={optionsStatus}/>

          <div className="col-12" style={{ display: "flex", gap: "5px" }}>
            <button
              type="button"
              className="btn btn-primary btn-round"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={ev => setUploadModal(true)}
            >
              ADD
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
