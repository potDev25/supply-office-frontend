import React from 'react'
import Select from '../Forms/SelectGroup/Select'
import DatePickerOne from '../Forms/DatePicker/DatePickerOne'

const options = [
    {
        title : 'Post',
        value : 'post'
    },
    {
        title : 'Draft',
        value : 'draft'
    }
]

const minDate = '2024-06-21';
const maxDate = '2024-12-31';

export default function AddBusinessModal() {
  return (
    <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-sm mb-2">Register Business</h3>
        <div>
          <div className='mb-4'>
            <label className="mb-2 block text-black dark:text-white">
              Business Name
            </label>
            <input
              type="text"
              placeholder="Business Name"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <Select label={'Business Owner'} options={options} selectText={'Status'}/>
          <Select label={'Status'} options={options} selectText={'Status'}/>

          <div className='mb-4'>
            <label className="mb-2 block text-black dark:text-white">
              Products
            </label>
            <div className='flex items-center justify-center gap-2'>
              <input
                type="text"
                placeholder="Product"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <button className="btn btn-success text-white">ADD</button>
            </div>
          </div>
        </div>
        <div className="modal-action flex items-center justify-between">
            <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
            </form>
            <button className='btn btn-primary'>Save</button>
        </div>
        </div>
    </dialog>
  )
}
