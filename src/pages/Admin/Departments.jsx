import React from "react";
import PageTitle from "../../components/Layout/PageTitle";
import Clearfix from "../../components/container/Clearfix";
import AddDepartment from "../../components/tabs/AddDepartment";
import DepartmentsTab from "../../components/tabs/DepartmentsTab";

export default function Departments() {
  return (
    <>
      <PageTitle title={"Departments"} />

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
                  Departments
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#e_add">
                  Add
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <AddDepartment/>
              <DepartmentsTab/>
            </div>
          </div>
        </div>
      </Clearfix>
    </>
  );
}
