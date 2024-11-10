import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { useEffect, useState } from 'react';
import AddApplicantModal from '../Modal/AddApplicantModal';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import axiosClient from '../../axiosClinet';
import DeleteApplicantModal from '../Modal/DeleteApplicantModal';
import { useStateContext } from '../../context/ContextProvider';
import AddDepartmentModal from '../Modal/AddDepartmentModal';
import EditDepartmentModal from '../Modal/EditDepartmentModal';
import { Box, Image } from '@chakra-ui/react';
import StoreSupplyModal from '../Modal/StoreSupplyModal';
import StoreParSupplyModal from '../Modal/StoreParSupplyModal';
import { Badge } from '@chakra-ui/react';
import UpdateParStatusModal from '../Modal/UpdateParStatusModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ParReportTable = ({setMonthProp, setYearProp, setStatusProp, setCosts, setSuppliesprop, setStocksData}) => {
  const [request, setRequest] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [item, setItem] = useState({});
  const [ids, setIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);
  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const [department, setDepartment] = useState([]);
  const [clients, setClients] = useState([]);
  const [deleteModalOne, setdeleteModalOne] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [user_id, setUserId] = useState(false);
  const [filteredClient, setFilteredClient] = useState('');
  const [status, setStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();
  const {
    notification_error,
    setNotificationError,
    setNotification,
    setSupplies,
  } = useStateContext();

  const [months, setMonths] = useState([
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ]);
  const [filteredMonth, setFilteredMonth] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const openModal = (id) => {
    setRequest(id);
    document.getElementById('my_modal_2').showModal();
  };

  const handleYearChange = (date) => {
    const newYear = date.getFullYear();
    const updatedDate = new Date(selectedDate.setFullYear(newYear));
    setSelectedDate(updatedDate); // Update the entire date, not just the year
    setYear(newYear);
    setYearProp(newYear)
  };

  const fetchData = async () => {
    const current = filteredMonth || new Date().getMonth() + 1;
    // setLoading(true)
    try {
      const { data } = await axiosClient.get(
        `/par-reports?page=${page}&limit=${limit}&month=${current}&year=${year}&client=${filteredClient}&status=${status}`,
      );
      setData(data.data.data);
      setLinks(data.data.links);
      setSupplies(data.supplies);
      setClients(data.clients)
      setLoading(false);
      setStocksData(data.stocks_data)
      setStatusProp({
        issued: data.status.issued,
        return: data.status.return,
        unserviceable: data.status.unserviceable,
      })
      setCosts(data.totalValueSum.total_value_sum ?? 0)
      setSuppliesprop(data.total_query_supply)
    } catch (error) {
      setLoading(false);
    }
  };

  const handleStatusModal = (data) => {
    setItem(data);
    setUpdateStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setItem({});
    setUpdateStatusModal(false);
  };

  const incrementPage = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const minusPage = () => {
    setLoading(true);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const setMonthSelect = (ev) => {
    setFilteredMonth(ev.target.value)
    setMonthProp(ev.target.value)
  }

  useEffect(() => {
    fetchData();
  }, [loading, page, limit, filteredMonth, year, filteredClient, status]);

  useEffect(() => {
    const checkedInputValue = data
      .filter((item) => item.isChecked) // Simplified filter condition
      .map((item) => ({ id: parseInt(item.id) }));

    setIds((prevIds) => [...prevIds, ...checkedInputValue]);
  }, [data]);

  const handleChange = (e) => {
    setIds([]);
    const { name, checked } = e.target;
    if (name === 'allselect') {
      const checkedvalue = data.map((user) => {
        return { ...user, isChecked: checked };
      });
      setData(checkedvalue);
    } else {
      const checkedvalue = data.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user,
      );
      setData(checkedvalue);
    }
  };

  const handleAllDelete = async () => {
    if (ids.length > 0) {
      setBtnLoading(true);
      try {
        await axiosClient.post('/departments/batch-delete', ids);
        setLoading(true);
        setBtnLoading(false);
        setDeleteModal(false);
        setNotification('Department Deleted Successfully');
        setIds([]);
      } catch (error) {
        console.log(error);
        setNotificationError('Unable to delete departments');
      }
    } else {
      setBtnLoading(false);
      setNotificationError('Nothing to Delete!');
    }
  };

  const deleteSingleUser = async () => {
    setBtnLoading(true);
    try {
      await axiosClient.post(`/departments/destroy/${user_id}`);
      setLoading(true);
      setBtnLoading(false);
      setdeleteModalOne(false);
      setNotification('User Deleted Successfully');
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
      setNotificationError('Unable to delete this department!');
    }
  };

  const openDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const handleDepartmentModal = () => {
    setDepartmentModal(!departmentModal);
  };

  const openDeleteModalOne = (user_id) => {
    setUserId(user_id);
    setdeleteModalOne(!deleteModalOne);
  };

  const openEditModal = (data) => {
    setDepartment(data);
    setEditDepartment(!editDepartment);
  };

  const hideEditModal = () => {
    setDepartment([]);
    setEditDepartment(false);
  };

  const handleBtnLoading = (btn) => {
    setBtnLoading(btn);
  };

  const handlePageLoading = () => {
    setLoading(true);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Manila',
    };
    const formatter = new Intl.DateTimeFormat('en-PH', options);
    return formatter.format(date);
  }

  function formatToPeso(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  function formatPeso(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  return (
    <>
      <div className="mb-4 overflow-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className={'flex items-center gap-2'}>
            <div>
              <h1 className="uppercase font-bold">Filters</h1>
            </div>
            <div>
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={(ev) => setMonthSelect(ev)}
              >
                <option disabled selected>
                  -- Filter Month --
                </option>
                {months.map((m) => (
                  <option value={m.value}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
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
          </div>

          <div className={'flex items-center gap-2'}>
            <div>
              <select className="select select-bordered w-full max-w-xs" onChange={ev => setFilteredClient(ev.target.value)}>
                <option disabled selected>
                  -- Filter Client --
                </option>
                <option value="">All</option>
                {
                  clients.length > 0 ? (<>
                    {
                      clients.map((item) => (
                        <option value={item.user_id}>{item.client_name}</option>
                      ))
                    }
                  </>) : (
                    <option disabled>No Client Found</option>
                  )
                }
              </select>
            </div>
            <div>
              <select className="select select-bordered w-full max-w-xs" onChange={ev => setStatus(ev.target.value)}>
                <option disabled selected>
                  -- Filter Status --
                </option>
                <option value={''}>All</option>
                <option>Unserviceable</option>
                <option>Return</option>
                <option>Issued</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex items-center justify-between mt-2 mb-2">
          <div className="flex items-center gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow input-xs"
                onChange={(ev) => setSearch(ev.target.value)}
                placeholder="Search Supply | Description"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <select
              className="select select-primary w-[100px] max-w-xs"
              onChange={(ev) => setLimit(ev.target.value)}
            >
              <option disabled selected>
                Limit
              </option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="10000">All</option>
            </select>
            {/* <button className="btn btn-outline" onClick={openDeleteModal}>
              <i class="fa-solid fa-trash-can"></i> Mass Delete
            </button> */}
          </div>

          <div className="flex items-center gap-2">
            {/* <button
              onClick={(ev) => setDepartmentModal(true)}
              className="btn btn-primary"
              to={'/supply/add'}
            >
              <i className="fa-solid fa-circle-plus"></i>
              Assign Supply
            </button> */}
          </div>
        </div>

        <AddApplicantModal />
        <DeleteApplicantModal
          text={'Delete Departments?'}
          deleteApplicant={handleAllDelete}
          open={deleteModal}
          handleModal={openDeleteModal}
          loading={btnLoading}
        />
        <DeleteApplicantModal
          text={'Delete Departments?'}
          deleteApplicant={deleteSingleUser}
          open={deleteModalOne}
          handleModal={openDeleteModalOne}
          loading={btnLoading}
        />
        <StoreParSupplyModal
          handlePageLoading={handlePageLoading}
          open={departmentModal}
          handleModal={handleDepartmentModal}
          loading={btnLoading}
          handleBntLoading={handleBtnLoading}
        />
        <UpdateParStatusModal
          handlePageLoading={handlePageLoading}
          open={updateStatusModal}
          handleModal={handleCloseStatusModal}
          loading={btnLoading}
          handleBntLoading={handleBtnLoading}
          data={item}
        />
        <EditDepartmentModal
          handlePageLoading={handlePageLoading}
          open={editDepartment}
          handleModal={hideEditModal}
          loading={btnLoading}
          department={department}
          handleBntLoading={handleBtnLoading}
        />

        {loading ? (
          <Loader />
        ) : (
          <table className="table table-zebra fade-in overflow-auto mb-3">
            {/* head */}
            <thead>
              <tr>
                {/* <th>
                  <label>
                    <input
                      type="checkbox"
                      name="allselect"
                      checked={!data.some((user) => user?.isChecked !== true)}
                      onChange={handleChange}
                      className="checkbox"
                    />
                  </label>
                </th> */}
                {/* <th>Receiving ID</th> */}
                <th>Client Name</th>
                <th>Supply Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Total Costs</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Added Date</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                <>
                  {data
                    .filter((data) => {
                      return search.toLowerCase === ''
                        ? data
                        : data.supply_name.toLowerCase().includes(search) ||
                            data.client_name.toLowerCase().includes(search) ||
                            data.description.toLowerCase().includes(search);
                    })
                    .map((data) => (
                      <tr>
                        <td className="capitalize font-bold">
                          {data.client_name}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="font-bold capitalize">
                                {data.supply_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="capitalize">{data.description}</td>
                        <td className="capitalize">{data.name}</td>
                        <td className="capitalize">{data.unit}</td>
                        <td className="capitalize">{formatPeso(data.total_value)}</td>
                        <td className="capitalize">
                          {data.status == 'issued' && (
                            <Badge colorScheme="green">Issued</Badge>
                          )}
                          {data.status == 'return' && (
                            <Badge colorScheme="gray">Return</Badge>
                          )}
                          {data.status == 'unserviceable' && (
                            <Badge colorScheme="red">Unserviceable</Badge>
                          )}
                        </td>
                        <td className="capitalize">{data.qnty}</td>
                        <td className="capitalize">
                          {formatDate(data.created_at)}
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <tr>
                  <td className="text-center" colSpan={8}>
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <div className="flex items-center justify-between mt-2 mb-2">
          <div></div>
          <div className="join">
            <button
              className="join-item btn"
              onClick={(ev) => minusPage()}
              disabled={page == 1 ? true : false}
            >
              «
            </button>
            <button className="join-item btn">Page {page}</button>
            <button
              className="join-item btn"
              onClick={(ev) => incrementPage()}
              disabled={loading || links.length == 3 ? true : false}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParReportTable;
