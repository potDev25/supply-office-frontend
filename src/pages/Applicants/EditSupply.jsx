import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userThree from '../../images/user/user-03.png';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axiosClinet';
import Select from 'react-select';

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const units = [
  { label: 'Piece', value: 'piece' },
  { label: 'Box', value: 'box' },
  { label: 'Pack', value: 'pack' },
  { label: 'Kilogram', value: 'kg' },
  { label: 'Gram', value: 'g' },
  { label: 'Liter', value: 'l' },
  { label: 'Milliliter', value: 'ml' },
  { label: 'Meter', value: 'm' },
  { label: 'Centimeter', value: 'cm' },
  { label: 'Inch', value: 'in' },
  { label: 'Dozen', value: 'dozen' },
  { label: 'Pallet', value: 'pallet' },
  { label: 'Gallon', value: 'gallon' },
  { label: 'Bag', value: 'bag' },
  { label: 'Roll', value: 'roll' },
  { label: 'Can', value: 'can' },
  { label: 'Bottle', value: 'bottle' }
];


const EditSupply = () => {
  const { setNotification, departments, categories } = useStateContext();
  const navigate = useNavigate();
  const {id} = useParams()
  const [image, setImage] = useState(null);
  const [sanitary, setSanitary] = useState(null);
  const [barangay, setBarangay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [payload, setPayload] = useState({
    supply_name: '',
    category_id: '',
    description: '',
    unit: '',
    image_url: '',
  });

  const getUser = async (id) => {
    try {
      const {data} = await axiosClient.get(`/supply/show/${id}`)
      setPayload({
        supply_name: data.supply_name,
        category_id: data.category_id,
        description: data.description,
        unit: data.unit,
      })
      setImage(`${import.meta.env.VITE_API_BASE_URL}/storage/${data.image_url}`)
      // setpageLoading(false)
      console.log(data);
    } catch (error) {
      console.log(error);
      // setNotificationError('Unable to get user info!')
      navigate('/users')
    }
  }

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const zoomPluginInstance = zoomPlugin();

  const onChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (ev) => {
    setPayload({ ...payload, image_url: ev.target.files[0] });
    const image = ev.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    setImage(imageUrl);
  };

  const handleDisplaySanitary = (ev) => {
    setPayload({ ...payload, image_url: ev.target.files[0] });
    const pdf = ev.target.files[0];
    const pdfUrl = URL.createObjectURL(pdf);
    setSanitary(pdfUrl);
  };

  const handleDisplayBarangay = (ev) => {
    setPayload({ ...payload, image_url: ev.target.files[0] });
    const pdfb = ev.target.files[0];
    const pdfUrlb = URL.createObjectURL(pdfb);
    setBarangay(pdfUrlb);
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    try {
      const { data } = await axiosClient.post(
        `/supply/update/${id}`,
        payload,
        config,
      );
      setLoading(false);
      setNotification('Supply Edited Successfully');
      navigate('/supplies');
    } catch (error) {
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ password: 'Server Error! Please Try Again' });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser(id)
  }, [id])

  return (
    <>
      <div className="mx-auto max-w-290">
        <Breadcrumb pageName="Edit Supply" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white uppercase">
                  Supply Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Supply Name
                      </label>
                      <div className="relative">
                        <input
                          className={`${
                            errors.supply_name
                              ? 'border-2 border-red-500 border-solid'
                              : 'border border-stroke bg-gray'
                          } w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type="text"
                          name="supply_name"
                          onChange={onChange}
                          value={payload.supply_name}
                          id="fullName"
                          placeholder="Enter Supply Name"
                        />
                        {errors.supply_name ? (
                          <p className="text-red-500 italic">
                            <i className="fa-solid fa-circle-exclamation"></i>{' '}
                            {errors.supply_name}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {/* <div className="w-full sm:w-1/2">
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
                          className={`${
                            errors.firstname
                              ? 'border-2 border-red-500 border-solid'
                              : 'border border-stroke bg-gray'
                          } w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type="text"
                          name="firstname"
                          onChange={onChange}
                          id="fullName"
                          placeholder="Firstname"
                        />
                        {errors.firstname ? (
                          <p className="text-red-500 italic">
                            <i className="fa-solid fa-circle-exclamation"></i>{' '}
                            {errors.firstname}
                          </p>
                        ) : null}
                      </div>
                    </div> */}

                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Description
                      </label>
                      <div className="relative">
                        <input
                          className={`${
                            errors.description
                              ? 'border-2 border-red-500 border-solid'
                              : 'border-stroke bg-gray'
                          } w-full rounded border  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type="text"
                          name="description"
                          onChange={onChange}
                          value={payload.description}
                          id="fullName"
                          placeholder="Description"
                        />
                        {errors.description ? (
                          <p className="text-red-500 italic">
                            <i className="fa-solid fa-circle-exclamation"></i>{' '}
                            {errors.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="province"
                      >
                        Province
                      </label>
                      <div className="relative">
                        <input
                          className={`${errors.province ? 'border-2 border-red-500 border-solid' : 'border-stroke bg-gray'} w-full rounded py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          name="province"
                          onChange={onChange}
                          id="province"
                          placeholder="Province"
                         
                        />
                        {
                          errors.province ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.province}</p> : null
                        }
                        
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        City / Municipality
                      </label>
                      <div className="relative">
                        <input
                          className={`${errors.city ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type="text"
                          name="city"
                          onChange={onChange}
                          id="city"
                          placeholder="City / Municipality"
                         
                        />
                        {
                          errors.city ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.city}</p> : null
                        }
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="barangay"
                      >
                        Barangay
                      </label>
                      <div className="relative">
                        <input
                          className={`${errors.barangay ? 'border-2 border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                          type="text"
                          name="barangay"
                          onChange={onChange}
                          id="barangay"
                          placeholder="Barangay"
                         
                        />
                        {
                          errors.barangay ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.barangay}</p> : null
                        }
                      </div>
                    </div>
                  </div> */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="position"
                    >
                      Select Category
                    </label>
                    <Select
                      options={categories}
                      onChange={(ev) =>
                        setPayload({ ...payload, category_id: ev.value })
                      }
                    />
                    {errors.category_id ? (
                      <p className="text-red-500 italic">
                        <i className="fa-solid fa-circle-exclamation"></i>{' '}
                        {errors.category_id}
                      </p>
                    ) : null}
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="position"
                    >
                      Select Unit
                    </label>
                    <Select
                      options={units}
                      onChange={(ev) =>
                        setPayload({ ...payload, unit: ev.value })
                      }
                    />
                    {errors.unit ? (
                      <p className="text-red-500 italic">
                        <i className="fa-solid fa-circle-exclamation"></i>{' '}
                        {errors.unit}
                      </p>
                    ) : null}
                  </div>

                  {sanitary && (
                    <div className="fade-in mb-5">
                      <h3 className="font-medium text-black dark:text-white">
                        Sanitary Permit
                      </h3>
                      <iframe
                        src={sanitary}
                        title="PDF Viewer"
                        width="100%"
                        height="600px"
                        className="border-2 border-solid border-blue-500"
                        style={{ border: 'none' }}
                      />
                    </div>
                  )}

                  {barangay && (
                    <div className="fade-in">
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
                  UPLOAD SUPPLY IMAGE
                </h3>
              </div>
              <div className="p-7">
                {image ? (
                  <>
                    <div className="avatar fade-in">
                      <div className="w-24 rounded-xl">
                        <img src={image} />
                      </div>
                    </div>
                  </>
                ) : null}
                <form action="#" onSubmit={register}>
                  <div className="mb-5.5">
                    <div
                      id="FileUpload"
                      className={`${
                        errors.image_url
                          ? 'border border-dashed border-danger'
                          : 'border border-dashed border-primary'
                      } relative block w-full cursor-pointer appearance-none rounded  bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5`}
                    >
                      <input
                        type="file"
                        onChange={(ev) => handleImageChange(ev)}
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
                          <span className="text-primary">
                            Click to upload Your Image
                          </span>{' '}
                          or drag and drop
                        </p>
                        <p className="mt-1.5">PNG, JPG</p>
                      </div>
                    </div>
                    {errors.image_url ? (
                      <p className="text-red-500 italic">
                        <i className="fa-solid fa-circle-exclamation"></i>{' '}
                        {errors.image_url}
                      </p>
                    ) : null}
                  </div>

                  {/* <div className='mb-5.5'>
                  <div
                    id="sanitary"
                    className={`${errors.sanitary_permit ? 'border border-dashed border-danger' : 'border border-dashed border-primary'} relative block w-full cursor-pointer appearance-none rounded  bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5`}
                  >
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={ev => handleDisplaySanitary(ev)}
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
                        <span className="text-primary">Click to upload Your Sanitary Permit</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">PDF</p>
                    </div>
                  </div>
                  {
                    errors.sanitary_permit ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.sanitary_permit}</p> : null
                  }
                  </div> */}

                  {/* <div className='mb-4'>
                  <div
                    id="barangay"
                    className={`${errors.barangay_clearance ? 'border border-dashed border-danger' : 'border border-dashed border-primary'} relative block w-full cursor-pointer appearance-none rounded  bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5`}
                  >
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={ev => handleDisplayBarangay(ev)}
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
                        <span className="text-primary">Click to upload Your Barangay Clearance</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">PDF</p>
                    </div>
                  </div>
                  {
                    errors.barangay_clearance ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.barangay_clearance}</p> : null
                  }
                  </div> */}

                  <div className="flex justify-end gap-4.5">
                    <Link
                      to={'/supplies'}
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    >
                      Cancel
                    </Link>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-infinity loading-lg"></span>
                        </>
                      ) : (
                        'Save'
                      )}
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

export default EditSupply;
