import React from 'react'

export default function ApplicantHistoryTable() {
  return (
    <div className="table-responsive">
        <h2 style={{fontSize: '14px'}}>Transaction History</h2>
        <table className="table table-hover js-basic-example dataTable table-custom spacing5 mb-0">
            <thead>
                <tr>
                    <th>TID</th>
                    <th>Transaction</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>101</td>
                    <td>Business Certificate Issuance</td>
                    <td>2024-05-09</td>
                </tr>
                <tr>
                    <td>102</td>
                    <td>Business Certificate Issuance</td>
                    <td>2024-05-09</td>
                </tr>
                <tr>
                    <td>103</td>
                    <td>Business Certificate Issuance</td>
                    <td>2024-012-09</td>
                </tr>
                <tr>
                    <td>104</td>
                    <td>Business Certificate Issuance</td>
                    <td>2024-06-09</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
