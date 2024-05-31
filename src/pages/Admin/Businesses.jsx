import React from "react";
import PageTitle from "../../components/Layout/PageTitle";
import Clearfix from "../../components/container/Clearfix";
import DepartmentsTab from "../../components/tabs/DepartmentsTab";
import AddBusiness from "../../components/tabs/AddBusiness";

export default function Businesses() {
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
                      href="#e_departments"
                    >
                      Businesses
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#e_add">
                      Register Business
                    </a>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center" style={{gap: '5px', width: '40%'}}>
                <button className="btn btn-danger btn-round btn-sm" style={{width: '40%'}}><i className="icon-trash"></i>Delete</button>
                <input className="form-control" placeholder="Search Business Name"/>
                <select className="form-control" style={{width: '20%'}}>
                  <option value="10" selected>10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="">All</option>
                </select>
              </div>
            </div>
            <div className="tab-content">
              <AddBusiness/>
              <DepartmentsTab/>
            </div>
          </div>
        </div>
      </Clearfix>
    </>
  );
}
