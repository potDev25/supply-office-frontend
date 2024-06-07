import React from "react";
import { Link } from "react-router-dom";

export default function ApplicantsData() {
  return (
    <div className="tab-pane show active" id="e_applicants">
      <div className="table-responsive">
        <table className="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Department Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w60">
                <label className="fancy-checkbox">
                  <input
                    className="checkbox-tick"
                    type="checkbox"
                    name="checkbox"
                  />
                  <span />
                </label>
                <div
                  className="avtar-pic w35 bg-red"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Avatar Name"
                >
                  <span>MN</span>
                </div>
              </td>
              <td>
                <div className="font-15">School of Technology and Computer Studies</div>
              </td>
              <td>
                <span>School Department</span>
              </td>
              <td>
                <span className="badge badge-success">Active</span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-default"
                  title="Edit"
                >
                  <i className="fa fa-eye" />
                </button>
                <button
                  className="btn btn-sm btn-default"
                  title="Edit"
                >
                  <i className="fa fa-edit" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-default js-sweetalert"
                  title="Delete"
                  data-type="confirm"
                >
                  <i className="fa fa-trash-o text-danger" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
