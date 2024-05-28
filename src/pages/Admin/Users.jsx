import React from "react";
import PageTitle from "../../components/Layout/PageTitle";
import Clearfix from "../../components/container/Clearfix";
import AddUser from "../../components/tabs/AddUser";
import Staffs from "../../components/tabs/Staffs";
import Admins from "../../components/tabs/Admins";

export default function Users() {
  return (
    <>
      <PageTitle title={"Users"} />

      <Clearfix classname={"row"}>
        <div className="col-lg-12">
          <div className="card">
            <ul className="nav nav-tabs2">
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-toggle="tab"
                  href="#e_add"
                >
                  Add
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#e_list">
                  Staffs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#e_leave">
                  Admins
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-content">
              <AddUser/>
              <Staffs/>
              <Admins/>
              </div>
            </div>
          </div>
        </div>
      </Clearfix>
    </>
  );
}
