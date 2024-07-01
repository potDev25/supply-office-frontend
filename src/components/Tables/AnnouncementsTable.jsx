import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { useEffect, useState } from 'react';
import AddAnnouncementModal from '../Modal/AddAnnouncementModal';
import Logo from '../../images/bipsu_new.png'
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axiosClinet';
import Loader from '../Loader/Loader';

const AnnoucementsTable = () => {
  const [request, setRequest] = useState();
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const {notification_error, setNotificationError, setNotification} = useStateContext()

  const openModal = (id) => {
    setRequest(id);
    document.getElementById('my_modal_2').showModal();
  };

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
  }, [limit, loading, page])

  // const data = [
  //   {title : 'School of Technology and Computer Studies'},
  //   {title : 'School of Nursing'},
  //   {title : 'School of Education'},
  //   {title : 'School of Tourism'},
  //   {title : 'School of Arts and Sciences'},
  //   {title : 'School of Criminal Justice'},
  // ]

  return (
    <div className="overflow-x-auto pt-2 pb-2.5 sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between mt-2 mb-2">
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
        </div>

        {/* <div className="flex items-center gap-2">
          <button className="btn btn-primary" onClick={(ev) => openModal(1)}>
            <i className="fa-solid fa-circle-plus"></i>
            Create
          </button>
        </div> */}
      </div>

      <AddAnnouncementModal />

      {
        loading ? <Loader/> : 

        <div className='mt-[50px] grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 fade-in'>
          {
            data.filter((data) => {
                  return search.toLowerCase === '' ? data : data.department_name.toLowerCase().includes(search) || data.department_type.toLowerCase().includes(search)
              }).map((data) => (
              <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-7">
                <div className="relative mx-4 -mt-6 flex items-center justify-center h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                  <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${data.logo}`} alt="" className='h-[150px] w-[150px] rounded-full'/>
                </div>
                <div className="p-6">
                  <h5 className="mb-2 capitalize block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {data.department_name}
                  </h5>
                </div>
                <div className="p-6 pt-0">
                  <button
                    data-ripple-light="true"
                    type="button"
                    className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      }

    </div>
  );
};

export default AnnoucementsTable;
