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

export default function AddAnnouncementModal() {
  return (
    <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-sm mb-2">Create Annoucments</h3>
        <div>
            <textarea
                rows={6}
                placeholder="Default textarea"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>

                <div className="mb-4.5 mt-2 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <DatePickerOne label={'Start Effective Date'} minDate={minDate}/>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <DatePickerOne label={'End Effective Date'}/>
                  </div>
                </div>

                <Select label={'Status'} options={options} selectText={'Status'}/>
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
