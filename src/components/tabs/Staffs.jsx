import React from "react";
import { Link } from "react-router-dom";

export default function Staffs() {
  return (
    <div className="tab-pane" id="e_list">
      <div className="table-responsive">
        <table className="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Registered Date</th>
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
                <div className="font-15">Marshall Nichols</div>
                <span className="text-muted">marshall-n@gmail.com</span>
              </td>
              <td>
                <span>Marshall</span>
              </td>
              <td>
                <span>Supply Office</span>
              </td>
              <td>24 Jun, 2015</td>
              <td>
                <Link
                  type="button"
                  className="btn btn-sm btn-default"
                  title="Edit"
                  to={`/users/view/90`}
                >
                  <i className="icon-eye" />
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-default js-sweetalert"
                  title="Delete"
                  data-type="confirm"
                >
                  <i className="icon-ban text-warning" />
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
