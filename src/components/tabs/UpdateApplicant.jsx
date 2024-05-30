import React, { useState } from "react";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import DateInput from "../Forms/DateInput";
import UploadRequirementsModal from "../modals/UploadRequirementsModal";

export default function UpdateApplicant({handleCancel}) {
  const [uploadModal, setUploadModal] = useState(false)

  const handleCloseModal = () => {
    setUploadModal(false)
  } 
  return (
    <div className="tab-pane" id="e_add">
      <div className="body">
        <div className="row clearfix">
          <Input
            placeholder={"Lastname"}
            label={"Lastname"}
            col={"6"}
            name={"lastname"}
          />

          <Input
            placeholder={"Firstname"}
            label={"Firstname"}
            col={"6"}
            name={"firstname"}
          />

          <Input
            placeholder={"Middle Name"}
            label={"Middle Name"}
            col={"6"}
            name={"middle_name"}
          />

          <Select col={"6"} label={"Province"} name={"province"} />

          <Select col={"6"} label={"City/Municipality"} name={"city"} />

          <Select col={"6"} label={"Barangay"} name={"barangay"} />

          <DateInput
            placeholder={"Birthdate"}
            label={"Birthdate"}
            col={"6"}
            name={"firstname"}
          />

          <Input
            placeholder={"Email"}
            label={"Email"}
            col={"6"}
            name={"email"}
          />

          <Select col={"6"} label={"Gender"} name={"gender"} />

          <Input
            placeholder={"Username"}
            label={"Username"}
            col={"6"}
            name={"username"}
          />

          <div className="col-12" style={{ display: "flex", gap: "5px" }}>
            <button
              type="button"
              className="btn btn-primary btn-round"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              onClick={ev => setUploadModal(true)}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-round"
              data-dismiss="modal"
              onClick={handleCancel}
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
