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

export default function AddUserModal({open, handleModal}) {
  const [errors, setErrors] = useState([])
  return (
    <dialog id="my_modal_2" className={`modal ${open && 'modal-open'}`}>
        <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-sm mb-2">Add User</h3>
        <div>
          <div className='mb-4'>
            <label className="mb-2 block text-black dark:text-white">
              Lastname
            </label>
            <input
              type="text"
              placeholder="Lastname"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className='mb-4'>
            <label className="mb-2 block text-black dark:text-white">
              Firstname
            </label>
            <input
              type="text"
              placeholder="Firstname"
              className={`${errors.firstname ? 'border-red-500' : 'border-stroke'} w-full rounded-lg border-[1.5px] border-red-500 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
          </div>

          <div className='mb-4'>
            <label className="mb-2 block text-black dark:text-white">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className='mb-4'>
            <label className="mb-2 block text-black dark:text-white">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <Select label={'Role'} options={options} selectText={'Role'}/>

          <div className="mb-4.5 mt-2 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2 block text-black dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

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
