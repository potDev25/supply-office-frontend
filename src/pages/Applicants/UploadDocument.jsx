
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userThree from '../../images/user/user-03.png'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axiosClinet';
import Select from 'react-select'
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Heading,
  Font,
  List,
  Table,
  MediaEmbed,
} from 'ckeditor5';

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadDocument = () => {
  const {setNotification, departments} = useStateContext()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [sanitary, setSanitary] = useState(null)
  const [barangay, setBarangay] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [payload, setPayload] = useState({
    title: '',
    description: '',
    document : '',
  })

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const zoomPluginInstance = zoomPlugin();


  const onChange = (e) => {
    const {name, value} = e.target
    setPayload((prev) => {
      return {...prev, [name] : value}
    })
  }


  const handleDisplaySanitary = (ev) => {
    setPayload({...payload, document: ev.target.files[0]})
    const pdf = ev.target.files[0]
    const pdfUrl = URL.createObjectURL(pdf)
    setSanitary(pdfUrl)
  }


  const register = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors([])
    try {
      const {data} = await axiosClient.post('/documents/store', payload, config)
      setLoading(false)
      setNotification('Document Uploaded Successfully')
      navigate('/dashboard')
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
        <Breadcrumb pageName="Upload Document" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Document Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      className={`${errors.title ? 'border border-red-500 border-solid' : 'border border-stroke bg-gray'} w-full rounded  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary`}
                      name="title"
                      onChange={onChange}
                      id="title"
                      placeholder="Title"
                    />
                    {
                      errors.title ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.title}</p> : null
                    }
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="position"
                    >
                      Description
                    </label>
                    <CKEditor
                    editor={ClassicEditor}
                    config={{
                      toolbar: {
                        items: [
                          'heading',
                          'fontSize',
                          'fontColor',
                          'fontBackgroundColor', // Text styling options
                          '|', // Separator
                          'bold',
                          'italic',
                          'underline',
                          'strikethrough', // Basic formatting options
                          '|',
                          'bulletedList',
                          'numberedList',
                          'blockQuote', // List and block options
                          '|',
                          'link',
                          'insertTable',
                          'mediaEmbed', // Insertion options
                          '|',
                          'undo',
                          'redo', // Undo and redo actions
                        ],
                      },
                      plugins: [
                        Bold,
                        Italic,
                        Essentials,
                        Paragraph,
                        Mention,
                        Undo,
                        Heading,
                        Font,
                      ],
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setPayload({...payload, description: data}); // Update the state with the current data
                    }}
                    // Add custom style here for height
                  />
                    {
                      errors.description ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.description}</p> : null
                    }
                  </div>


                  {sanitary && (<div className='fade-in mb-5'>
                    
                    <div className='flex items-center justify-between mb-2'>
                      <h3 className="font-medium text-black dark:text-white">
                        Document
                      </h3>
                      <button onClick={ev => setSanitary(null)} className='btn btn-error btn-sm text-white' type='button'><i class="fa-solid fa-circle-xmark"></i></button>
                    </div>
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
                  Document
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
                    </> : null
                  }
                <form action="#" onSubmit={register}>

                  <div className='mb-5.5'>
                  <div
                    id="sanitary"
                    className={`${errors.document ? 'border border-dashed border-danger' : 'border border-dashed border-primary'} relative block w-full cursor-pointer appearance-none rounded  bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5`}
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
                        <span className="text-primary">Click to upload Your PDF File</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">PDF</p>
                    </div>
                  </div>
                  {
                    errors.document ? <p className='text-red-500 italic'><i className="fa-solid fa-circle-exclamation"></i> {errors.document}</p> : null
                  }
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Link
                    to={'/dashboard'}
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
                      </> : 'Upload'
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

export default UploadDocument;
