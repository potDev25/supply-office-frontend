import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { useEffect, useState } from 'react';
import AddApplicantModal from '../Modal/AddApplicantModal';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import axiosClient from '../../axiosClinet';
import DeleteApplicantModal from '../Modal/DeleteApplicantModal';
import { useStateContext } from '../../context/ContextProvider';
import AddDepartmentModal from '../Modal/AddDepartmentModal';
import EditDepartmentModal from '../Modal/EditDepartmentModal';
import { Button } from '@chakra-ui/react';
import AddCategoryModal from '../Modal/AddCategoryModal';
import EditCategoryModal from '../Modal/EditCategoryModal';
import AddReceivingModal from '../Modal/AddReceivingModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportByDepartmentTable = () => {
  const [request, setRequest] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [ids, setIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);
  const [department, setDepartment] = useState([]);
  const [deleteModalOne, setdeleteModalOne] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [user_id, setUserId] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { notification_error, setNotificationError, setNotification } =
    useStateContext();
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
  const [filteredMonth, setFilteredMonth] = useState(null)
  const [year, setYear] = useState(new Date().getFullYear());

  const openModal = (id) => {
    setRequest(id);
    document.getElementById('my_modal_2').showModal();
  };

  const fetchData = async () => {
    const current = filteredMonth || new Date().getMonth() + 1;
    try {
      const { data: responseData } = await axiosClient.get(
        `/reports-supply?page=${page}&limit=${limit}&month=${current}&year=${year}`,
      );

      // Parse costs to numbers and sort in descending order
      const sortedData = responseData.department_data.sort((a, b) => {
        // Remove commas from costs and convert to numbers for sorting
        const costA = parseFloat(a.costs.replace(/,/g, ''));
        const costB = parseFloat(b.costs.replace(/,/g, ''));
        return costB - costA; // Sort in descending order
      });

      setData(sortedData);
      setLinks(responseData.departments.links);
      console.log(responseData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleYearChange = (date) => {
    const newYear = date.getFullYear();
    const updatedDate = new Date(selectedDate.setFullYear(newYear));
    setSelectedDate(updatedDate); // Update the entire date, not just the year
    setYear(newYear)
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

  useEffect(() => {
    fetchData();
  }, [loading, page, limit, filteredMonth, year]);

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

  return (
    <div className="overflow-x-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center gap-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow input-xs"
              onChange={(ev) => setSearch(ev.target.value)}
              placeholder="Search Receiving ID | supplier"
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
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(ev) => setFilteredMonth(ev.target.value)}
          >
            <option disabled selected>
              Filter Month
            </option>
            {
              months.map((m) => (
                <option value={m.value}>{m.name}</option>
              ))
            }
          </select>
          {/* <button className="btn btn-outline" onClick={openDeleteModal}>
            <i class="fa-solid fa-trash-can"></i> Mass Delete
          </button> */}
        </div>

        <div className="flex items-center gap-2">
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
      <AddReceivingModal
        handlePageLoading={handlePageLoading}
        open={departmentModal}
        handleModal={handleDepartmentModal}
        loading={btnLoading}
        handleBntLoading={handleBtnLoading}
      />
      <EditCategoryModal
        handlePageLoading={handlePageLoading}
        open={editDepartment}
        handleModal={hideEditModal}
        loading={btnLoading}
        category={department}
        handleBntLoading={handleBtnLoading}
      />

      {loading ? (
        <Loader />
      ) : (
        <table className="table table-zebra fade-in">
          {/* head */}
          <thead>
            <tr>
              <th>Department / Office Name</th>
              <th>Total Number Supplies</th>
              <th>Total Costs</th>
              <th className="text-center">Option</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {data.length == 0 ? (
              <tr>
                <td className="text-center" colSpan={5}>
                  No Data
                </td>
              </tr>
            ) : (
              <>
                {data
                  .filter((data) => {
                    return search.toLowerCase === ''
                      ? data
                      : data.department_name.toLowerCase().includes(search);
                  })
                  .map((data) => (
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold capitalize">
                              {data.department_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="capitalize">{data.total}</td>
                      <td className="capitalize">
                        <i class="fa-solid fa-peso-sign"></i> {data.costs}
                      </td>
                      <th className="flex gap-1 items-center justify-center mt-2">
                        <Link
                          className="btn btn-outline btn-sm btn-primary text-white hover:bg-red-500"
                          to={`/issued/transactions/view/${data.department_id}?month=${filteredMonth || new Date().getMonth() + 1}&year=${year}`}
                        >
                          View Data
                        </Link>
                      </th>
                    </tr>
                  ))}
              </>
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
  );
};

export default ReportByDepartmentTable;
