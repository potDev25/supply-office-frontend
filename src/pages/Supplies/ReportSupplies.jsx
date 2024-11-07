import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ApplicantsTable from '../../components/Tables/ApplicantsTable';
import DepartmentsTable from '../../components/Tables/DepartmentsTable';
import { useStateContext } from '../../context/ContextProvider';
import SupplyTable from '../../components/Tables/SupplyTable';
import ReceivingSupplyTable from '../../components/Tables/ReceivingSupplyTable';
import ReportSuppliesTable from '../../components/Tables/ReportSuppliesTable';
import { useLocation } from 'react-router-dom';

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

export default function ReportSupplies() {
  const { user } = useStateContext();
  const [department, setDepartment] = useState({});
  const [costs, setCosts] = useState(0);
  const [supplies, setSupplies] = useState(0);

  const location = useLocation();

  // Create an instance of URLSearchParams to parse the query string
  const queryParams = new URLSearchParams(location.search);

  // Get month and year from query parameters
  const month = queryParams.get('month') || new Date().getMonth(); // Default to current month
  const year = queryParams.get('year') || new Date().getFullYear();

  // if(user.role !== 'general admin'){
  //   window.location.replace('/dashboard')
  // }
  return (
    <>
      <Breadcrumb pageName={`Materials And Issued Supplies`} />
      <p className="font-thin uppercase mb-2">{department.department_name}</p>

      <div className="mb-4 grid grid-cols-3 mt-3 gap-4">
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

        <div className="card bg-base-100 outline outline-1 outline-blue-100 shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{months[month - 1]} {year}</h2>
            <p className="font-semibold">For the Month</p>
          </div>
        </div>
      </div>

      <ReportSuppliesTable setDepartmentName={setDepartment} setCosts={setCosts} setCountSupplies={setSupplies}/>
    </>
  );
}
