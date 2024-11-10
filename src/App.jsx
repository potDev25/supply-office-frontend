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
import ReturnModal from './components/Modal/ReturnModal';
import ReturnStatus from './pages/Departments/ReturnStatus';
import Annual from './pages/Departments/Annual';
import UploadApp from './pages/Applicants/UploadApp';
import EditApp from './pages/Applicants/EditApp';
import Supplies from './pages/Supplies/Supplies';
import Categories from './pages/Supplies/Categories';
import AddSupply from './pages/Applicants/AddSupply';
import EditSupply from './pages/Applicants/EditSupply';
import From from './pages/From';
// import Signature from './pages/Signature';
import SignaturePad from './pages/Signature';
import Receiving from './pages/Announcements/Receiving';
import Supplier from './pages/Supplies/Supplier';
import ReceivingSupplies from './pages/Supplies/ReceivingSupplies';
import RequestSupply from './pages/Announcements/RequestSupply';
import RequestManage from './pages/Supplies/RequestManage';
import Par from './pages/Announcements/Par';
import ParSupplies from './pages/Supplies/ParSupplies';
import ParClient from './pages/Supplies/ParClient';
import ReportByDepartment from './pages/Announcements/ReportByDepartment';
import ReportSupplies from './pages/Supplies/ReportSupplies';
import ParReport from './pages/Supplies/ParReport';
import StockinReport from './pages/Supplies/StockinReport';
import ParAudit from './pages/Announcements/ParAudit';
import ReceivingAudit from './pages/Announcements/ReceivingAudit';
import RisAudit from './pages/Announcements/RisAudit';
import Profile from './pages/Users/Profile';
import FormPage from './pages/FormPage';


