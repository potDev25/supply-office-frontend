import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddBusinessModal from '../Modal/AddBusinessModal';

const BusinessTable = () => {
  const [request, setRequest] = useState()

  const openModal = (id) => {
    setRequest(id)
    document.getElementById('my_modal_2').showModal()
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-stroke bg-white pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className='flex items-center justify-between mt-2 mb-2'>
        <div className='flex items-center gap-2'>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow input-xs" placeholder="Search Announcements" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
          <select className="select select-primary w-[100px] max-w-xs">
            <option disabled selected>Limit</option>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>All</option>
          </select>
        </div>

        <div className='flex items-center gap-2'>
          <button to={'/applicants/register'} className="btn btn-primary" onClick={ev => openModal(1)}>
          <i className="fa-solid fa-circle-plus"></i>
            Register Business
          </button>
        </div>

      </div>
      
      <AddBusinessModal/>

      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Business Name</th>
            <th>Owner</th>
            <th>Business Type</th>
            <th>Status</th>
            <th>Created At</th>
            <th className='text-center'>Action</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
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
                    <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br/>
              <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <td>Purple</td>
            <td>Purple</td>
            <th className='flex gap-1 items-center justify-center mt-2'>
              <button className="btn btn-sm btn-primary">View</button>
              <button className="btn btn-sm bg-red-800 text-white hover:bg-red-500">Decline</button>
            </th>
          </tr>
          {/* row 2 */}
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
                    <img src="https://img.daisyui.com/tailwind-css-component-profile-3@56w.png" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Brice Swyre</div>
                  <div className="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
              <br/>
              <span className="badge badge-ghost badge-sm">Tax Accountant</span>
            </td>
            <td>Red</td>
            <td>Red</td>
            <td>Red</td>
            <th className='flex gap-1 items-center justify-center mt-2'>
              <button className="btn btn-sm btn-primary">View</button>
              <button className="btn btn-sm bg-red-800 text-white hover:bg-red-500">Decline</button>
            </th>
          </tr>
          {/* row 3 */}
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
                    <img src="https://img.daisyui.com/tailwind-css-component-profile-4@56w.png" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Marjy Ferencz</div>
                  <div className="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td>
              Rowe-Schoen
              <br/>
              <span className="badge badge-ghost badge-sm">Office Assistant I</span>
            </td>
            <td>Crimson</td>
            <td>Crimson</td>
            <td>Crimson</td>
            <th className='flex gap-1 items-center justify-center mt-2'>
              <button className="btn btn-sm btn-primary">View</button>
              <button className="btn btn-sm bg-red-800 text-white hover:bg-red-500">Decline</button>
            </th>
          </tr>
          {/* row 4 */}
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
                    <img src="https://img.daisyui.com/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                  <div className="text-sm opacity-50">Brazil</div>
                </div>
              </div>
            </td>
            <td>
              Wyman-Ledner
              <br/>
              <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
            </td>
            <td>Indigo</td>
            <td>Indigo</td>
            <td>Indigo</td>
            <th className='flex gap-1 items-center justify-center mt-2'>
              <button className="btn btn-sm btn-primary">View</button>
              <button className="btn btn-sm bg-red-800 text-white hover:bg-red-500">Decline</button>
            </th>
          </tr>
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Business Name</th>
            <th>Owner</th>
            <th>Business Type</th>
            <th>Status</th>
            <th>Created At</th>
            <th className='text-center'>Action</th>
            {/* <th></th> */}
          </tr>
        </tfoot>
        
      </table>
      <div className='flex items-center justify-between mt-2 mb-2'>
        <div></div>
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 22</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  );
};

export default BusinessTable;
