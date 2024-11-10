import React, { useEffect, useState } from 'react';
import AddSignatureModal from '../Modal/AddSignatureModal';
import axiosClient from '../../axiosClinet';

export default function SignatureTable() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [data, setData] = useState([])

  const fetchCalendarYears = async (page, limit) => {
    try {
        const {data} = await axiosClient.get(`/head-techer`)
        setData(data)
        // setLinks(data.years.links)
        setLoading(false)
    } catch (error) {
        setLoading(false)
    }
}

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePageLoading = () => {
    setLoading(true);
  };

  const handleBtnLoading = (btn) => {
    setBtnLoading(btn);
  };

  function formatToPeso(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Manila',
    };
    const formatter = new Intl.DateTimeFormat('en-PH', options);
    return formatter.format(date);
  }

  useEffect(() => {
    fetchCalendarYears()
  }, [loading])

  return (
    <div className="mt-5 overflow-x-auto rounded-sm border border-stroke bg-white pt-5 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <AddSignatureModal
        open={showModal}
        handlePageLoading={handlePageLoading}
        handleModal={handleCloseModal}
        loading={btnLoading}
        handleBntLoading={handleBtnLoading}
      />

      <div className="mb-2 flex items-center justify-between">
        <div></div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            
            {
              data.length > 0 ? (<>
                <i class="fa-solid fa-pen-to-square"></i> Update Signature
              </>) : (<>
                <i className="fa-solid fa-circle-plus"></i> Add Signature
              </>)
            }
          </button>
        </div>
      </div>
      <table className="table table-zebra mb-4">
        <thead>
          <tr>
            <th className="bg-blue-950 text-white uppercase font-xl tracking-wide rounded-l-lg">
              Signature Image
            </th>
            <th className="bg-blue-950 text-white uppercase font-xl tracking-wide">
              Owner
            </th>
            <th className="bg-blue-950 text-white uppercase font-xl tracking-wide">
              Position / Designation
            </th>
            <th className="bg-blue-950 text-white uppercase font-xl tracking-wide">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            <>
              {data.map((item) => (
                <tr>
                  <td style={{ textAlign: 'center' }}>
                    <img
                      style={{ height: '70px' }}
                      src={`${import.meta.env.VITE_API_BASE_URL}/storage/${
                        item.image
                      }`}
                      alt=""
                    />
                  </td>
                  <td className="font-bold text-md">{item.lastname + ' ' + item.firstname}</td>
                  <td className="font-bold text-md uppercase">
                    {item.position}
                  </td>
                  <td className="font-bold text-md">
                    {formatDate(item.created_at)}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No Record
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
