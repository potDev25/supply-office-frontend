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

const PendingRequests = () => {
  const [request, setRequest] = useState()
  const [openProceedModal, setProceedModal] = useState(false)
  const [openReturnModal, setReturnModal] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])

  const fetchData = async () => {
    try {
      const {data} = await axiosClient.get('/documents')
      setRequests(data)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handleProceedModal = () => {
    setProceedModal(!openProceedModal)
  } 

  const handleReturnModal = () => {
    setReturnModal(!openReturnModal)
  } 

  useEffect(() => {
    fetchData()
  }, [loading])

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
    <div className="overflow-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className='flex items-center justify-between p-2'>
        <h1 className='font-medium'>Pending Requests</h1>
        <div className='flex items-center gap-2'>
          <Link to={'/dashboard/upload'} className="btn btn-primary">
          <i className="fa-solid fa-upload"></i>
            Upload Document
          </Link>
        </div>
      </div>
      
      <ProceedModal open={openProceedModal} handleModal={handleProceedModal}/>
      <ReturnModal open={openReturnModal} handleModal={handleReturnModal}/>
        
      {
        loading ? <>
          <Loader/>
        </> : 
        <table className="table table-zebra table-md fade-in">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Department</th>
              <th>Title</th>
              <th>Requested By</th>
              <th>Request Date</th>
              <th>Status</th>
              <th className='text-center'>Action</th>
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
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
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
                  <td><div className="badge badge-success badge-outline">Presidents Office</div></td>
                  <th className='flex gap-1 items-center justify-center mt-2'>
                  <details className="dropdown dropdown-end">
                      <summary className="btn m-1 bg-blue-500 text-white"><i class="fa-solid fa-location-dot"></i> Action</summary>
                      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-49 p-2 shadow">
                        <li><a onClick={handleProceedModal}>Proceed</a></li>
                        <li><a onClick={handleReturnModal}>Return</a></li>
                      </ul>
                    </details>
                  </th>
                </tr>
              ))
            }

            
            {/* row 2 */}
            {/* <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={Logo} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">School of Technology and Computer Studies</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel
                <br/>
                <span className="badge badge-ghost badge-sm">Chairperson</span>
              </td>
              <td>June 5, 2024</td>
              <td><div className="badge badge-primary badge-outline">Office Supply</div></td>
              <th className='flex gap-1 items-center justify-center mt-2'>
                <details className="dropdown dropdown-end">
                  <summary className="btn m-1 bg-blue-500 text-white"><i class="fa-solid fa-location-dot"></i> Action</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-49 p-2 shadow">
                      <li><a onClick={handleProceedModal}>Proceed</a></li>
                      <li><a onClick={handleReturnModal}>Return</a></li>
                    </ul>
                </details>
              </th>
            </tr> */}
            {/* row 3 */}
            {/* <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={Logo} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">School of Technology and Computer Studies</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel
                <br/>
                <span className="badge badge-ghost badge-sm">Chairperson</span>
              </td>
              <td>June 5, 2024</td>
              <td><div className="badge outline-red-500 badge-outline">For Review</div></td>
              <th className='flex gap-1 items-center justify-center mt-2'>
              <details className="dropdown dropdown-end">
                  <summary className="btn m-1 bg-blue-500 text-white"><i class="fa-solid fa-location-dot"></i> Action</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-49 p-2 shadow">
                      <li><a onClick={handleProceedModal}>Proceed</a></li>
                      <li><a onClick={handleReturnModal}>Return</a></li>
                    </ul>
                </details>
              </th>
            </tr> */}
            {/* row 4 */}
            {/* <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={Logo} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">School of Technology and Computer Studies</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel
                <br/>
                <span className="badge badge-ghost badge-sm">Chairperson</span>
              </td>
              <td>June 5, 2024</td>
              <td><div className="badge border border-red-500 text-red-500 badge-outline">Accounting Office</div></td>
              <th className='flex gap-1 items-center justify-center mt-2'>
                <details className="dropdown dropdown-end">
                  <summary className="btn m-1 bg-blue-500 text-white" role='button'><i class="fa-solid fa-location-dot"></i> Action</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-49 p-2 shadow">
                      <li><a onClick={handleProceedModal}>Proceed</a></li>
                      <li><a onClick={handleReturnModal}>Return</a></li>
                    </ul>
                </details>
              </th>
            </tr> */}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Department</th>
              <th>Requested By</th>
              <th>Request Date</th>
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
