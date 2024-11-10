import React, { useState } from 'react';
import Select from 'react-select';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import Uploader from '../Forms/Uploader';
import axiosClient from '../../axiosClinet';
import { useStateContext } from '../../context/ContextProvider';
import CurrencyInput from 'react-currency-input-field';
import { useParams } from 'react-router-dom';

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
    'content-type': 'multipart/form-data',
  },
};

const minDate = '2024-06-21';
const maxDate = '2024-12-31';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'white' : 'white',
    borderColor: state.isFocused ? '#3182ce' : '#e2e8f0', // Blue border on focus, light-gray otherwise
    boxShadow: state.isFocused ? '0 0 0 2px rgba(66, 153, 225, 0.6)' : 'none', // Tailwind focus-ring simulation
    padding: '0.4rem',
    borderColor: '#3182ce',
    borderRadius: '0.380rem', // Tailwind border-radius
    '&:hover': {
      borderColor: '#3182ce', // Blue on hover
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#3182ce'
      : state.isFocused
      ? '#ebf8ff'
      : 'white', // Blue on selected, light blue on hover
    color: state.isSelected ? 'white' : '#1a202c', // White text if selected, dark if not
    padding: '0.5rem',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 999,
    position: 'absolute',
    borderRadius: '0.375rem', // Rounded menu
    marginTop: '0.25rem',
    padding: '0.5rem',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', // Tailwind box shadow simulation
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#a0aec0', // Gray placeholder
    fontSize: '0.875rem', // Tailwind text-sm
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1a202c', // Dark text
  }),
};

export default function StoreParSupplyModal({
  open,
  handleModal,
  loading,
  handleBntLoading,
  handlePageLoading,
}) {
  const [errors, setErrors] = useState([]);
  const [proceed, setProceed] = useState(false);
  const { setNotification, setNotificationError, setDepartments, supplies } =
    useStateContext();
  const [imageUrl, setImage] = useState(null);
  const [payload, setPayload] = useState({
    qnty: '',
    supplier: '',
    description: '',
    name: '',
    supply_id: ''
  });
  const [formattedQnty, setFormattedQnty] = useState('');
  const {id} = useParams()

  const closeModal = () => {
    handleModal();
  };

  const handleImageChange = (ev) => {
    setPayload({ ...payload, logo: ev.target.files[0] });
    const image = ev.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    setImage(imageUrl);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const clearPayload = () => {
    setPayload({
      qnty: '',
      supplier: '',
      price: '',
      description: '',
      name: '',
      supply_id: ''
    });
  };

  const getSupply = async (ev) => {
    try {
      const {data} = await axiosClient.get(`/supply/show/${ev.value}`)
      setPayload({
        ...payload,
        description: data.description,
        name: data.name,
        supply_id: data.id
      })
      setProceed(true)
    } catch (error) {
      console.log(error);
    }
  }

  const handleCloseModal = () => {
    clearPayload();
    handleModal();
    setImage(null);
  };

  const saveDepartment = async (ev) => {
    console.log(payload);
    setErrors([]);
    handleBntLoading(true);
    try {
      const { data } = await axiosClient.post(
        `/par-supplies/store/${id}/${payload.supply_id}`,
        payload,
        config,
      );
      // setDepartments(data);
      setNotification('Supply Added Successfully');
      handleBntLoading(false);
      handlePageLoading();
      setProceed(false)
      clearPayload()
      // setImage(null)
      // handleModal()
      handleCloseModal();
    } catch (error) {
      setNotificationError('Unable to save department');
      handleBntLoading(false);
      console.log(error);
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ password: 'Server Error! Please Try Again' });
      }
    }
  };

  return (
    <>
      <dialog className={`modal ${open ? 'modal-open' : ''}`}>
        <div className="modal-box w-[80%]">
          <h3 className="font-bold text-sm uppercase">Select Supply</h3>

          <div className="mt-5">
            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Select Supply
              </label>
              <Select
                options={supplies}
                styles={customStyles}
                onChange={(ev) =>
                  getSupply(ev)
                }
              />
              {errors.department_name ? (
                <p className="text-red-500 italic">
                  <i className="fa-solid fa-circle-exclamation"></i>{' '}
                  {errors.department_name}
                </p>
              ) : null}
            </div>
           
            
            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Description
              </label>
              <input
                type="text"
                disabled
                name="department_name"
                placeholder="Description"
                value={payload.description}
                onChange={onChange}
                className={`${
                  errors.department_name ? 'border-red-500' : 'border-stroke'
                } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              />
              {errors.department_type ? (
                <p className="text-red-500 italic">
                  <i className="fa-solid fa-circle-exclamation"></i>{' '}
                  {errors.department_type}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Category
              </label>
              <input
                type="text"
                disabled
                name="department_name"
                placeholder="Category"
                value={payload.name}
                onChange={onChange}
                className={`${
                  errors.department_name ? 'border-red-500' : 'border-stroke'
                } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              />
              {errors.department_type ? (
                <p className="text-red-500 italic">
                  <i className="fa-solid fa-circle-exclamation"></i>{' '}
                  {errors.department_type}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-black dark:text-white">
                Qnty
              </label>
              <input
                type="number"
                name="qnty"
                min={0}
                placeholder="Qnty"
                value={payload.qnty}
                onChange={onChange}
                className={`${
                  errors.qnty ? 'border-red-500' : 'border-stroke'
                } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              />
              {errors.qnty ? (
                <p className="text-red-500 italic">
                  <i className="fa-solid fa-circle-exclamation"></i>{' '}
                  {errors.qnty}
                </p>
              ) : null}
            </div>
           
          </div>

          <div
            className={`modal-action ${
              loading ? '' : 'flex items-center justify-between'
            }`}
          >
            {loading ? (
              <></>
            ) : (
              <button className="btn" onClick={handleModal}>
                <i class="fa-solid fa-circle-xmark"></i> Close
              </button>
            )}
            {
              proceed ? <>
                <button
              className="btn bg-primary text-white"
              onClick={saveDepartment}
              disabled={loading ? true : false}
            >
              {loading ? (
                <>
                  <span className="loading loading-infinity loading-lg"></span>
                </>
              ) : (
                <>
                  <i class="fa-solid fa-share-from-square"></i> Save
                </>
              )}
            </button>
              </> : null 
            }
            
          </div>
        </div>
      </dialog>
    </>
  );
}
