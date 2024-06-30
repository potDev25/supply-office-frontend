import React from 'react';
import Select from '../Forms/SelectGroup/Select';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';

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

export default function DeleteApplicantModal({ deleteApplicant, open, handleModal, loading}) {
  const closeModal = () => {
    handleModal()
  }

  const handleDelete = () => {
    deleteApplicant()
  }
  return (
    <>

      <dialog className={`modal ${open ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Delete Users Permanently?</h3>
          <div className={`modal-action ${loading ? '' : 'flex items-center justify-between'}`}>
            
            {
              loading ? <></> : <button className="btn" onClick={handleModal}><i class="fa-solid fa-circle-xmark"></i> Close</button>
            }
            <button className="btn bg-red-600 text-white" onClick={handleDelete} disabled={loading ? true : false}>
              {
                loading ? <>
                  <span className="loading loading-infinity loading-lg"></span>
                </> : <>
                  <i class="fa-solid fa-trash-can"></i> Delete
                </>
              }
            </button>
          </div>
        </div>
      </dialog>

    </>
  );
}
