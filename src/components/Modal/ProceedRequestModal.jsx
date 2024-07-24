import React, { useState } from 'react'
import Select from '../Forms/SelectGroup/Select'
import DatePickerOne from '../Forms/DatePicker/DatePickerOne'
import axiosClient from '../../axiosClinet';
import { useStateContext } from '../../context/ContextProvider';

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

export default function ProceedRequestModal({open, handleModal, data, tableLoading}) {
  const [errors, setErrors] = useState([])
  const {setNotification, setNotificationError} = useStateContext()
  const [btnLoading, setBtnLoading] = useState(false)
  const [payload, setPayload] = useState({
    status: '',
    deadline: ''
  })

  const onChange = (e) => {
    const {name, value} = e.target
    setPayload((prev) => {
      return {...prev, [name] : value}
    })
  }

  const updateStatus = async () => {
    setBtnLoading(true)
    try {
        const {res} = await axiosClient.post(`/po-request/update-status/${data.id}`, payload)
        setBtnLoading(false)
        setNotification('Action Success!')
        tableLoading()
        handleModal()
    } catch (error) {
        setBtnLoading(false)
        console.log(error)
        setNotificationError('Server error, please try again')
    }
  }

  return (
    <dialog id="my_modal_2" className={`modal ${open && 'modal-open'}`}>
        <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-sm mb-2">Change Status</h3>
        <div>

         <div className='mt-5 gap-2'>
            <div className='mb-2'>
              <label className="mb-2 block text-black dark:text-white">
                Select Movement
              </label>
              <select value={payload.status} onChange={onChange} className={`select select-bordered  w-full ${errors.department_type ? 'border-[1.5px] border-red-500' : ''}`} name='status'>
                <option disabled selected value={''}>Select</option>
                <option value={'canvasing'}>Canvasing</option>
                <option value={'awarded'}>Awarded</option>
                {/* <option value={'done'}>Done</option> */}
              </select>
              {
                errors.status ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.status}</p> : null
              }
            </div>

            {/* {
              payload.status == 'done' ? <></> : <>
                <div>
                    <label className="mb-2 block text-black dark:text-white">
                    Set Deadline
                    </label>
                    <input type="date" name='deadline' value={payload.deadline} onChange={onChange} placeholder="Type here" className="input input-bordered w-full" />
                    {
                        errors.deadline ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.deadline}</p> : null
                    }
                </div>
              </>
            } */}

         </div>


        </div>
        <div className="modal-action flex items-center justify-between">
            <form method="dialog">
            {/* if there is a button, it will close the modal */}
            {
              btnLoading ? <></> : <button className="btn" onClick={handleModal}><i class="fa-solid fa-circle-xmark"></i> Close</button>
            }
            </form>
            <button className='btn btn-primary' disabled={btnLoading ? true : false} onClick={updateStatus}>
                {
                    btnLoading ? <><span className="loading loading-infinity loading-lg"></span></> : 'Proceed'
                }
            </button>
        </div>
        </div>
    </dialog>
  )
}
