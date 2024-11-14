import React, { useEffect, useState } from 'react';
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
import TopRequested from '../../components/Tables/TopRequested';
import TopReqChart from '../../components/Charts/TopReqChart';
import StockoutChart from '../../components/Charts/StockoutChart';
import axiosClient from '../../axiosClinet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

export default function ReportAnalysis() {
  const { user } = useStateContext();

  const [department, setDepartment] = useState({});
  const [costs, setCosts] = useState(0);
  const [supplies, setSupplies] = useState(0);
  const [categories, setCategories] = useState(0);
  const [categoriesData, setcategoriesData] = useState([]);
  const [stocksData, setStocksData] = useState([]);
  const [risData, setRisData] = useState([]);
  const [parData, setParData] = useState([]);
  const [year, setYear] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [status, setStatus] = useState({
    issued: 0,
    return: 0,
    unserviceable: 0,
  });

  const handleYearChange = (date) => {
    const newYear = date.getFullYear();
    const updatedDate = new Date(selectedDate.setFullYear(newYear));
    setSelectedDate(updatedDate); // Update the entire date, not just the year
    setYear(newYear);
  };

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

  const fetchData = async () => {
    try {
      // Use the `year` state if it has a value; otherwise, use the current year
      const selectedYear = year || new Date().getFullYear();

      const { data } = await axiosClient.get(`/reports-analysis`, {
        params: { year: selectedYear },
      });
      setStocksData(data.monthlyTotals)
      setParData(data.monthlyParTotals)
      setRisData(data.monthlyIssuedTotals)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Breadcrumb pageName="REPORT ANALYSIS OVERVIEW" />
      <div className='w-[180px]'>
        <label className="input input-bordered flex items-center gap-2">
          <DatePicker
            selected={selectedDate}
            showYearPicker
            onChange={handleYearChange}
            calendarClassName="bg-white border border-gray-300 shadow-lg rounded-lg p-2"
            dateFormat="yyyy"
          />
        </label>
      </div>
      {/* <div className="grid xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5">
        <TopRequested data={categoriesData} />
        <TopReqChart data={categoriesData} text="Total Costs Per Categories" />
      </div> */}

      <div className="grid xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-5">
        <ChartOne data={stocksData}/>
        <StockoutChart monthlyIssuedTotals={risData} monthlyParTotals={parData}/>
      </div>
    </>
  );
}
