import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Layout/PageTitle";
import Clearfix from "../../components/container/Clearfix";
import DashboardCards from "../../components/container/DashboardCards";

export default function Dasboard() {
  return (
    <>
      <PageTitle title={"Dashboard"} />

      <Clearfix classname={"row"}>
        <DashboardCards />
      </Clearfix>
      <Clearfix>
        <h2 style={{fontSize: '14px'}}>Requests Application</h2>
        <div className="table-responsive">
          <table className="table table-hover table-custom spacing5">
            <thead>
              <tr>
                <th style={{ width: 20 }}>#</th>
                <th>Client</th>
                <th style={{ width: 50 }}>Amount</th>
                <th style={{ width: 50 }}>Status</th>
                <th style={{ width: 110 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>01</span>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="avtar-pic w35 bg-red"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Avatar Name"
                    >
                      <span>SS</span>
                    </div>
                    <div className="ml-3">
                      <a href="page-invoices-detail.html" title>
                        South Shyanne
                      </a>
                      <p className="mb-0">south.shyanne@example.com</p>
                    </div>
                  </div>
                </td>
                <td>$1200</td>
                <td>
                  <span className="badge badge-success ml-0 mr-0">Done</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Send Invoice"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-envelope" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default "
                    title="Print"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-printer" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Delete"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-trash" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <span>04</span>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="avtar-pic w35 bg-green"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Avatar Name"
                    >
                      <span>KG</span>
                    </div>
                    <div className="ml-3">
                      <a href="javascript:void(0);" title>
                        Kevin Gill
                      </a>
                      <p className="mb-0">kevin.gill@example.com</p>
                    </div>
                  </div>
                </td>
                <td>$451</td>
                <td>
                  <span className="badge badge-warning  ml-0 mr-0">
                    Panding
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Send Invoice"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-envelope" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default "
                    title="Print"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-printer" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Delete"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-trash" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Clearfix>

      <Clearfix classname={'mt-4'}>
        <h2 style={{fontSize: '14px'}}>Registration Requests</h2>
        <div className="table-responsive">
          <table className="table table-hover table-custom spacing5">
            <thead>
              <tr>
                <th style={{ width: 20 }}>#</th>
                <th>Client</th>
                <th style={{ width: 50 }}>Amount</th>
                <th style={{ width: 50 }}>Status</th>
                <th style={{ width: 110 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>01</span>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="avtar-pic w35 bg-red"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Avatar Name"
                    >
                      <span>SS</span>
                    </div>
                    <div className="ml-3">
                      <a href="page-invoices-detail.html" title>
                        South Shyanne
                      </a>
                      <p className="mb-0">south.shyanne@example.com</p>
                    </div>
                  </div>
                </td>
                <td>$1200</td>
                <td>
                  <span className="badge badge-success ml-0 mr-0">Done</span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Send Invoice"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-envelope" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default "
                    title="Print"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-printer" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Delete"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-trash" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <span>04</span>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="avtar-pic w35 bg-green"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Avatar Name"
                    >
                      <span>KG</span>
                    </div>
                    <div className="ml-3">
                      <a href="javascript:void(0);" title>
                        Kevin Gill
                      </a>
                      <p className="mb-0">kevin.gill@example.com</p>
                    </div>
                  </div>
                </td>
                <td>$451</td>
                <td>
                  <span className="badge badge-warning  ml-0 mr-0">
                    Panding
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Send Invoice"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-envelope" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default "
                    title="Print"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-printer" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Delete"
                    data-toggle="tooltip"
                    data-placement="top"
                  >
                    <i className="icon-trash" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Clearfix>
    </>
  );
}
