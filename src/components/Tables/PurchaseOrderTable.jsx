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
import UploadPurchaseOrderModal from '../Modal/UploadPurchaseOrderModal';
import ProceedOrderModal from '../Modal/ProceedOrderModal';
import '../../laravel-echo'

const PurchaseOrderTable = ({handleLoading}) => {
  const [request, setRequest] = useState()
  const [departmentModal, setDepartmentModal] = useState(false)
  const [openProceedModal, setProceedModal] = useState(false)
  const [openReturnModal, setReturnModal] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [po, setPo] = useState({})
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
      const {data} = await axiosClient.get(`/po-request/request`)
      setRequests(data)
      // setNumber(data.numbers)
      handleLoading(false)
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

  const handleDepartmentModal = (data) => {
    setPo(data)
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

  useEffect(() => {
      window.Echo.channel('purchase-requests-orders')
          .listen('PurchaseDocumentEvent', (e) => {
              fetchData()
          });
  }, []);

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
      const {data} = await axiosClient.post(`/po-request/po-destroy/${id}`)
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
            <h1 className='font-medium'>Puchase Order</h1>
          </div>
        </div>

       
      </div>

      <UploadPurchaseOrderModal open={departmentModal} handleModal={handleDepartmentModal} handlePageLoading={handlePageLoading} po={po}/>
      <ProceedOrderModal handleLoading={handleLoading} open={openProceedModal} handleModal={handleProceedModal} tableLoading={handleTableLoading} data={dataRequest}/>
      <ReturnModal open={openReturnModal} handleModal={handleReturnModal} data={dataRequest} tableLoading={handleTableLoading}/>
      <FileModal open={fileModal} handleModal={handleFileModal} file={file}/>
      <CancelModal open={cancel} handleModal={handleCancelModal} text={'Cancel Purchase Order?'} btnText={'Cancel'} id={documentId} handleAction={handleCancelAction} loading={btnLoading}/>
        
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
                    <td>
                      { 
                        request.po_request_date === null ? <div className={`font-extrabold`}>--</div> : <>{formatDate(request.po_request_date)}</>
                      }
                    </td>
                    <td>
                      {
                        request.po_status === 'for review' ? <div className={``}>{request.po_status}</div> : null
                      }
                      {
                        request.po_status === 'president office' ? <div className={`textblue-600`}>{request.po_status}</div> : null
                      }
                      {
                        request.po_status === 'supply office' ? <div className={` text-green-800`}>{request.po_status}</div> : null
                      }
                      {
                        request.po_status === 'return' ? <div className={``}>{request.po_status}</div> : null
                      }
                      {
                        request.po_status === 'accounting office' ? <div className="text-red-500">{request.po_status}</div> : null
                      }
                    </td>
                    <th className='flex gap-1 items-center justify-center mt-2'>
                      {
                        user.role === 'supply office' ? <>
                          {
                            request.purchase_order !== null ? <>
                              <button className='btn bg-blue-500 text-white hover:bg-blue-500 btn-sm' onClick={ev => handleFileModal(request.purchase_order)}>File</button>
                              {
                                request.po_status === 'for review' ?
                                <button className='btn bg-red-500 text-white hover:bg-red-500 btn-sm' onClick={ev => handleCancelClick(request.id)}>Cancel</button> : null
                              }
                            </> : null
                          }
                          
                          {
                            request.purchase_order === null ? <button className='btn bg-green-600 text-white hover:bg-blue-500 btn-sm' onClick={ev => handleDepartmentModal(request)}>Upload</button> : null
                          }
                        </> : <>
                          <button className='btn bg-blue-500 text-white hover:bg-blue-500 btn-sm' onClick={ev => handleFileModal(request.purchase_order)}>File</button>
                          <details className="dropdown dropdown-end">
                            <summary className="btn btn-sm m-1 bg-green-600 text-white text-xs" role='button'>Action</summary>
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

export default PurchaseOrderTable;
