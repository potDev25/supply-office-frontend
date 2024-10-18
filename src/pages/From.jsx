import React, { useEffect, useState } from 'react';
import logo from '../images/bipsu_new.png';
import axiosClient from '../axiosClinet';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

export default function From() {
  const [data, setData] = useState([]);
  const [ris, setRis] = useState([]);
  const [total_price, setTotal] = useState(0);
  const [approve, setApprove] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const { setNotification, setNotificationError } = useStateContext();
  const { user } = useStateContext();
  const { id } = useParams();

  const fetchData = async () => {
    // setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/stocks/requests/${id}?limit=${1000}`,
      );
      setData(data.data);
      setRis(data.ris);
      setApprove(data.approve)
      setTotal(data.total_price)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  function formatToPeso(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }

  function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  console.log(getCurrentDateFormatted()); // Outputs current date in yyyy-mm-dd format

  function formatDate(date) {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const submitForm = async () => {
    setBtnLoading(true);
    try {
      const { data } = await axiosClient.post(`/stocks/submit-form/${ris.id}`);
      setNotification('RIS form Submitted Successfully');
      setBtnLoading(false);
      setLoading(true);
    } catch (error) {
      setNotificationError('Fail to Submit Form');
      setBtnLoading(false);
    }
  };

  const approveForm = async () => {
    setBtnLoading(true);
    try {
      const { data } = await axiosClient.post(`/stocks/approve-form/${ris.id}`);
      setNotification('RIS form Submitted Successfully');
      setBtnLoading(false);
      setLoading(true);
    } catch (error) {
      setNotificationError('Fail to Submit Form');
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <>
      <div
        className="flex items-center justify-center"
        style={{ fontFamily: "'Times New Roman', Times, serif" }}
      >
        <div className="w-full m-auto border border-black">
          <div className="flex border-b border-black">
            <div className="flex px-15 w-[70%]">
              <div className="">
                <img src={logo} className="h-[100px] w-[120px]" alt="" />
              </div>
              <div className=" mt-2 ml-3 text-sm">
                <p className="font-bold">BILIRAN PROVICE STATE UNIVERSITY</p>
                <p>SUPPLY OFFICE</p>
                <p className="mt-2">III. NSU FINANCE FORM</p>
                <p>330 - FIN 030</p>
              </div>
            </div>
            <div className="border-l border-black text-sm px-2">
              <p>Revision Date: May 1,2018</p>
              <p>Rivision Status: 3</p>
              <p>N.S. U. Revised Date: _______</p>
              <p>Authorized by: ________</p>
              <p>Page: 63 of 81</p>
            </div>
          </div>

          <div className="border-b border-black text-center">
            <p className="font-bold text-lg tracking-wider">
              REQUISITION AND ISSUE SLIP
            </p>
          </div>
          <div className="border-b border-black flex justify-between font-bold">
            <div className="px-2">
              <p>Entity Name: BIPSU</p>
            </div>
            <div className="px-2">
              <p>Fund Cluster : __________________</p>
            </div>
          </div>
          <div className="border-b border-black flex justify-between">
            <div className="px-2">
              <p>Division : BIPSU</p>
              <p>Office : BIPSU</p>
            </div>
            <div className="px-2 border-l border-black">
              <p>Responsibility Center Code : __________________</p>
              <p>
                RIS No. : <span>{ris.ris_number}</span>
              </p>
            </div>
          </div>

          <div className="border-b border-black flex font-bold text-sm">
            <div className="text-center w-[45%] ">
              <table className="border-collapse border border-b-0 border-black border-t-0 border-l-0 w-full font-normal">
                <thead>
                  <tr>
                    <th className="border border-black border-b-0 border-t-0 border-l-0">
                      Requisition
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="text-center w-[10%]">
              <table className="border-collapse border border-b-0 border-black border-t-0 border-l-0 w-full">
                <thead>
                  <tr>
                    <th className="border border-black border-b-0 border-t-0 border-l-0">
                      Stock Available?
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="text-center w-[45%]">Issue</div>
          </div>

          <div className="flex">
            <div className="text-center w-[45%] text-sm font-normal">
              <table className="border-collapse border border-black border-t-0 border-l-0 w-full font-normal">
                <thead>
                  <tr>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Stock No.
                    </th>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Unit
                    </th>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Description
                    </th>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, key) => (
                    <tr>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        {key + 1}
                      </td>
                      <td className="border border-black border-t-0 border-l-0 font-normal capitalize">
                        {item.unit}
                      </td>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        {item.description}
                      </td>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        {item.qnty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center w-[10%] text-sm">
              <table className="border-collapse border border-black border-t-0 border-l-0 w-full font-normal">
                <thead>
                  <tr>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Yes?
                    </th>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      No?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        {item.availbale == 1 ? (
                          '/'
                        ) : (
                          <span className="text-white">/</span>
                        )}
                      </td>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        {item.availbale == 2 ? (
                          '/'
                        ) : (
                          <span className="text-white">/</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center w-[45%] text-sm">
              <table className="border-collapse border border-black border-t-0 border-r-0 border-l-0 w-full font-normal">
                <thead>
                  <tr>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Quantity
                    </th>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Unit Price
                    </th>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Quantity
                    </th>
                    <th className="border border-black border-t-0 border-l-0 font-normal">
                      Total Amount
                    </th>
                    <th className="border border-black border-t-0 border-l-0 font-normal border-r-0">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        <span className="text-white">/</span>
                      </td>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        {formatToPeso(item.price)}
                      </td>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        {item.issued_qnty ?? 0}
                      </td>
                      <td className="border border-black border-t-0 border-l-0 font-normal">
                        {formatToPeso(item.issued_total_price ?? 0.0)}
                      </td>
                      <td className="border border-black border-t-0 border-l-0 font-normal border-r-0">
                        <span className="text-white">/</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="border-b border-black flex font-bold text-sm">
            <div className="text-center w-[45%] ">
              <table className=" w-full font-normal">
                <thead>
                  <tr>
                    <th className="font-normal">Total ...............</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="text-center w-[10%]"></div>
            <div className="text-center w-[45%]"></div>
            <div className="text-center w-[45%]">{formatToPeso(total_price)}</div>
          </div>

          <div className="font-bold mt-4 text-sm flex">
            <div className="px-3">Purpose:</div>
            <div className="border-b border-black w-full"></div>
          </div>

          <div className="mt-9">
            <table className="border-collapse border border-black border-l-0 border-r-0 w-full font-normal">
              <thead>
                <tr>
                  <th className="border border-black border-l-0 border-b-0 font-normal"></th>
                  <th className="border border-black border-l-0 border-b-0 font-bold">
                    Requested by:
                  </th>
                  <th className="border border-black border-l-0 border-b-0 font-bold">
                    Approved by:
                  </th>
                  <th className="border border-black font-bold border-b-0">
                    Issued by:
                  </th>
                  <th className="border border-black border-r-0 border-l-0 border-b-0 font-bold">
                    Received by:
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2">
                    Signature :
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2">
                    <span className="text-white">/</span>
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2">
                    <span className="text-white">/</span>
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2">
                    <span className="text-white">/</span>
                  </td>
                  <td className="border border-black border-t-0 border-l-0 border-r-0 font-normal">
                    <span className="text-white">/</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2">
                    Printed Name :
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-bold uppercase px-2 text-center">
                    {ris.lastname} {ris.firstname}
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-bold uppercase px-2 text-center">
                    {ris.approved_by ? approve.lastname + ' ' + approve.firstname : ''}
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-bold uppercase px-2 text-center">
                    {ris.approved_by ? approve.lastname + ' ' + approve.firstname : ''}
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-bold uppercase px-2 text-center">
                    {ris.status == 'pending' ? (
                      <></>
                    ) : (
                      <>
                        {ris.lastname} {ris.firstname}
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2">
                    Designation :
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal text-center capitalize px-2">
                    <span className="">{ris.position}</span>
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal text-center capitalize px-2">
                  {ris.approved_by ? approve.position: ''}
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal text-center capitalize px-2">
                  {ris.approved_by ? approve.position: ''}
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal text-center capitalize px-2">
                    {ris.status == 'pending' ? (
                      <></>
                    ) : (
                      <>
                        <span className="">{ris.position}</span>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2">
                    Date :
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal text-center capitalize px-2">
                    <span className="">{formatDate(ris.created_at)}</span>
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal text-center capitalize px-2">
                    {ris.status == 'pending' ? (
                      <></>
                    ) : (
                      <>
                        <span className="">{formatDate(ris.updated_at)}</span>
                      </>
                    )}
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2 text-center">
                    <span className="">{ris.approved_by ? formatDate(ris.updated_at) : ''}</span>
                  </td>
                  <td className="border border-black border-t-0 border-l-0 font-normal px-2 text-center">
                    <span className="">{ris.approved_by ? formatDate(ris.updated_at) : ''}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-center text-xs">
            Gymnasium Right-Side Ground Floor, BiPSU-Main Campus, P. Inocentes
            St., P.I. Garcia, Naval, Biliran Province, Phillipines 6560 <br />
            Tel. (053) 507-0073 <br />
            SUC Level III-A (Per DBM-CHED Joint Circular #B dated June 21, 2007{' '}
            <br />
            Website: www.nsu.edu.ph ן Email: nsusupplyoffice@gmail.com <br />
            <span className="text-lg font-bold text-green-500">
              {' '}
              " Wow
            </span>{' '}
            <span className="text-lg font-bold">
              <span className="text-blue-500">Bi</span>
              <span className="text-blue-500">P</span>
              <span className="text-orange-400">SU</span> "
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            {' '}
            <button
              onClick={(ev) => window.history.back()}
              className="btn btn-default"
              to={'/supply/add'}
            >
              Back
            </button>
          </div>
          <div>
            {ris.submit == 0 ? (
              <>
                {' '}
                <button
                  onClick={(ev) => submitForm()}
                  className="btn btn-primary"
                  to={'/supply/add'}
                >
                  {btnLoading ? 'Loading...' : 'Submit'}
                </button>
              </>
            ) : null}

            {
              ris.status == 'pending' ? <>
                {
                  user.role === 'general admin' ? <>
                    <button
                      onClick={(ev) => approveForm()}
                      className="btn btn-primary"
                      to={'/supply/add'}
                    >
                      {btnLoading ? 'Loading...' : 'Issue RIS'}
                    </button>
                  </> : null
                }
              </> : null
            }

          </div>
        </div>
      </div>
    </>
  );
}
