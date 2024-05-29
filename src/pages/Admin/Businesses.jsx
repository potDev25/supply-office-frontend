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
