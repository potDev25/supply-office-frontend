import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { useState } from 'react';
import AddAnnouncementModal from '../Modal/AddAnnouncementModal';
import Logo from '../../images/bipsu_new.png'

const AnnoucementsTable = () => {
  const [request, setRequest] = useState();

  const openModal = (id) => {
    setRequest(id);
    document.getElementById('my_modal_2').showModal();
  };

  const data = [
    {title : 'School of Technology and Computer Studies'},
    {title : 'School of Nursing'},
    {title : 'School of Education'},
    {title : 'School of Tourism'},
    {title : 'School of Arts and Sciences'},
    {title : 'School of Criminal Justice'},
  ]

  return (
    <div className="overflow-x-auto pt-2 pb-2.5 sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center gap-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow input-xs"
              placeholder="Search Announcements"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        {/* <div className="flex items-center gap-2">
          <button className="btn btn-primary" onClick={(ev) => openModal(1)}>
            <i className="fa-solid fa-circle-plus"></i>
            Create
          </button>
        </div> */}
      </div>

      <AddAnnouncementModal />

      <div className='mt-[50px] grid grid-cols-4 gap-4'>
        {
          data.map((item) => (
            <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-7">
              <div className="relative mx-4 -mt-6 flex items-center justify-center h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                <img src={Logo} alt="" className='h-[150px] '/>
              </div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {item.title}
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
    </div>
  );
};

export default AnnoucementsTable;
