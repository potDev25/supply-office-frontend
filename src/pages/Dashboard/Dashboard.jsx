import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import RequestTable from '../../components/Tables/RequestTable';
import { useStateContext } from '../../context/ContextProvider';
import PendingRequests from '../../components/Tables/PendingRequests';
import PurchaseRequestTable from '../../components/Tables/PurchaseRequestTable';
import PurchaseOrderTable from '../../components/Tables/PurchaseOrderTable';
import axiosClient from '../../axiosClinet';

export default function Dashboard() {
  const { user } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [numbers, setNumbers] = useState({
    departments: 0,
    po: 0,
    pr: 0,
    users: 0,
  });

  const getNumbers = async () => {
    try {
      const { data } = await axiosClient.get('/dashboard');
      setNumbers({
        departments: data.departments,
        po: data.po,
        pr: data.pr,
        users: data.users,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoading = (bool) => {
    console.log(bool);
    setLoading(bool);
  };

  useEffect(() => {
    getNumbers();
  }, []);

  return (
    <>
      {user.role === 'general admin' || user.role === 'supply office' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Departments" total={numbers.departments}>
            <i class="fa-solid fa-building-columns"></i>
          </CardDataStats>
          <CardDataStats title="Total Supplies" total={numbers.pr}>
            <i class="fa-regular fa-newspaper"></i>
          </CardDataStats>
          <CardDataStats title="Total Requisition and Issue Slip" total={numbers.po}>
            <i class="fa-solid fa-newspaper"></i>
          </CardDataStats>
          <CardDataStats title="Total Users" total={numbers.users}>
            <i class="fa-solid fa-users"></i>
          </CardDataStats>
        </div>
      ) : null}

<div className="col-span-12 xl:col-span-12">
        {
          user.role === 'admin' ? 
          <>
             <PendingRequests/>
          </>
          : 
          null
        }
      </div>

      
    </>
  );
}
