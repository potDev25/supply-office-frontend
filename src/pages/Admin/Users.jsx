import React, { useState } from "react";
import PageTitle from "../../components/Layout/PageTitle";
import Clearfix from "../../components/container/Clearfix";
import AddUser from "../../components/tabs/AddUser";
import Staffs from "../../components/tabs/Staffs";
import Admins from "../../components/tabs/Admins";
import Input from "../../components/Forms/Input";
import Select from "../../components/Forms/Select";


export default function Users() {
  return (
    <>
      <PageTitle title={"Users"} />
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
                      href="#e_add"
                    >
                      Add
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#e_list">
                      Supply Office Users
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#e_leave">
                      Department Users
                    </a>
                  </li>
                </ul>
              </div>
              <div className="d-flex align-items-center" style={{gap: '5px', width: '40%'}}>
                <button className="btn btn-danger btn-round btn-sm" style={{width: '40%'}}><i className="icon-trash"></i>Delete</button>
                <input className="form-control" placeholder="Search Users"/>
                <select className="form-control" style={{width: '20%'}}>
                  <option value="10" selected>10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="">All</option>
                </select>
              </div>
            </div>

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
