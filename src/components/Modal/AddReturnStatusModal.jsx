import React, { useState } from 'react';
import Select from '../Forms/SelectGroup/Select';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import Uploader from '../Forms/Uploader';
import axiosClient from '../../axiosClinet';
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

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};

const minDate = '2024-06-21';
const maxDate = '2024-12-31';

export default function AddReturnStatusModal({ open, handleModal, loading, handleBntLoading, handlePageLoading}) {
  const [errors, setErrors] = useState([])
  const {setNotification, setNotificationError, setDepartments} = useStateContext()
  const [imageUrl, setImage] = useState(null)
  const [payload, setPayload] = useState({
    return_status: '',
    status: '',
  })

  const closeModal = () => {
    handleModal()
  }

  const handleImageChange = (ev) => {
    setPayload({...payload, logo: ev.target.files[0]})
    const image = ev.target.files[0]
    const imageUrl = URL.createObjectURL(image)
    setImage(imageUrl)
  }

  const onChange = (e) => {
    const {name, value} = e.target
    setPayload((prev) => {
      return {...prev, [name] : value}
    })
  }

  const clearPayload = () => {
    setPayload({
      department_name: '',
      department_type: '',
      logo: ''
    })
  }

  const handleCloseModal = () => {
    clearPayload()
    handleModal()
    setImage(null)
  }

  const saveDepartment = async (ev) => {
    console.log(payload);
    setErrors([])
    handleBntLoading(true)
    try {
      const {data} = await axiosClient.post('/return-status/store', payload, config)
      setNotification('Department Added Successfully')
      handleBntLoading(false)
      handlePageLoading()
      // setImage(null)
      // handleModal()
      handleCloseModal()
    } catch (error) {
      setNotificationError('Unable to save department')
      handleBntLoading(false)
      console.log(error);
      if(error.response.data.errors){
        setErrors(error.response.data.errors)
      }else{
        setErrors({password: 'Server Error! Please Try Again'})
      }
    }
  }

  return (
    <>

      <dialog className={`modal ${open ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-sm uppercase">Add Return Status</h3>

          <div className='mt-5'>
            <div className='mb-4'>
              <label className="mb-2 block text-black dark:text-white">
                Department Name
              </label>
              <input
                type="text"
                name='return_status'
                placeholder="Return Status"
                value={payload.return_status}
                onChange={onChange}
                className={`${errors.return_status ? 'border-red-500' : 'border-stroke'} w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              />
              {
                errors.return_status ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.return_status}</p> : null
              }
            </div>

            <div className='mb-4'>
              <label className="mb-2 block text-black dark:text-white">
                Status
              </label>
              <select value={payload.status} onChange={onChange} className={`select select-ghost w-full ${errors.status ? 'border-[1.5px] border-red-500' : ''}`} name='status'>
                <option disabled selected value={''}>Select</option>
                <option value={'Active'}>Active</option>
                <option value={'Draft'}>Draft</option>
              </select>
              {
                errors.status ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.status}</p> : null
              }
            </div>

          </div>

          <div className={`modal-action ${loading ? '' : 'flex items-center justify-between'}`}>
            
            {
              loading ? <></> : <button className="btn" onClick={handleModal}><i class="fa-solid fa-circle-xmark"></i> Close</button>
            }
            <button className="btn bg-primary text-white" onClick={saveDepartment} disabled={loading ? true : false}>
              {
                loading ? <>
                  <span className="loading loading-infinity loading-lg"></span>
                </> : <>
                <i class="fa-solid fa-share-from-square"></i> Save
                </>
              }
            </button>
          </div>
        </div>
      </dialog>

    </>
  );
}
