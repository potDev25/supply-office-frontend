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
              <th>Employee ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Registered Date</th>
              <th>Business Name</th>
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
                <span>LA-0215</span>
              </td>
              <td>
                <span>+ 264-625-2583</span>
              </td>
              <td>24 Jun, 2015</td>
              <td>Web Designer</td>
              <td>
                <Link
                  to={'/applicant/view/12'}
                  className="btn btn-sm btn-default"
                  title="Edit"
                >
                  <i className="fa fa-eye" />
                </Link>
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
                <img
                  src="../assets/images/xs/avatar1.jpg"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Avatar Name"
                  alt="Avatar"
                  className="w35 h35 rounded"
                />
              </td>
              <td>
                <div className="font-15">Susie Willis</div>
                <span className="text-muted">sussie-w@gmail.com</span>
              </td>
              <td>
                <span>LA-0216</span>
              </td>
              <td>
                <span>+ 264-625-2583</span>
              </td>
              <td>28 Jun, 2015</td>
              <td>Web Developer</td>
              <td>
                <Link
                  to={'/applicant/view/12'}
                  className="btn btn-sm btn-default"
                  title="Edit"
                >
                  <i className="fa fa-eye" />
                </Link>
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
                  className="avtar-pic w35 bg-pink"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Avatar Name"
                >
                  <span>MN</span>
                </div>
              </td>
              <td>
                <div className="font-15">Debra Stewart</div>
                <span className="text-muted">debra@gmail.com</span>
              </td>
              <td>
                <span>LA-0218</span>
              </td>
              <td>
                <span>+ 264-625-2583</span>
              </td>
              <td>21 July, 2015</td>
              <td>Web Developer</td>
              <td>
                <Link
                  to={'/applicant/view/12'}
                  className="btn btn-sm btn-default"
                  title="Edit"
                >
                  <i className="fa fa-eye" />
                </Link>
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
