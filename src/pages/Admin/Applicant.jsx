import React, { useState } from "react";
import PageTitle from "../../components/Layout/PageTitle";
import Clearfix from "../../components/container/Clearfix";
import UpdateApplicant from "../../components/tabs/UpdateApplicant";
import ApplicantHistoryTable from "../../components/tables/ApplicantHistoryTable";
import ApplicantProfile from "../../components/container/ApplicantProfile";
import ApplicantBasicInfo from "../../components/tabs/ApplicantBasicInfo";
import RequirementsModal from "../../components/modals/RequirementsModal";

export default function Applicant() {
    const [updateForm, setUpdateForm] = useState(false)
    const [requirementForm, setRequirementForm] = useState(false)

    const closeRequirementModal = () => {
        setRequirementForm(false)
    }
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div style={{width: '50%'}}>
            <PageTitle title={"Users Account Information"} />
        </div>
        {/* <div className="d-flex" style={{gap: '4px'}}>
            <button className="btn btn-default btn-round btn-sm border border-success" onClick={ev => setRequirementForm(true)}>Requirements</button>
            <button className="btn btn-success btn-round btn-sm">Business Permit Issuance</button>
        </div> */}
      </div>

      <Clearfix classname={"row"}>
        <div className="col-lg-4 col-md-12">
          <ApplicantProfile/>
          <ApplicantHistoryTable/>
        </div>
        <div className="col-lg-8 col-md-12">
            <div className="card">
                {
                    updateForm ?
                    <UpdateApplicant handleCancel={ev => setUpdateForm(false)}/> : <>
                        <div class="body">
                            <ApplicantBasicInfo/>
                            <button className="btn btn-sm btn-default btn-round border border-success" onClick={ev => setUpdateForm(!updateForm)}>Edit Information</button>
                        </div>
                    </>
                }
            </div>
        </div>
      </Clearfix>

      <RequirementsModal
        show={requirementForm}
        handleClose={closeRequirementModal}
      />
    </>
  );
}
