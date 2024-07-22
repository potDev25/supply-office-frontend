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

const TransactionLogsTable = ({documment, department_name}) => {
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
      const {data} = await axiosClient.get(`/process-logs/${documment.document_data.id}`)
      setRequests(data)
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
  }, [tableLoading, documment])

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
    <div className="lg:overflow-x-visible sm:overflow-x-auto md:overflow-x-auto bg-white">        
      {
        tableLoading ? <>
          <Loader/>
        </> : 
        <table className="table w-full table-zebra table-md fade-in">
          {/* head */}
          <thead>
            <tr>
              <th>Department</th>
              <th>Date Submitted</th>
              <th>Date Processed</th>
              {/* <th>Deadline</th> */}
              <th>Status</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {
              requests.map((data) => (
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
                        <div className="font-bold">{documment.department_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {formatDate(data.date_submitted)}
                  </td>
                  <td>
                    {formatDate(data.created_at)}
                  </td>
                  {/* <td>{formatDate(data.deadline)}</td> */}
                  <td>
                    {
                      data.status === 'for review' ? <div className={`badge badge-default badge-outline capitalize text-xs`}>{data.status}</div> : null
                    }
                    {
                      data.status === 'consolidated' ? <div className={`badge badge-success badge-outline capitalize text-xs`}>{data.status}</div> : null
                    }
                    {
                      data.status === 'supply office' ? <div className={`badge badge-accent badge-outline capitalize text-xs`}>{data.status}</div> : null
                    }
                    {
                      data.status === 'return' ? <div className={`badge badge-ghost badge-sm capitalize text-xs`}>{data.status}</div> : null
                    }
                    {
                      data.status === 'for consolidation' ? <div className="badge border border-red-500 text-red-500 badge-outline">{data.status}</div> : null
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Department</th>
              <th>Date Submitted</th>
              <th>Date Processed</th>
              {/* <th>Deadline</th> */}
              <th>Status</th>
              {/* <th></th> */}
            </tr>
          </tfoot>
          
        </table>
      }

    </div>
  );
};

export default TransactionLogsTable;
