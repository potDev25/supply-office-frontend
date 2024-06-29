import React, { useState } from 'react'
import Select from '../Forms/SelectGroup/Select'
import DatePickerOne from '../Forms/DatePicker/DatePickerOne'

const options = [
    {
        title : 'Admin',
        value : 'Admin'
    },
    {
        title : 'Treasurer',
        value : 'Treasurer'
    }
]

const minDate = '2024-06-21';
const maxDate = '2024-12-31';

export default function ProceedModal({open, handleModal}) {
  const [errors, setErrors] = useState([])
  return (
    <dialog id="my_modal_2" className={`modal ${open && 'modal-open'}`}>
        <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-sm mb-2">Move this Transaction</h3>
        <div>
          

        </div>
        <div className="modal-action flex items-center justify-between">
            <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn" onClick={handleModal}>Close</button>
            </form>
            <button className='btn btn-primary'>Save</button>
        </div>
        </div>
    </dialog>
  )
}
