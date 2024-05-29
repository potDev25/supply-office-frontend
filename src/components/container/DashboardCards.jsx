import React from "react";

export default function DashboardCards() {
  return (
    <>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <div className="d-flex align-items-center">
              <div className="icon-in-bg bg-indigo text-white rounded-circle">
                <i className="fa fa-briefcase" />
              </div>
              <div className="ml-4">
                <span>Total income</span>
                <h4 className="mb-0 font-weight-medium">$7,805</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <div className="d-flex align-items-center">
              <div className="icon-in-bg bg-orange text-white rounded-circle">
                <i className="fa fa-users" />
              </div>
              <div className="ml-4">
                <span>Applicants</span>
                <h4 className="mb-0 font-weight-medium">5,805</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <div className="d-flex align-items-center">
              <div className="icon-in-bg bg-blue text-white rounded-circle">
                <i className="icon-basket" />
              </div>
              <div className="ml-4">
                <span>Registered Businesses</span>
                <h4 className="mb-0 font-weight-medium">5,805</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="body">
            <div className="d-flex align-items-center">
              <div className="icon-in-bg bg-pink text-white rounded-circle">
                <i className="icon-share-alt" />
              </div>
              <div className="ml-4">
                <span>Pending Requests</span>
                <h4 className="mb-0 font-weight-medium">5,805</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
