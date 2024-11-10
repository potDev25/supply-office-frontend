import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ApplicantsTable from '../../components/Tables/ApplicantsTable';
import DepartmentsTable from '../../components/Tables/DepartmentsTable';
import { useStateContext } from '../../context/ContextProvider';
import SupplyTable from '../../components/Tables/SupplyTable';
import ReceivingSupplyTable from '../../components/Tables/ReceivingSupplyTable';
import ParSupplyTable from '../../components/Tables/ParSupplyTable';
import ParReportTable from '../../components/Tables/ParReportTable';
import { useLocation } from 'react-router-dom';
import Stocks from '../../components/Charts/Stocks';
import ParReportChart from '../../components/Charts/ParReportChart';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function ParReport() {
  const { user } = useStateContext();

  const [department, setDepartment] = useState({});
  const [costs, setCosts] = useState(0);
  const [supplies, setSupplies] = useState(0);
  const [year, setYear] = useState(null);
  const [status, setStatus] = useState({
    issued: 0,
    return: 0,
    unserviceable: 0,
  });

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  // State to store the month
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(null);
  const [stocksData, setstocksData] = useState([]);

  // Function to update the month
  const updateMonth = () => {
    const newMonth = new Date().toLocaleString('default', { month: 'long' });
    if (month !== newMonth) {
      setMonth(newMonth);
    }
  }; // Default to current month

  // if(user.role !== 'general admin'){
  //   window.location.replace('/dashboard')
  // }
  return (
    <>
      <Breadcrumb pageName="PAR Reports" />
      <h2 className="font-semibold uppercase">
        {month ? months[month - 1] : currentMonth} {year || currentYear}
      </h2>
      <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-5 mb-5">
        <div>
          <div className="mb-4 grid grid-cols-3 mt-3 gap-4">
            <div className="card bg-base-100 outline outline-1 outline-blue-100 shadow-md">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{status.unserviceable}</h2>
                <p className="font-semibold">Unserviceable</p>
              </div>
            </div>

            <div className="card bg-base-100 outline outline-1 outline-blue-100 shadow-md">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{status.return}</h2>
                <p className="font-semibold">Return</p>
              </div>
            </div>

            <div className="card bg-base-100 outline outline-1 outline-blue-100 shadow-md">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{status.issued}</h2>
                <p className="font-semibold">Issued / Active</p>
              </div>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 mt-3 gap-4">
            <div className="card bg-base-100 outline outline-1 outline-blue-100 shadow-md">
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  <i class="fa-sharp fa-solid fa-peso-sign"></i> {costs}
                </h2>
                <p className="font-semibold">Total Costs</p>
              </div>
            </div>

            <div className="card bg-base-100 outline outline-1 outline-blue-100 shadow-md">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{supplies}</h2>
                <p className="font-semibold">Total Supplies</p>
              </div>
            </div>

            {/* <div className="card bg-base-100 outline outline-1 outline-blue-100 shadow-md">
              <div className="card-body items-center text-center">
                
                <p className="font-semibold">For the Month</p>
              </div>
            </div> */}
          </div>
        </div>

        <div>
          <ParReportChart data={stocksData} text="Status Total Cost Overview" />
        </div>
      </div>

      <ParReportTable
        setMonthProp={setMonth}
        setYearProp={setYear}
        setStatusProp={setStatus}
        setCosts={setCosts}
        setSuppliesprop={setSupplies}
        setStocksData={setstocksData}
      />
    </>
  );
}
