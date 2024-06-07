import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Layout/PageTitle";
import Clearfix from "../../components/container/Clearfix";
import DashboardCards from "../../components/container/DashboardCards";
import ChangeStatusModal from "../../components/modals/ChangeStatusModal";
import ReturnStatusModal from "../../components/modals/ReturnStatusModal";

export default function Dasboard() {
  const [changeStatus, setChangeStatus] = useState(false)
  const [returnStatus, setReturnStatus] = useState(false)
  const [requestId, setRequestId] = useState()

  const handleCloseStatusModal = () => {
    setChangeStatus(false)
  }

  const handleCloseReturnModal = () => {
    setReturnStatus(false)
  }

  const handleOpenStatusModal = (request_id) => {
    setRequestId(request_id)
    setChangeStatus(true)
  }

  const handleOpenReturnModal = (request_id) => {
    setRequestId(request_id)
    setReturnStatus(true)
  }
  return (
    <>
      <PageTitle title={"Dashboard"} />

      <Clearfix classname={"row"}>
        <DashboardCards />
      </Clearfix>
      <Clearfix>
        <div className="row">
          <div className="d-flex align-items-center col-lg-6 col-sm-12 col-md-12">
            <h2 style={{fontSize: '14px'}} className="mt-2 text-uppercase">On Process PPMP</h2>
            <input type="text" className="form-control ml-2" style={{width: '500px'}} placeholder="Search Department"/>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12" style={{gap: '5px'}}>
            <div className="d-flex" style={{gap: '5px', float: 'right'}}>
              <button className="btn btn-default border border-secondary btn-sm">For Review</button>
              <button className="btn btn-default border border-success btn-sm">Presidents Office</button>
              <button className="btn btn-default border border-primary btn-sm">VP Office</button>
              <button className="btn btn-default border border-warning btn-sm">Accounting Office</button>
              <button className="btn btn-default border border-danger btn-sm">Supply Office</button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-custom spacing5">
            <thead>
              <tr>
                <th style={{ width: 20 }}>#</th>
                <th>Department/Office</th>
                <th>Request By</th>
                <th>Paper Type</th>
                <th>File</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th>Action</th>
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
                      className="avtar-pic w30 bg-red"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Avatar Name"
                    >
                      <span>SS</span>
                    </div>
                    <div className="ml-3">
                      <a href="page-invoices-detail.html" title>
                        School of Technology and Computer Studies
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="">
                      <a href="page-invoices-detail.html" title>
                        South Shyanne
                      </a>
                      <p className="mb-0">Chairperson</p>
                    </div>
                  </div>
                </td>
                <td>PPMP</td>
                <td className="text-primary">
                  <span><i className="fa fa-download"></i> PDF FILE</span>
                </td>
                <td>
                  <span className="badge badge-secondary ml-0 mr-0">For Review</span>
                </td>
                <td>May 20, 2024</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Send Invoice"
                    data-toggle="tooltip"
                    data-placement="top"
                    onClick={ev => handleOpenStatusModal(1)}
                  >
                    <i className="fa fa-edit" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Send Invoice"
                    data-toggle="tooltip"
                    data-placement="top"
                    onClick={ev => handleOpenReturnModal(1)}
                  >
                    <i className="fa fa-chevron-right" />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <span>01</span>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className="avtar-pic w30 bg-red"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Avatar Name"
                    >
                      <span>SS</span>
                    </div>
                    <div className="ml-3">
                      <a href="page-invoices-detail.html" title>
                        School of Criminal Justice Education
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="">
                      <a href="page-invoices-detail.html" title>
                        South Shyanne
                      </a>
                      <p className="mb-0">Chairperson</p>
                    </div>
                  </div>
                </td>
                <td>PPMP</td>
                <td className="text-primary">
                  <span><i className="fa fa-download"></i> PDF FILE</span>
                </td>
                <td>
                  <span className="badge badge-success ml-0 mr-0">At The President</span>
                </td>
                <td>May 20, 2024</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Send Invoice"
                    data-toggle="tooltip"
                    data-placement="top"
                    onClick={ev => handleOpenStatusModal(1)}
                  >
                    <i className="fa fa-edit" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-default"
                    title="Send Invoice"
                    data-toggle="tooltip"
                    data-placement="top"
                    onClick={ev => handleOpenReturnModal(1)}
                  >
                    <i className="fa fa-chevron-right" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Clearfix>

      <ChangeStatusModal
        show={changeStatus}
        handleClose={handleCloseStatusModal}
        requestId={requestId}
      />

      <ReturnStatusModal
        show={returnStatus}
        handleClose={handleCloseReturnModal}
        requestId={requestId}
      />
    </>
  );
}

// d-flex align-items-center justify-content-between mb-2
