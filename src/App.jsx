import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';// Import GuestLayout
import Dashboard from './pages/Dashboard/Dashboard';
import Announcements from './pages/Announcements/Announcements';
import Applicants from './pages/Applicants/Applicants';
import Register from './pages/Applicants/Register';
import Business from './pages/Business/Business';
import Users from './pages/Users/Users';
import GuestLayout from './components/Layout/GuestLayout';
import Loader from './components/Loader/Loader';
import MSignin from './pages/Authentication/MSignin';
import Departments from './pages/Departments/Departments';
import RegisterDepartment from './pages/Departments/RegisterDepartment';
import axiosClient from './axiosClinet';
import { useStateContext } from './context/ContextProvider';
import UploadDocument from './pages/Applicants/UploadDocument';
import Files from './pages/Announcements/Files';
import Reports from './pages/Reports/Files';
import ReportPage from './pages/Reports/Announcements';
import { Edit } from 'lucide-react';
import EditUser from './pages/Applicants/Edit';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const {setUser, setDepartments} = useStateContext()

  const fetchData = async () => {
    try {
      const {data} = await axiosClient.get('/user')
      console.log(data);
      setUser(data.user)
      setDepartments(data.departments)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          index
          path='/dashboard'
          element={
            <>
              <PageTitle title="Dashboard | University BAC" />
              <Dashboard />
            </>
          }
        />
        <Route
          index
          path='/dashboard/upload'
          element={
            <>
              <PageTitle title="Upload | University BAC" />
              <UploadDocument />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/archives"
          element={
            <>
              <PageTitle title="Archives | University BAC" />
              <Announcements />
            </>
          }
        />
        <Route
          path="/reports/transactions"
          element={
            <>
              <PageTitle title="Reports | University BAC" />
              <ReportPage />
            </>
          }
        />
        <Route
          path="/archives/files/:id"
          element={
            <>
              <PageTitle title="Archives | University BAC" />
              <Files />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users | University BAC" />
              <Applicants />
            </>
          }
        />
        <Route
          path="/users/register"
          element={
            <>
              <PageTitle title="Register User | University BAC" />
              <Register />
            </>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <>
              <PageTitle title="]Edit User | University BAC" />
              <EditUser />
            </>
          }
        />
        <Route
          path="/business"
          element={
            <>
              <PageTitle title="Registered Business | University BAC" />
              <Business />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="System Users | University BAC" />
              <Users />
            </>
          }
        />
        <Route
          path="/departments"
          element={
            <>
              <PageTitle title="Departments | University BAC" />
              <Departments />
            </>
          }
        />
        <Route
          path="/departments/register"
          element={
            <>
              <PageTitle title="Departments | University BAC" />
              <RegisterDepartment />
            </>
          }
        />
      </Route>
      <Route element={<GuestLayout />}>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Signin | University BAC" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | University BAC" />
              <SignUp />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
