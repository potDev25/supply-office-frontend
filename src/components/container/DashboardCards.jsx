import React from "react";

export default function DashboardCards() {
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="card">
          <div className="body">
            <div className="d-flex align-items-center">
              <div className="icon-in-bg bg-indigo text-white rounded-circle">
                <i className="fa fa-users" />
              </div>
              <div className="ml-4">
                <span>Registered Users</span>
                <h4 className="mb-0 font-weight-medium">805</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="card">
          <div className="body">
            <div className="d-flex align-items-center">
              <div className="icon-in-bg bg-orange text-white rounded-circle">
                <i className="fa fa-desktop" />
              </div>
              <div className="ml-4">
                <span>Departments</span>
                <h4 className="mb-0 font-weight-medium">5,805</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="card">
          <div className="body">
            <div className="d-flex align-items-center">
              <div className="icon-in-bg bg-blue text-white rounded-circle">
                <i className="fa fa-sitemap" />
              </div>
              <div className="ml-4">
                <span>Total Pending Transactions</span>
                <h4 className="mb-0 font-weight-medium">5,805</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
