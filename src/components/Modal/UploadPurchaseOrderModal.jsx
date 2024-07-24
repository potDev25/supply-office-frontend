import React, { useState } from 'react';
import Select from '../Forms/SelectGroup/Select';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import Uploader from '../Forms/Uploader';
import axiosClient from '../../axiosClinet';
import { useStateContext } from '../../context/ContextProvider';
import UploadPdf from '../Forms/UploadPdf';

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

export default function UploadPurchaseOrderModal({ open, handleModal, loading, handlePageLoading, po}) {
  const [errors, setErrors] = useState([])
  const [btnLoading, setBtnLoading] = useState(false)
  const {setNotification, setNotificationError, setDepartments} = useStateContext()
  const [imageUrl, setImage] = useState(null)
  const [pdfurl, setPdf] = useState(null)
  const [payload, setPayload] = useState({
    purchase_order: '',
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

  const handlePdfChange = (ev) => {
    setPayload({...payload, purchase_order: ev.target.files[0]})
    const pdf = ev.target.files[0]
    const pdfUrl = URL.createObjectURL(pdf)
    setPdf(pdfUrl)
  }

  const onChange = (e) => {
    const {name, value} = e.target
    setPayload((prev) => {
      return {...prev, [name] : value}
    })
  }

  const clearPayload = () => {
    setPayload({
      purchase_order: '',
    })
    setPdf(null)
  }

  const handleCloseModal = () => {
    clearPayload()
    handleModal()
    setImage(null)
  }

  const saveDepartment = async (ev) => {
    console.log(payload);
    setErrors([])
    setBtnLoading(true)
    try {
      const {data} = await axiosClient.post(`/po-request/po/${po.id}`, payload, config)
      setNotification('Purchase Request Uploaded Successflly')
      setBtnLoading(false)
      handlePageLoading()
      clearPayload()
      // setImage(null)
      // handleModal()
      handleCloseModal()
    } catch (error) {
      setNotificationError('Unable to save department')
      setBtnLoading(false)
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
          <h3 className="font-bold text-sm uppercase">Upload Purchase Order</h3>

          <div className='mt-5'>
            <div className='mb-4'>
              <label className="mb-2 block text-black dark:text-white">
                Description / Title
              </label>
              <input
                type="text"
                name='request_description'
                placeholder="Title / Description"
                value={po ? po.request_description : null }
                readOnly
                onChange={onChange}
                className={`${errors.department_name ? 'border-red-500' : 'border-stroke'} w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              />
              {
                errors.department_name ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.department_name}</p> : null
              }
            </div>

            <div className='mb-4 w-full'>
              <label className="mb-2 block text-black dark:text-white">
                Upload Purchase Request
              </label>
              <UploadPdf handlePdfChange={ev => handlePdfChange(ev)} pdf={pdfurl} error={errors.purchase_order}/>
            </div>
          </div>

          <div className={`modal-action ${loading ? '' : 'flex items-center justify-between'}`}>
            
            {
              btnLoading ? <></> : <button className="btn" onClick={handleModal}><i class="fa-solid fa-circle-xmark"></i> Close</button>
            }
            <button className="btn bg-primary text-white" onClick={saveDepartment} disabled={btnLoading ? true : false}>
              {
                btnLoading ? <>
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
