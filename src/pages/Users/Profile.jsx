import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../../images/user/user.jpg'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axiosClinet';

const config = {
  headers: {
      'content-type': 'multipart/form-data'
  }
};

const Profile = () => {
  const [payload, setPayload] = useState({
    lastname: '',
    firstname: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: '',
    photo: ''
  });
  const [errors, setErrors] = useState([]);
  const {user} = useStateContext()
  const [btnLoading, setBtnLoading] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const saveDepartment = async (ev) => {
    ev.preventDefault()
    console.log(payload);
    setErrors([])
    setBtnLoading(true)
    try {
      const {data} = await axiosClient.post(`/users/edit/${user.id}`, payload, config)
      window.location.reload()
    } catch (error) {
      setBtnLoading(false)
      if(error.response.data.errors){
        setErrors(error.response.data.errors)
      }else{
        setErrors({password: 'Server Error! Please Try Again'})
      }
    }
  }

  useEffect(() => {
    setPayload({
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      username: user.username,
      role: user.role,
    })
  }, [user]) 
  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="flex gap-2">
        <div className="bg-white w-[30%] shadow-sm rounded-sm flex justify-center p-4 h-[300px]">
          <div>
            <img
              src={user.photo ? `${import.meta.env.VITE_API_BASE_URL}/storage/${user.photo}` : User}
              className="rounded-full h-[200px] w-[200px]"
              alt=""
            />
            <h1
              className="text-center mt-2 poppins-extralight"
              style={{ fontFamily: ' "Poppins", sans-serif' }}
            >
              {user.lastname} {user.firstname}
            </h1>
            <p
              className="text-center capitalize"
              style={{ fontFamily: ' "Poppins", sans-serif' }}
            >
              {user.role}
            </p>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-sm p-5 w-[70%]">
        <h1 className='mb-2' style={{fontFamily: ' "Poppins", sans-serif'}}>Account Details</h1>
          <form>
            <div>
              <div className="mb-4">
                <label className="mb-2 block text-black dark:text-white">
                  Change Profile Picture
                </label>
                <input
                  type="file"
                  placeholder="Lastname"
                  accept="image/png, image/jpeg, image/jpg"
                  name="lastname"
                  onChange={ev => setPayload({...payload, photo: ev.target.files[0]})}
                  className={`${
                    errors.lastname ? 'border-red-500' : 'border-stroke'
                  } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {errors.lastname ? (
                  <p className="text-red-500 italic">
                    <i className="fa-solid fa-circle-exclamation"></i>{' '}
                    {errors.lastname}
                  </p>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-black dark:text-white">
                  Lastname
                </label>
                <input
                  type="text"
                  placeholder="Lastname"
                  name="lastname"
                  onChange={onChange}
                  value={payload.lastname}
                  className={`${
                    errors.lastname ? 'border-red-500' : 'border-stroke'
                  } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {errors.lastname ? (
                  <p className="text-red-500 italic">
                    <i className="fa-solid fa-circle-exclamation"></i>{' '}
                    {errors.lastname}
                  </p>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-black dark:text-white">
                  Firstname
                </label>
                <input
                  type="text"
                  placeholder="Firstname"
                  name="firstname"
                  onChange={onChange}
                  value={payload.firstname}
                  className={`${
                    errors.firstname ? 'border-red-500' : 'border-stroke'
                  } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {errors.firstname ? (
                  <p className="text-red-500 italic">
                    <i className="fa-solid fa-circle-exclamation"></i>{' '}
                    {errors.firtname}
                  </p>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-black dark:text-white">
                  Email
                </label>
                <input
                  disabled  
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={onChange}
                  value={payload.email}
                  className={`${
                    errors.email ? 'border-red-500' : 'border-stroke'
                  } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {errors.email ? (
                  <p className="text-red-500 italic">
                    <i className="fa-solid fa-circle-exclamation"></i>{' '}
                    {errors.email}
                  </p>
                ) : null}
              </div>

              {/* <div className="mb-4">
                <label className="mb-2 block text-black dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={onChange}
                  value={payload.username}
                  className={`${
                    errors.username ? 'border-red-500' : 'border-stroke'
                  } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {errors.username ? (
                  <p className="text-red-500 italic">
                    <i className="fa-solid fa-circle-exclamation"></i>{' '}
                    {errors.username}
                  </p>
                ) : null}
              </div> */}

              <div className="mb-4.5 mt-2 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-black dark:text-white">
                    Change Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                    value={payload.password}
                    className={`${
                      errors.password ? 'border-red-500' : 'border-stroke'
                    } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors.password ? (
                    <p className="text-red-500 italic">
                      <i className="fa-solid fa-circle-exclamation"></i>{' '}
                      {errors.password}
                    </p>
                  ) : null}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-black dark:text-white">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password_confirmation"
                    onChange={onChange}
                    value={payload.password_confirmation}
                    className={`${
                      errors.password_confirmation
                        ? 'border-red-500'
                        : 'border-stroke'
                    } w-full rounded-lg border-[1.5px] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors.password_confirmation ? (
                    <p className="text-red-500 italic">
                      <i className="fa-solid fa-circle-exclamation"></i>{' '}
                      {errors.password_confirmation}
                    </p>
                  ) : null}
                </div>
              </div>
                <div className="w-full mt-4 flex items-center justify-between">
                  <div></div>
                  <div>
                    <button className='btn btn-primary' onClick={saveDepartment}>Save</button>
                  </div>
                </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
