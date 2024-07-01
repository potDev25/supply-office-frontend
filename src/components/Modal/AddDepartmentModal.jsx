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

export default function AddDepartmentModal({ open, handleModal, loading, handleBntLoading, handlePageLoading}) {
  const [errors, setErrors] = useState([])
  const {setNotification, setNotificationError} = useStateContext()
  const [imageUrl, setImage] = useState(null)
  const [payload, setPayload] = useState({
    department_name: '',
    department_type: '',
    logo: '',
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
      const {data} = await axiosClient.post('/departments/store', payload, config)
      setNotification('Department Added Successfully')
      handleBntLoading(false)
      handlePageLoading()
      // setImage(null)
      // handleModal()
      handleCloseModal()
    } catch (error) {
      if(error.response.data.errors){
        setErrors(error.response.data.errors)
      }else{
        setErrors({password: 'Server Error! Please Try Again'})
      }
      setNotificationError('Unable to save department')
      handleBntLoading(false)
    }
  }

  return (
    <>

      <dialog className={`modal ${open ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-sm uppercase">Add Department</h3>

          <div className='mt-5'>
            <div className='mb-4'>
              <label className="mb-2 block text-black dark:text-white">
                Department Name
              </label>
              <input
                type="text"
                name='department_name'
                placeholder="Department Name"
                value={payload.department_name}
                onChange={onChange}
                className={`${errors.department_name ? 'border-red-500' : 'border-stroke'} w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              />
              {
                errors.department_name ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.department_name}</p> : null
              }
            </div>

            <div className='mb-4'>
              <label className="mb-2 block text-black dark:text-white">
                Department Type
              </label>
              <select value={payload.department_type} onChange={onChange} className={`select select-ghost w-full ${errors.department_type ? 'border-[1.5px] border-red-500' : ''}`} name='department_type'>
                <option disabled selected value={''}>Select</option>
                <option value={'Office'}>Office</option>
                <option value={'School'}>School</option>
              </select>
              {
                errors.department_type ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.department_type}</p> : null
              }
            </div>

            <div className='mb-4'>
              <label className="mb-2 block text-black dark:text-white">
                Upload Logo
              </label>
              <Uploader handleImageChange={ev => handleImageChange(ev)} image={imageUrl} error={errors.logo}/>
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
