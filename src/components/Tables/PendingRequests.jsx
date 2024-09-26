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
import MessageModal from '../Modal/MessageModal';
import UpdateFileModal from '../Modal/UpdateFileModal';

const PendingRequests = () => {
  const [request, setRequest] = useState()
  const [openProceedModal, setProceedModal] = useState(false)
  const [openReturnModal, setReturnModal] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [cancel, setCancel] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [messageModal, setMessageModal] = useState(false)
  const [fileModal, setFileModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [documentId, setDocumentId] = useState(null)
  const [dataRequest, setDataRequest] = useState({})
  const [file, setFile] = useState(null)
  const {setNotification, setNotificationError} = useStateContext()

  const fetchData = async () => {
    try {
      const {data} = await axiosClient.get('/documents')
      setRequests(data.data)
      setTableLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handleProceedModal = () => {
    setProceedModal(!openProceedModal)
  } 

  const handleMessageModal = (data) => {
    setDataRequest(data)
    setMessageModal(!messageModal)
  } 

  const handleUpdateModal = (data) => {
    setDataRequest(data)
    setUpdateModal(!updateModal)
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

  const handleReturnModal = () => {
    setReturnModal(!openReturnModal)
  } 

  useEffect(() => {
    fetchData()
  }, [tableLoading])

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

  return (
    <div className="lg:overflow-x-visible sm:overflow-x-auto md:overflow-x-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className='flex items-center justify-between p-2'>
        <h1 className='font-medium'>Pending PPMP Requests</h1>
        <div className='flex items-center gap-2'>
          {
            requests.length >= 1 ? <button className="btn btn-primary" disabled>Upload Document</button>
            : 
            <Link to={'/dashboard/upload'} className="btn btn-primary">
            <i className="fa-solid fa-upload"></i>
              Upload Document
            </Link>
          }
        </div>
      </div>
      
      <ProceedModal open={openProceedModal} handleModal={handleProceedModal}/>
      <ReturnModal open={openReturnModal} handleModal={handleReturnModal}/>
      <FileModal open={fileModal} handleModal={handleFileModal} file={file}/>
      <UpdateFileModal open={updateModal} handleModal={handleUpdateModal} data={dataRequest} tableLoading={handleTableLoading}/>
      <MessageModal open={messageModal} handleModal={handleMessageModal} data={dataRequest}/>
      <CancelModal open={cancel} handleModal={handleCancelModal} text={'Cancel Transaction?'} btnText={'Cancel'} id={documentId} handleAction={handleCancelAction} loading={btnLoading}/>
        
      {
        tableLoading ? <>
          <Loader/>
        </> : 
        <table className="table w-full table-zebra table-md fade-in">
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
              <th className='text-center'></th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {
              requests.filter((data) => {
                return search.toLowerCase === '' ? data : data.lastname.toLowerCase().includes(search) || data.firstname.toLowerCase().includes(search)
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
                      data.document_status === 'accounting office' ? <div className="badge border border-red-500 text-red-500 badge-outline">{data.document_status}</div> : null
                    }
                  </td>
                  <th className='flex gap-1 items-center justify-center mt-2'>
                    <button className='btn bg-blue-500 text-white hover:bg-blue-500 btn-sm' onClick={ev => handleFileModal(data.document)}><i class="fa-regular fa-file"></i> File</button>
                    {
                      data.document_status === "for review" ? <button className='btn bg-red-500 text-white hover:bg-red-500 btn-sm' onClick={ev => handleCancelClick(data.document_id)}>Cancel</button> : null
                    }
                    {/* {
                      data.message ? <button className='btn bg-green-600 text-white hover:bg-red-500 btn-sm' onClick={ev => handleMessageModal(data)}><i class="fa-regular fa-message"></i> Message</button> : null
                    } */}
                    {
                      data.document_status === "return" ? 
                      <>
                        <button className='btn bg-green-600 text-white hover:bg-red-500 btn-sm' onClick={ev => handleMessageModal(data)}><i class="fa-regular fa-message"></i> Message</button>
                        <button className='btn btn-outline btn-success btn-sm' onClick={ev => handleUpdateModal(data)}><i class="fa-solid fa-pen-to-square"></i> Update</button> 
                        <button className='btn bg-red-500 text-white hover:bg-red-500 btn-sm' onClick={ev => handleCancelClick(data.document_id)}>Cancel</button>
                      </>
                        : null
                    }
                  </th>
                </tr>
              ))
            }
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              {/* <th></th> */}
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

export default PendingRequests;
