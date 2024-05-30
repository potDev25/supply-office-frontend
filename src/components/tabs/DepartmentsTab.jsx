import React from "react";

export default function DepartmentsTab() {
  return (
    <div className="tab-pane show active" id="e_departments">
      <div className="table-responsive">
        <table className="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Business Name</th>
              <th>Business Owner</th>
              <th>Business Address</th>
              <th>Registration Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>
                <div className="font-15">Web Development</div>
              </td>
              <td>John Smith</td>
              <td>102</td>
              <td>
                <span className="badge badge-danger ml-0 mr-0">Expired</span>
              </td>
              <td>
                <button
                  type="button"
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
            <tr>
              <td>03</td>
              <td>
                <div className="font-15">Marketing</div>
              </td>
              <td>Maryam Amiri</td>
              <td>13</td>
              <td>
                <span className="badge badge-warning ml-0 mr-0">Pending</span>
              </td>
              <td>
                <button
                  type="button"
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
            <tr>
              <td>02</td>
              <td>
                <div className="font-15">Marketing</div>
              </td>
              <td>Maryam Amiri</td>
              <td>13</td>
              <td>
                <span className="badge badge-success ml-0 mr-0">Registered</span>
              </td>
              <td>
                <button
                  type="button"
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
