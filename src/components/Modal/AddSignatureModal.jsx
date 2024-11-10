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

export default function AddSignatureModal({ open, handleModal, loading, handleBntLoading, handlePageLoading}) {
  const [errors, setErrors] = useState([])
  const {setNotification, setNotificationError, setDepartments} = useStateContext()
  const [imageUrl, setImage] = useState(null)
  const [payload, setPayload] = useState({
    image: '',
  })

  const closeModal = () => {
    handleModal()
  }

  const handleImageChange = (ev) => {
    setPayload({...payload, image: ev.target.files[0]})
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
      const {data} = await axiosClient.post('/head-techer/store', payload, config)
      setNotification('E-Signature Added Successfully')
      handleBntLoading(false)
      handlePageLoading()
      // setImage(null)
      // handleModal()
      handleCloseModal()
    } catch (error) {
      setNotificationError('Server Error')
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
          <h3 className="font-bold text-sm uppercase">Upload E-Signature</h3>

          <div className='mt-5'>
            <div className='mb-4'>
              <label className="mb-2 block text-black dark:text-white">
                Upload Logo <span className='text-red-500 text-xs'>(Please make sure to use a white background and black text in your signature.)</span>
              </label>
              <Uploader handleImageChange={ev => handleImageChange(ev)} image={imageUrl} error={errors.image}/>
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
