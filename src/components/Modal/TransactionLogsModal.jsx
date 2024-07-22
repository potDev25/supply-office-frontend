import React from 'react';
import Select from '../Forms/SelectGroup/Select';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import { useStateContext } from '../../context/ContextProvider';
import TransactionLogsTable from '../Tables/TransactionLogsTable';

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

const minDate = '2024-06-21';
const maxDate = '2024-12-31';

export default function TransactionLogsModal({ open, handleModal, data, loading }) {
  const { user } = useStateContext()
  const closeModal = () => {
    handleModal()
  }

  const handleEvent = () => {
    // handleAction(id)
  }
  return (
    <>

      <dialog className={`modal ${open ? 'modal-open' : ''}`} style={{ zIndex: 9999 }}>
        <div className="modal-box w-11/12 max-w-[70vw] relative bg-white p-5 rounded-lg shadow-lg" style={{ zIndex: 10000 }}>
          <h3 className="font-bold text-lg text-center">Process Logs</h3>
          <TransactionLogsTable documment={data}/>
          <div className={`modal-action ${loading ? '' : 'flex items-center justify-between'}`}>
            {
              loading ? <></> : <button className="btn" onClick={handleModal}><i className="fa-solid fa-circle-xmark"></i> Close</button>
            }
          </div>
        </div>
      </dialog>


    </>
  );
}
