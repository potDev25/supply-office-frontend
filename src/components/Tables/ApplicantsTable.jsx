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
import DefaultImage from '../../images/bipsu_new.png'

const ApplicantsTable = () => {
  const [request, setRequest] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [ids, setIds] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
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
      const response = await axiosClient.get(`/applicants?page=${page}&limit=${limit}`)
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
    .map(item => ({ id: parseInt(item.user_id) }));

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
        user.username ===name? {...user, isChecked:checked}:user);
        setData(checkedvalue);
    }
  }

  const handleAllDelete = async () => {
    if(ids.length > 0){
      setBtnLoading(true)
      try {
        await axiosClient.post('/applicants/batch-delete', ids);
        setLoading(true)
        setBtnLoading(false)
        setDeleteModal(false)
        setNotification('Users Deleted Successfully')
        setIds([])
      } catch (error) {
        console.log(error);
      }
    }else{
      setBtnLoading(false)
      setNotificationError('Nothing to Delete!')
    }
  }

  const deleteSingleUser = async () => {
    setBtnLoading(true)
    try {
      await axiosClient.post(`/applicants/destroy/${user_id}`);
      setLoading(true)
      setBtnLoading(false)
      setdeleteModalOne(false)
      setNotification('User Deleted Successfully')
    } catch (error) {
      console.log(error);
      setBtnLoading(false)
      setNotificationError('Unable to delete applicant!')
    }
  }

  const openDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const openDeleteModalOne = (user_id) => {
    setUserId(user_id)
    setdeleteModalOne(!deleteModalOne)
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className='flex items-center justify-between mt-2 mb-2'>
        <div className='flex items-center gap-2'>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow input-xs" onChange={ev => setSearch(ev.target.value)} placeholder="Search Users" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
          <select className="select select-primary w-[100px] max-w-xs" onChange={ev => setLimit(ev.target.value)}>
            <option disabled selected>Limit</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value=''>All</option>
          </select>
          {/* <button className="btn btn-outline" onClick={openDeleteModal}><i class="fa-solid fa-trash-can"></i> Mass Delete</button> */}
        </div>

        <div className='flex items-center gap-2'>
          <Link to={'/users/register'} className="btn btn-primary" onClick={ev => openModal(1)}>
          <i className="fa-solid fa-circle-plus"></i>
            Register User
          </Link>
        </div>

      </div>
      
      <AddApplicantModal/>
      <DeleteApplicantModal deleteApplicant={handleAllDelete} open={deleteModal} handleModal={openDeleteModal} loading={btnLoading}/>
      <DeleteApplicantModal deleteApplicant={deleteSingleUser} open={deleteModalOne} handleModal={openDeleteModalOne} loading={btnLoading}/>

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
              <th>User</th>
              <th>Position</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th className='text-center'>Action</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              data.filter((data) => {
                    return search.toLowerCase === '' ? data : data.lastname.toLowerCase().includes(search) || data.firstname.toLowerCase().includes(search)
                }).map((data) => (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" name={data.username} checked={data?.isChecked || false} onChange={ handleChange} className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={`${data.profile_image ? `${import.meta.env.VITE_API_BASE_URL}/storage/${data.profile_image}` : DefaultImage}`} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data.lastname} {data.firstname}</div>
                        <div className="text-sm opacity-50">{data.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className='capitalize'>
                    {data.position}
                  </td>
                  <td className='capitalize'>{data.role}</td>
                  <td>{
                    data.department_id ? data.department_name : 'N/A'  
                  }</td>
                  <td><div className={`badge ${data.status == 1 ? 'badge-success' : ''}  badge-outline`}>{data.status == 1 ? 'Online' : 'Offline'}</div></td>
                  <th className='flex gap-1 items-center justify-center mt-2'>
                    {/* <button className="btn btn-sm btn-default"><i class="fa-solid fa-eye"></i></button> */}
                    <Link to={`/users/edit/${data.user_id}`} className="btn btn-sm bg-green-600 text-white hover:bg-green-600"><i class="fa-solid fa-pen-to-square"></i></Link>
                    {/* <button className="btn btn-sm bg-red-800 text-white hover:bg-red-500" onClick={ev => openDeleteModalOne(data.user_id)}><i class="fa-solid fa-trash-can"></i></button> */}
                  </th>
                </tr>
              ))
            }
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>User</th>
              <th>Position</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
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

export default ApplicantsTable;
