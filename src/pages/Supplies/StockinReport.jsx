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
import StockinReportTable from '../../components/Tables/StockinReportTable';
import CategoriesCostTable from '../../components/Tables/CategoriesCostTable';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import Stocks from '../../components/Charts/Stocks';

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

export default function StockinReport() {
  const { user } = useStateContext();

  const [department, setDepartment] = useState({});
  const [costs, setCosts] = useState(0);
  const [supplies, setSupplies] = useState(0);
  const [categories, setCategories] = useState(0);
  const [categoriesData, setcategoriesData] = useState([]);
  const [stocksData, setStocksData] = useState([]);
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
      <Breadcrumb pageName="STOCK-IN REPORTS" />

      <div className="mb-4 grid grid-cols-4 mt-3 gap-4">
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
            <h2 className="card-title">{categories}</h2>
            <p className="font-semibold">Total Categories</p>
          </div>
        </div>

        <div className="card bg-base-100 outline outline-1 outline-blue-100 shadow-md">
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              {month ? months[month - 1] : currentMonth} {year || currentYear}
            </h2>
            <p className="font-semibold">For the Month</p>
          </div>
        </div>
      </div>
      <StockinReportTable
        setMonthProp={setMonth}
        setYearProp={setYear}
        setStatusProp={setStatus}
        setCosts={setCosts}
        setCountSupplies={setSupplies}
        setCountCategories={setCategories}
        setCostCategories={setcategoriesData}
        setStocksData={setStocksData}
      />

      <div className="grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5">
        <CategoriesCostTable data={categoriesData} />
        <ChartTwo data={categoriesData} text='Total Costs Per Categories'/>
      </div>

      <div className="grid xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-5">
        <Stocks data={stocksData} text='Stocks Overview'/>
      </div>
    </>
  );
}
