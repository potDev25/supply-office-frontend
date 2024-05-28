import React from "react";

export default function AddUser() {
  return (
    <div className="tab-pane show active" id="e_add">
      <div className="body">
        <div className="row clearfix">
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Employee ID"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email ID"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <input
                type="text"
                data-provide="datepicker"
                data-date-autoclose="true"
                className="form-control"
                placeholder="Start date *"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Role" />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group mt-3 mb-5">
              <input type="file" className="dropify" />
              <small id="fileHelp" className="form-text text-muted">
                This is some placeholder block-level help text for the above
                input. It's a bit lighter and easily wraps to a new line.
              </small>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Facebook"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Twitter"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Linkedin"
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="instagram"
              />
            </div>
          </div>
          <div className="col-12" style={{ display: "flex", gap: "5px" }}>
            <button type="button" className="btn btn-primary btn-round">
              ADD
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-round"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
