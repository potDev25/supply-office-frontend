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
            <div className="d-flex align-items-center justify-content-between">
              <div>
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
              </div>
              <div className="d-flex align-items-center" style={{gap: '5px', width: '40%'}}>
                <button className="btn btn-danger btn-round btn-sm" style={{width: '40%'}}><i className="icon-trash"></i> Mass Delete</button>
                <input className="form-control" placeholder="Search Applicant Name"/>
                <select className="form-control" style={{width: '20%'}}>
                  <option value="10" selected>10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="">All</option>
                </select>
              </div>
            </div>
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
