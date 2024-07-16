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

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};

export default function UpdateFileModal({open, handleModal, data, tableLoading}) {
  const [errors, setErrors] = useState([])
  const {setNotification, setNotificationError} = useStateContext()
  const [btnLoading, setBtnLoading] = useState(false)
  const [payload, setPayload] = useState({
    status: 'for review',
    document: ''
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
        const {res} = await axiosClient.post(`/documents/return-file-status/${data.document_id}`, payload, config)
        setBtnLoading(false)
        setNotification('File updated successfully!')
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
        <h3 className="font-bold text-sm mb-2">Update File</h3>
        <div className=''>
          <input type="file" required className="file-input file-input-bordered w-full" onChange={ev => setPayload({...payload, document: ev.target.files[0]})} accept='application/pdf'/>
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
