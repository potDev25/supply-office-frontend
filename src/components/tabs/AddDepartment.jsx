import React from "react";

export default function AddDepartment() {
  return (
    <div className="tab-pane" id="e_add">
      <div className="body">
        <div className="row clearfix">
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Departments Name"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Departments Head"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="No of Employee"
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
