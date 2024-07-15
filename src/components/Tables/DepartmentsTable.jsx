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

const DepartmentsTable = () => {
  const [request, setRequest] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [ids, setIds] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [departmentModal, setDepartmentModal] = useState(false)
  const [deleteModalOne, setdeleteModalOne] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [user_id, setUserId] = useState(false)
  const {notification_error, setNotificationError, setNotification} = useStateContext()

  const openModal = (id) => {
    setRequest(id)
    document.getElementById('my_modal_2').showModal()
  }

  const fetchData = async () => {
    // setLoading(true)
    try {
      const response = await axiosClient.get(`/departments?page=${page}&limit=${limit}`)
      setData(response.data.data)
      setLinks(response.data.links)
      console.log(response);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const incrementPage = () => {
    setLoading(true)
    setPage(page + 1)
  }

  const minusPage = () => {
    setLoading(true)
    if(page > 1){
      setPage(page - 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [loading, page, limit])

  useEffect(() => {
    const checkedInputValue = data
    .filter(item => item.isChecked) // Simplified filter condition
    .map(item => ({ id: parseInt(item.id) }));

    setIds(prevIds => [
      ...prevIds,
      ...checkedInputValue
    ]); 
  }, [data])

  const handleChange=(e)=>{ 
    setIds([])
    const { name, checked}= e.target;
      if(name==="allselect")
      {
        const checkedvalue = data.map( (user)=>{ return {...user, isChecked:checked}});
        setData(checkedvalue);
      } else{
        const checkedvalue= data.map( (user)=>
        user.name ===name? {...user, isChecked:checked}:user);
        setData(checkedvalue);
    }
  }

  const handleAllDelete = async () => {
    if(ids.length > 0){
      setBtnLoading(true)
      try {
        await axiosClient.post('/departments/batch-delete', ids);
        setLoading(true)
        setBtnLoading(false)
        setDeleteModal(false)
        setNotification('Department Deleted Successfully')
        setIds([])
      } catch (error) {
        console.log(error);
        setNotificationError('Unable to delete departments')
      }
    }else{
      setBtnLoading(false)
      setNotificationError('Nothing to Delete!')
    }
  }

  const deleteSingleUser = async () => {
    setBtnLoading(true)
    try {
      await axiosClient.post(`/departments/destroy/${user_id}`);
      setLoading(true)
      setBtnLoading(false)
      setdeleteModalOne(false)
      setNotification('User Deleted Successfully')
    } catch (error) {
      console.log(error);
      setBtnLoading(false)
      setNotificationError('Unable to delete this department!')
    }
  }

  const openDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleDepartmentModal = () => {
    setDepartmentModal(!departmentModal)
  }

  const openDeleteModalOne = (user_id) => {
    setUserId(user_id)
    setdeleteModalOne(!deleteModalOne)
  }

  const handleBtnLoading = (btn) => {
    setBtnLoading(btn)
  }

  const handlePageLoading = () => {
    setLoading(true)
  }

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

      <div className='flex items-center justify-between mt-2 mb-2'>
        <div className='flex items-center gap-2'>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow input-xs" onChange={ev => setSearch(ev.target.value)} placeholder="Search Departments" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
          <select className="select select-primary w-[100px] max-w-xs" onChange={ev => setLimit(ev.target.value)}>
            <option disabled selected>Limit</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='10000'>All</option>
          </select>
          <button className="btn btn-outline" onClick={openDeleteModal}><i class="fa-solid fa-trash-can"></i> Mass Delete</button>
        </div>

        <div className='flex items-center gap-2'>
          <button className="btn btn-primary" onClick={handleDepartmentModal}>
          <i className="fa-solid fa-circle-plus"></i>
            Add Department
          </button>
        </div>

      </div>
      
      <AddApplicantModal/>
      <DeleteApplicantModal text={'Delete Departments?'} deleteApplicant={handleAllDelete} open={deleteModal} handleModal={openDeleteModal} loading={btnLoading}/>
      <DeleteApplicantModal text={'Delete Departments?'} deleteApplicant={deleteSingleUser} open={deleteModalOne} handleModal={openDeleteModalOne} loading={btnLoading}/>
      <AddDepartmentModal handlePageLoading={handlePageLoading} open={departmentModal} handleModal={handleDepartmentModal} loading={btnLoading} handleBntLoading={handleBtnLoading}/>

      {
        loading ? <Loader/> : 
        <table className="table table-zebra fade-in">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" name="allselect" checked= { !data.some( (user)=>user?.isChecked!==true)} onChange={ handleChange} className="checkbox" />
                </label>
              </th>
              <th>Department Name</th>
              <th>Department Type</th>
              <th>Created At</th>
              <th className='text-center'>Action</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              data.filter((data) => {
                    return search.toLowerCase === '' ? data : data.department_name.toLowerCase().includes(search) || data.department_type.toLowerCase().includes(search)
                }).map((data) => (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" name={data.name} checked={data?.isChecked || false} onChange={ handleChange} className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${data.logo}`} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold capitalize">{data.department_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className='capitalize'>
                    {data.department_type}
                  </td>
                  <td className='capitalize'>{formatDate(data.created_at)}</td>
                  <th className='flex gap-1 items-center justify-center mt-2'>
                    {/* <button className="btn btn-sm btn-default"><i class="fa-solid fa-eye"></i></button> */}
                    <button className="btn btn-sm bg-red-800 text-white hover:bg-red-500" onClick={ev => openDeleteModalOne(data.id)}><i class="fa-solid fa-trash-can"></i></button>
                  </th>
                </tr>
              ))
            }
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Department Name</th>
              <th>Department Type</th>
              <th>Created At</th>
              <th className='text-center'>Action</th>
              {/* <th></th> */}
            </tr>

          </tfoot>
          
        </table>
      }
      <div className='flex items-center justify-between mt-2 mb-2'>
        <div></div>
        <div className="join">
          <button className="join-item btn" onClick={ev => minusPage()} disabled={page == 1 ? true : false}>«</button>
          <button className="join-item btn">Page {page}</button>
          <button className="join-item btn" onClick={ev => incrementPage()} disabled={loading || links.length == 3 ? true : false}>»</button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsTable;
