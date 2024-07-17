import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import Logo from '../../images/logoBipsu.png'
import { useEffect, useState } from 'react';
import ProceedModal from '../Modal/ProceedModal';
import ReturnModal from '../Modal/ReturnModal';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../axiosClinet';
import Loader from '../Loader/Loader';
import CancelModal from '../Modal/CancelModal';
import { useStateContext } from '../../context/ContextProvider';
import FileModal from '../Modal/FileModal';

const ArchiveTable = () => {
  const [request, setRequest] = useState()
  const [openProceedModal, setProceedModal] = useState(false)
  const [openReturnModal, setReturnModal] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [dataRequest, setDataRequest] = useState({})
  const [cancel, setCancel] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [fileModal, setFileModal] = useState(false)
  const [documentId, setDocumentId] = useState(null)
  const [status, setStatus] = useState(null)
  const [number, setNumber] = useState({})
  const [file, setFile] = useState(null)
  const {setNotification, setNotificationError} = useStateContext()
  const {id} = useParams()

  const fetchData = async () => {
    try {
      const {data} = await axiosClient.get(`/documents/archives/${id}${status ? `?status=${status}` : ''}`)
      setRequests(data.data)
      setNumber(data.numbers)
      setTableLoading(false)
    } catch (error) {
      setTableLoading(false)
      console.log(error);
    }
  }

  const handleProceedModal = (data) => {
    setDataRequest(data)
    setProceedModal(!openProceedModal)
  } 

  const handleCancelModal = () => {
    setCancel(!cancel)
  } 

  const handleFileModal = (file) => {
    setFile(file)
    setFileModal(!fileModal)
  } 

  const handleTableLoading = () => {
    setTableLoading(true)
  }

  const handleReturnModal = (data) => {
    setDataRequest(data)
    setReturnModal(!openReturnModal)
  } 

  useEffect(() => {
    fetchData()
  }, [tableLoading, status])

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

  const handleCancelClick = (id) => {
    setCancel(true)
    setDocumentId(id)
  } 

  const handleCancelAction = async (id) => {
    setBtnLoading(true)
    try {
      const {data} = await axiosClient.post(`/documents/cancel/${id}`)
      setBtnLoading(false)
      setNotification('Transaction Cancel Successfully')
      setTableLoading(true)
    } catch (error) {
      setNotificationError('Server Error, Please Try Again Later')
      setBtnLoading(false)
    }
  }

  const handleStatus = (ev) => {
    setTableLoading(true)
    setStatus(ev.target.value)
  }

  return (
    <div className="lg:overflow-x-visible sm:overflow-x-auto md:overflow-x-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className='lg:flex items-center justify-between p-2 sm:block'>
        <div className='lg:flex items-center gap-5 sm:block'>
          <div>
            <h1 className='font-medium'>Pending Requests</h1>
          </div>
          <div className='flex items-center gap-1'>
            <h1 className='font-medium text-sm mt-0.5'>President's Office</h1>
            <div className="badge bg-red-500 text-white text-xs">{number.president_office}</div>
          </div>
          <div className='flex items-center gap-1'>
            <h1 className='font-medium text-sm mt-0.5'>Accounting Office</h1>
            <div className="badge bg-red-500 text-white text-xs">{number.accounting_office}</div>
          </div>
          <div className='flex items-center gap-1'>
            <h1 className='font-medium text-sm mt-0.5'>Office Supply</h1>
            <div className="badge bg-red-500 text-white text-xs">{number.office_supply}</div>
          </div>
          <div className='flex items-center gap-1'>
            <h1 className='font-medium text-sm mt-0.5'>For Review</h1>
            <div className="badge bg-red-500 text-white text-xs">{number.for_review}</div>
          </div>
          <div className='flex items-center gap-1'>
            <h1 className='font-medium text-sm mt-0.5'>Return</h1>
            <div className="badge bg-red-500 text-white text-xs">{number.return}</div>
          </div>
        </div>

        <div className='flex items-center gap-2 sm:mt-5 lg:mt-0'>
          <select className="select select-primary w-full max-w-xs" onChange={handleStatus}>
            <option disabled selected value={''}>Filter Status</option>
            <option value={'for review'}>For Review</option>
            <option value={'president office'}>President Office</option>
            <option value={'supply office'}>Supply Office</option>
            <option value={'accounting office'}>Accounting Office</option>
            <option value={'return'}>Return</option>
            <option value={''}>All</option>
          </select>
        </div>
      </div>

      <label className="input input-bordered flex items-center gap-2 w-80 mb-4">
        <input type="text" className="grow" placeholder="Search Department Name | User" onChange={ev => setSearch(ev.target.value)}/>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd" />
        </svg>
      </label>
      
      <ProceedModal open={openProceedModal} handleModal={handleProceedModal} tableLoading={handleTableLoading} data={dataRequest}/>
      <ReturnModal open={openReturnModal} handleModal={handleReturnModal} data={dataRequest} tableLoading={handleTableLoading}/>
      <FileModal open={fileModal} handleModal={handleFileModal} file={file}/>
      <CancelModal open={cancel} handleModal={handleCancelModal} text={'Cancel Transaction?'} btnText={'Cancel'} id={documentId} handleAction={handleCancelAction} loading={btnLoading}/>
        
      {
        tableLoading ? <>
          <Loader/>
        </> : 
        <table className="table w-full table-zebra table-md fade-in mb-2">
          {/* head */}
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th>Department</th>
              <th>Title</th>
              <th>Requested By</th>
              <th>Request Date</th>
              <th>Deadline</th>
              <th>Status</th>
              <th className='text-center'>Action</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {
              requests.filter((data) => {
                return search.toLowerCase === '' ? data : data.lastname.toLowerCase().includes(search) || data.firstname.toLowerCase().includes(search) || data.department_name.toLowerCase().includes(search)
              }).map((data) => (
                <tr>
                  {/* <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th> */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={Logo} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data.department_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {data.title}
                  </td>
                  <td>
                    {data.lastname} {data.firstname}
                    <br/>
                    <span className="badge badge-ghost badge-sm">{data.position}</span>
                  </td>
                  <td>{formatDate(data.created_at)}</td>
                  <td>{data.deadline ? formatDate(data.deadline) : 'N/A'}</td>
                  <td>
                    {
                      data.document_status === 'for review' ? <div className={`badge badge-default badge-outline capitalize text-xs`}>{data.document_status}</div> : null
                    }
                    {
                      data.document_status === 'president office' ? <div className={`badge badge-success badge-outline capitalize text-xs`}>{data.document_status}</div> : null
                    }
                    {
                      data.document_status === 'supply office' ? <div className={`badge badge-accent badge-outline capitalize text-xs`}>{data.document_status}</div> : null
                    }
                    {
                      data.document_status === 'return' ? <div className={`badge badge-ghost badge-sm capitalize text-xs`}>{data.document_status}</div> : null
                    }
                    {
                      data.document_status === 'cancel' ? <div className={`badge badge-outline badge-sm capitalize text-xs`}>{data.document_status}</div> : null
                    }
                    {
                      data.document_status === 'accounting office' ? <div className="badge border border-red-500 text-red-500 badge-outline">{data.document_status}</div> : null
                    }
                  </td>
                  <th className='flex gap-1 items-center justify-center mt-2'>
                    <button className='btn bg-blue-500 text-white hover:bg-blue-500 btn-sm' onClick={ev => handleFileModal(data.document)}><i class="fa-regular fa-file"></i> File</button>
                    {/* <details className="dropdown dropdown-end">
                      <summary className="btn btn-sm m-1 bg-green-600 text-white" role='button'><i class="fa-solid fa-location-dot"></i> Action</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-49 p-2 shadow">
                          <li><a onClick={ev => handleProceedModal(data)}>Proceed</a></li>
                          <li><a onClick={ev => handleReturnModal(data)}>Return</a></li>
                        </ul>
                    </details> */}
                  </th>
                </tr>
              ))
            }
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Department</th>
              <th>Requested By</th>
              <th>Request Date</th>
              <th>Deadline</th>
              <th>Status</th>
              <th className='text-center'>Action</th>
              {/* <th></th> */}
            </tr>
          </tfoot>
          
        </table>
      }

    </div>
  );
};

export default ArchiveTable;
