import React from "react";
import PageTitle from "../../components/Layout/PageTitle";
import Clearfix from "../../components/container/Clearfix";
import ApplicantsData from "../../components/tabs/ApplicantsData";
import AddApplicant from "../../components/tabs/AddDepartment";

export default function Applicants() {
  return (
    <>
      <PageTitle title={"Applicants"} />

      <Clearfix classname={"row"}>
        <div className="col-lg-12">
          <div className="card">
            <ul className="nav nav-tabs2">
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-toggle="tab"
                  href="#e_applicants"
                >
                  Applicants
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#e_add">
                  Add Applicant
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <AddApplicant/>
              <ApplicantsData/>
            </div>
          </div>
        </div>
      </Clearfix>
    </>
  );
}
