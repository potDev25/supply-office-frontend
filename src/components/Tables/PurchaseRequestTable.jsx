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
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClinet';
import Loader from '../Loader/Loader';
import CancelModal from '../Modal/CancelModal';
import { useStateContext } from '../../context/ContextProvider';
import FileModal from '../Modal/FileModal';
import UploadPurchaseRequestModal from '../Modal/UploadPurchaseRequestModal';
import ProceedRequestModal from '../Modal/ProceedRequestModal';

const PurchaseRequestTable = () => {
  const [request, setRequest] = useState()
  const [departmentModal, setDepartmentModal] = useState(false)
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
  const {setNotification, setNotificationError, user} = useStateContext()

  const fetchData = async () => {
    try {
      // const {data} = await axiosClient.get(`/documents${status ? `?status=${status}` : ''}`)
      const {data} = await axiosClient.get(`/po-request`)
      setRequests(data)
      // setNumber(data.numbers)
      console.log(data);
      setTableLoading(false)
    } catch (error) {
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

  const handleDepartmentModal = () => {
    setDepartmentModal(!departmentModal)
  }

  const handlePageLoading = () => {
    setTableLoading(true)
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
      const {data} = await axiosClient.delete(`/po-request/destroy/${id}`)
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
    <div className="lg:overflow-x-visible sm:overflow-x-auto md:overflow-x-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mb-10">
      <div className='lg:flex items-center justify-between p-2 sm:block'>
        <div className='lg:flex items-center gap-5 sm:block justify-center'>
          <div>
            <h1 className='font-medium'>Puchase Requests</h1>
          </div>
        </div>

        <div>
          {
            tableLoading ? null : <> 
              {
                requests.length <= 0 ? <>
                  {
                    user.role === 'supply office' ? <>
                      <button className="btn btn-primary btn-sm" onClick={handleDepartmentModal}><i class="fa-solid fa-arrow-up-from-bracket"></i> Upload</button>
                    </> : null
                  }
                </> : null
              }
            </>
          }
        </div>
      </div>

      <UploadPurchaseRequestModal open={departmentModal} handleModal={handleDepartmentModal} handlePageLoading={handlePageLoading}/>
      <ProceedRequestModal open={openProceedModal} handleModal={handleProceedModal} tableLoading={handleTableLoading} data={dataRequest}/>
      <ReturnModal open={openReturnModal} handleModal={handleReturnModal} data={dataRequest} tableLoading={handleTableLoading}/>
      <FileModal open={fileModal} handleModal={handleFileModal} file={file}/>
      <CancelModal open={cancel} handleModal={handleCancelModal} text={'Cancel Purchase Requests?'} btnText={'Cancel'} id={documentId} handleAction={handleCancelAction} loading={btnLoading}/>
        
      {
        tableLoading ? <>
          <Loader/>
        </> : 
        <table className="table w-full table-zebra table-md fade-in mb-2">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Request Date</th>
              {/* <th>Deadline</th> */}
              <th>Status</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
              {
                requests.map((request) =>(
                    <tr>
                    {/* <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th> */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{request.request_description}</div>
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(request.created_at)}</td>
                    <td>
                      {
                        request.pr_status === 'pending' ? <div className={`badge badge-default badge-outline capitalize text-xs`}>{request.pr_status}</div> : null
                      }
                      {
                        request.pr_status === 'canvasing' ? <div className={`badge badge-success badge-outline capitalize text-xs`}>{request.pr_status}</div> : null
                      }
                      {
                        request.pr_status === 'awarded' ? <div className={`badge badge-accent badge-outline capitalize text-xs`}>{request.pr_status}</div> : null
                      }
                    </td>
                    <th className='flex gap-1 items-center justify-center mt-2'>
                      {
                        user.role === 'supply office' ? <>
                          <button className='btn bg-blue-500 text-white hover:bg-blue-500 btn-sm' onClick={ev => handleFileModal(request.purchase_request)}><i class="fa-regular fa-file"></i> File</button>
                          {
                            request.pr_status === 'pending' ? <button className='btn bg-red-500 text-white hover:bg-red-500 btn-sm' onClick={ev => handleCancelClick(request.id)}>Cancel</button> : null
                          }
                        </> : <>
                          <details className="dropdown dropdown-end">
                            <summary className="btn btn-sm m-1 bg-green-600 text-white" role='button'><i class="fa-solid fa-location-dot"></i> Action</summary>
                              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-49 p-2 shadow">
                                <li><a onClick={ev => handleProceedModal(request)}>Proceed</a></li>
                                <li><a onClick={ev => handleReturnModal(request)}>Return</a></li>
                              </ul>
                          </details>
                        </>
                      }
                    </th>
                  </tr>
                )) 
              }
            
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Title</th>
              <th>Request Date</th>
              {/* <th>Deadline</th> */}
              <th>Status</th>
              <th className='text-center'>Action</th>
            </tr>
          </tfoot>
          
        </table>
      }

    </div>
  );
};

export default PurchaseRequestTable;
