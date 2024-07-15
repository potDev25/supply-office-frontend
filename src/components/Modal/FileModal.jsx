import React from 'react';
import Select from '../Forms/SelectGroup/Select';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import { useStateContext } from '../../context/ContextProvider';

const options = [
  {
    title: 'Post',
    value: 'post',
  },
  {
    title: 'Draft',
    value: 'draft',
  },
];

const minDate = '2024-06-21';
const maxDate = '2024-12-31';

export default function FileModal({open, handleModal, file, loading}) {
  const {user} = useStateContext()
  const closeModal = () => {
    handleModal()
  }

  const handleEvent = () => {
    handleAction(id)
  }
  return (
    <>

      <dialog className={`modal ${open ? 'modal-open' : ''}`}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg text-center">PDF File</h3>
          <div className='w-full h-[70vh] relative'>
            {
              user.role === 'general admin' ? null : <div className='absolute h-[55px] w-full bg-white'></div>
            }
            <iframe src={`${import.meta.env.VITE_API_BASE_URL}/storage/${file}`} frameborder="0" className='w-full h-full'></iframe>
          </div>
          <div className={`modal-action ${loading ? '' : 'flex items-center justify-between'}`}>
            {
              loading ? <></> : <button className="btn" onClick={handleModal}><i class="fa-solid fa-circle-xmark"></i> Close</button>
            }
            {/* <button className="btn bg-red-600 text-white" onClick={handleEvent} disabled={loading ? true : false}>
              {
                loading ? <>
                  <span className="loading loading-infinity loading-lg"></span>
                </> : <>
                  {btnText}
                </>
              }
            </button> */}
          </div>
        </div>
      </dialog>

    </>
  );
}
