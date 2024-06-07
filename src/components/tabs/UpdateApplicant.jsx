import React, { useState } from "react";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import DateInput from "../Forms/DateInput";
import UploadRequirementsModal from "../modals/UploadRequirementsModal";

const options = [
  {
    text: 'Department User',
    value: 'Department User'
  },
  {
    text: 'Supply Office',
    value: 'Supply Office'
  },
]


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
            col={"4"}
            name={"lastname"}
          />

          <Input
            placeholder={"Firstname"}
            label={"Firstname"}
            col={"4"}
            name={"firstname"}
          />

          <Input
            placeholder={"Middle Name"}
            label={"Middle Name"}
            col={"4"}
            name={"middle_name"}
          />

          <DateInput
            placeholder={"Birthdate"}
            label={"Birthdate"}
            col={"4"}
            name={"firstname"}
          />

          <Input
            placeholder={"Email"}
            label={"Email"}
            col={"4"}
            name={"email"}
          />

          <Select col={"4"} label={"Role"} name={"role"} options={options}/>

          <Input
            placeholder={"Username"}
            label={"Username"}
            col={"4"}
            name={"username"}
          />

          <Input
            placeholder={"Password"}
            label={"Password"}
            col={"4"}
            name={"password"}
            type="password"
          />

          <Input
            placeholder={"Confirm Password"}
            label={"Confirm Password"}
            col={"4"}
            name={"password_confirmation"}
            type="password"
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