function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const {setUser, setDepartments, setCategories, setSupplier, setSupplies} = useStateContext()

  const fetchData = async () => {
    try {
      const {data} = await axiosClient.get('/user')
      console.log(data);
      setCategories(data.categories)
      setUser(data.user)
      setDepartments(data.departments)
      setSupplier(data.supplier)
      setSupplies(data.supplies)
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
              <PageTitle title="Dashboard | University Supply Office" />
              <Dashboard />
            </>
          }
        />
        <Route
          index
          path='/dashboard/upload'
          element={
            <>
              <PageTitle title="Upload | University Supply Office" />
              <UploadDocument />
            </>
          }
        />
        <Route
          index
          path='/app/upload'
          element={
            <>
              <PageTitle title="Upload | University Supply Office" />
              <UploadApp />
            </>
          }
        />
        <Route
          index
          path='/app/edit/:id'
          element={
            <>
              <PageTitle title="Upload | University Supply Office" />
              <EditApp />
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
          path="/receiving/store/:id"
          element={
            <>
              <PageTitle title="Receiving | University Supply Office OFFICE" />
              <ReceivingSupplies />
            </>
          }
        />
        <Route
          path="/issued/transactions/view/:id"
          element={
            <>
              <PageTitle title="University Supply Office OFFICE" />
              <ReportSupplies />
            </>
          }
        />
        <Route
          path="/par/store/:id"
          element={
            <>
              <PageTitle title="Receiving | University Supply Office OFFICE" />
              <ParSupplies />
            </>
          }
        />
        <Route
          path="/parequest-reports/transactions"
          element={
            <>
              <PageTitle title="Receiving | University Supply Office OFFICE" />
              <ParReport />
            </>
          }
        />
        <Route
          path="/stocks/reporst"
          element={
            <>
              <PageTitle title="University Supply Office OFFICE" />
              <StockinReport />
            </>
          }
        />
        <Route
          path="/par/client/"
          element={
            <>
              <PageTitle title="Receiving | University Supply Office OFFICE" />
              <ParClient />
            </>
          }
        />
        <Route
          path="/request/store/:id"
          element={
            <>
              <PageTitle title="Receiving | University Supply Office OFFICE" />
              <RequestManage />
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
              <PageTitle title="Archives | University Supply Office" />
              <Announcements />
            </>
          }
        />
        <Route
          path="/receiving"
          element={
            <>
              <PageTitle title="Archives | University Supply Office" />
              <Receiving />
            </>
          }
        />
        <Route
          path="/par1"
          element={
            <>
              <PageTitle title="Archives | University Supply Office" />
              <Par />
            </>
          }
        />
        <Route
          path="/requests"
          element={
            <>
              <PageTitle title="Archives | University Supply Office" />
              <RequestSupply />
            </>
          }
        />
        <Route
          path="/issued/transactions"
          element={
            <>
              <PageTitle title="University Supply Office" />
              <ReportByDepartment />
            </>
          }
        />
        <Route
          path="/reports/transactions"
          element={
            <>
              <PageTitle title="Reports | University Supply Office" />
              <ReportPage />
            </>
          }
        />
        <Route
          path="/return-status"
          element={
            <>
              <PageTitle title="Return Status | University Supply Office" />
              <ReturnStatus />
            </>
          }
        />
        <Route
          path="/archives/files/:id"
          element={
            <>
              <PageTitle title="Archives | University Supply Office" />
              <Files />
            </>
          }
        />
        <Route
          path="/par-audit"
          element={
            <>
              <PageTitle title="University Supply Office" />
              <ParAudit />
            </>
          }
        />
        <Route
          path="/ris-audit"
          element={
            <>
              <PageTitle title="University Supply Office" />
              <RisAudit />
            </>
          }
        />
        <Route
          path="/receiving-audit"
          element={
            <>
              <PageTitle title="University Supply Office" />
              <ReceivingAudit />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users | University Supply Office" />
              <Applicants />
            </>
          }
        />
        <Route
          path="/users/register"
          element={
            <>
              <PageTitle title="Register User | University Supply Office" />
              <Register />
            </>
          }
        />
        <Route
          path="/supply/add"
          element={
            <>
              <PageTitle title="Add Supply | University Supply Office" />
              <AddSupply />
            </>
          }
        />
        <Route
          path="/supply/edit/:id"
          element={
            <>
              <PageTitle title="Add Supply | University Supply Office" />
              <EditSupply />
            </>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <>
              <PageTitle title="]Edit User | University Supply Office" />
              <EditUser />
            </>
          }
        />
        <Route
          path="/business"
          element={
            <>
              <PageTitle title="Registered Business | University Supply Office" />
              <Business />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="System Users | University Supply Office" />
              <Users />
            </>
          }
        />
        <Route
          path="/form/:id"
          element={
            <>
              <PageTitle title="System Users | University Supply Office" />
              <FormPage />
            </>
          }
        />
        <Route
          path="/departments"
          element={
            <>
              <PageTitle title="Departments | University Supply Office" />
              <Departments />
            </>
          }
        />
        <Route
          path="/e-signature"
          element={
            <>
              <PageTitle title="Departments | University Supply Office" />
              <SignaturePad />
            </>
          }
        />
        <Route
          path="/supplies"
          element={
            <>
              <PageTitle title="Supplies | University Supply Office" />
              <Supplies />
            </>
          }
        />
        <Route
          path="/categories"
          element={
            <>
              <PageTitle title="Categories | University Supply Office" />
              <Categories />
            </>
          }
        />
        <Route
          path="/supplier"
          element={
            <>
              <PageTitle title="Supplier | University Supply Office" />
              <Supplier />
            </>
          }
        />
        <Route
          path="/app"
          element={
            <>
              <PageTitle title="Annual Procurement Plan | University Supply Office" />
              <Annual />
            </>
          }
        />
        <Route
          path="/departments/register"
          element={
            <>
              <PageTitle title="Departments | University Supply Office" />
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
              <PageTitle title="Signin | University Supply Office" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | University Supply Office" />
              <SignUp />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
