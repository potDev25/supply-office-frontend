
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userThree from '../../images/user/user-03.png'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axiosClinet';
import Select from 'react-select'

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const EditUser = () => {
  const {setNotification, departments, setNotificationError} = useStateContext()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [pic, setPic] = useState(null)
  const [sanitary, setSanitary] = useState(null)
  const [barangay, setBarangay] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setpageLoading] = useState(true)
  const [errors, setErrors] = useState([])
  const [payload, setPayload] = useState({
    lastname: '',
    firstname: '',
    middle_name: '',
    email: '',
    contact_number: '',
    username: '',
    profile_image: '',
    position: '',
    department_id: '',
    password: '',
    password_confirmationL: ''
  })
  const {id} = useParams()

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const zoomPluginInstance = zoomPlugin();

  const getUser = async (id) => {
    try {
      const {data} = await axiosClient.get(`/users/user/${id}`)
      setPayload({
        lastname: data.lastname,
        firstname: data.firstname,
        middle_name: data.middle_name,
        email: data.email,
        contact_number: data.contact_number,
        username: data.username,
        position: data.position,
        department_id: data.department_id,
        password: '',
        password_confirmationL: ''
      })
      setPic(data.profile_image)
      setpageLoading(false)
      console.log(data);
    } catch (error) {
      console.log(error);
      setNotificationError('Unable to get user info!')
      navigate('/users')
    }
  }

  useEffect(() => {
    getUser(id)
  }, [id])

  const onChange = (e) => {
    const {name, value} = e.target
    setPayload((prev) => {
      return {...prev, [name] : value}
    })
  }

  const handleImageChange = (ev) => {
    setPayload({...payload, profile_image: ev.target.files[0]})
    const image = ev.target.files[0]
    const imageUrl = URL.createObjectURL(image)
    setImage(imageUrl)
  }

  const handleDisplaySanitary = (ev) => {
    setPayload({...payload, sanitary_permit: ev.target.files[0]})
    const pdf = ev.target.files[0]
    const pdfUrl = URL.createObjectURL(pdf)
    setSanitary(pdfUrl)
  }

  const handleDisplayBarangay = (ev) => {
    setPayload({...payload, barangay_clearance: ev.target.files[0]})
    const pdfb = ev.target.files[0]
    const pdfUrlb = URL.createObjectURL(pdfb)
    setBarangay(pdfUrlb)
  }

  const register = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors([])
    console.log(payload);
    try {
      const {data} = await axiosClient.post(`/users/edit/${id}`, payload, config)
      setLoading(false)
      setNotification('User Account Edited Successfully')
      navigate('/users')
    } catch (error) {
      if(error.response.data.errors){
        setErrors(error.response.data.errors)
      }else{
        setErrors({password: 'Server Error! Please Try Again'})
      }
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mx-auto max-w-290">
        <Breadcrumb pageName="Edit User Account" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Lastname
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className={`${errors.lastname ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type="text"
                          name="lastname"
                          onChange={onChange}
                          value={payload.lastname}
                          id="fullName"
                          placeholder="Lastname"
                         
                        />
                        {
                          errors.lastname ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.lastname}</p> : null
                        }
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Firstname
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className={`${errors.firstname ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type="text"
                          name="firstname"
                          onChange={onChange}
                          value={payload.firstname}
                          id="fullName"
                          placeholder="Firstname"
                         
                        />
                        {
                          errors.firstname ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.firstname}</p> : null
                        }
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Middlename
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className={`${errors.middlename ? 'border-2 border-red-500 border-solid' : 'border-stroke bg-gray'} w-full rounded border  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type="text"
                          name="middle_name"
                          onChange={onChange}
                          id="fullName"
                          value={payload.middle_name}
                          placeholder="Middlename"
                         
                        />
                        {
                          errors.firstname ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.firstname}</p> : null
                        }
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className='w-full sm:w-1/2 mb5.5'>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Email Address
                      </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className={`${errors.email ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                            type="email"
                            name="email"
                            onChange={onChange}
                            id="emailAddress"
                            value={payload.email}
                            placeholder="example@email.com"
                          />
                            {
                              errors.email ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.email}</p> : null
                            }
                        </div>
                      </div>
                      <div className='w-full sm:w-1/2 mb5.5'>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="contact_number"
                      >
                        Contact Number
                      </label>
                        <div className="relative">
                          <input
                            className={`${errors.contact_number ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                            type="number"
                            name="contact_number"
                            onChange={onChange}
                            value={payload.contact_number}
                            id="emailAddress"
                            placeholder=""
                          />
                          {
                            errors.contact_number ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.contact_number}</p> : null
                          }
                        </div>
                      </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className={`${errors.username ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                      name="username"
                      onChange={onChange}
                      id="Username"
                      value={payload.username}
                      placeholder="devidjhon24"
                    />
                    {
                      errors.username ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.username}</p> : null
                    }
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="position"
                    >
                      Position
                    </label>
                    <input
                      type="text"
                      className={`${errors.position ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                      name="position"
                      onChange={onChange}
                      id="position"
                      value={payload.position}
                      placeholder=""
                    />
                    {
                      errors.position ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.position}</p> : null
                    }
                  </div>

                  

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="position"
                    >
                      Change Department
                    </label>
                   <Select options={departments} onChange={ev => setPayload({...payload, department_id: ev.value})}/>
                    {
                      errors.department_id ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.department_id}</p> : null
                    }
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className='w-full sm:w-1/2 mb5.5'>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="emailAddress"
                      >
                        Change Password
                      </label>
                        <div className="relative">
                          <input
                            className={`${errors.password ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                            type="password"
                            name="password"
                            onChange={onChange}
                            id="password"
                            placeholder="Create Password"
                          />
                          {
                            errors.password ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.password}</p> : null
                          }
                        </div>
                      </div>
                      <div className='w-full sm:w-1/2 mb5.5'>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="password_confirmation"
                      >
                        Confirm Password
                      </label>
                        <div className="relative">
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="password"
                            name="password_confirmation"
                            onChange={onChange}
                            id="emailAddress"
                            placeholder="Confirm Your Password"
                          />
                        </div>
                      </div>
                  </div>

                  {sanitary && (<div className='fade-in mb-5'>
                    <h3 className="font-medium text-black dark:text-white">
                      Sanitary Permit
                    </h3>
                      <iframe
                      src={sanitary}
                      title="PDF Viewer"
                      width="100%"
                      height="600px"
                      className='border-2 border-solid border-blue-500'
                      style={{ border: 'none' }}
                    />
                  </div>
                  )}

                  {barangay && (<div className='fade-in'>
                    <h3 className="font-medium text-black dark:text-white">
                      Barangay Clearance
                    </h3>
                      <iframe
                      src={barangay}
                      title="PDF Viewer"
                      width="100%"
                      height="600px"
                      style={{ border: 'none' }}
                    />
                  </div>
                  )}

                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Profile Image
                </h3>
              </div>
              <div className="p-7">
                  {
                    image ? <>
                      <div className="avatar fade-in">
                        <div className="w-24 rounded-xl">
                          <img src={image} />
                        </div>
                      </div>
                    </> : <div className="avatar fade-in">
                        <div className="w-24 rounded-xl">
                          <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${pic}`} />
                        </div>
                      </div>  
                   
                  }
                <form action="#" onSubmit={register}>
                  <div className='mb-5.5'>
                  <div
                    id="FileUpload"
                    className={`${errors.profile_image ? 'border border-dashed border-danger' : 'border border-dashed border-primary'} relative block w-full cursor-pointer appearance-none rounded  bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5`}
                  >
                    <input
                      type="file" 
                      onChange={ev => handleImageChange(ev)}
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload Your Profile Image</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">PNG, JPG</p>
                    </div>
                  </div>
                  {
                    errors.profile_image ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.profile_image}</p> : null
                  }
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Link
                    to={'/users'}
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    >
                      Cancel
                    </Link>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      {
                      loading ? <>
                        <span className="loading loading-infinity loading-lg"></span>
                      </> : 'Save'
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
