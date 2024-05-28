import React from "react";

export default function DepartmentsTab() {
  return (
    <div className="tab-pane show active" id="e_departments">
      <div className="table-responsive">
        <table className="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Department Head</th>
              <th>Total Employee</th>
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
                <div className="font-15">App Development</div>
              </td>
              <td>Frank Camly</td>
              <td>21</td>
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
              <td>04</td>
              <td>
                <div className="font-15">Support</div>
              </td>
              <td>Gary Camara</td>
              <td>84</td>
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
              <td>05</td>
              <td>
                <div className="font-15">Accounts</div>
              </td>
              <td>Fidel Tonn</td>
              <td>11</td>
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
              <td>06</td>
              <td>
                <div className="font-15">PHP Open Source</div>
              </td>
              <td>Maryam Amiri</td>
              <td>37</td>
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
              <td>07</td>
              <td>
                <div className="font-15">Design and Printing</div>
              </td>
              <td>Maryam Amiri</td>
              <td>17</td>
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
