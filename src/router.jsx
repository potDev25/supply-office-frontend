import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Dasboard from "./pages/Admin/Dasboard";
import Documents from "./pages/Admin/Documents";
import Departments from "./pages/Admin/Departments";
import Settings from "./pages/Admin/Settings";
import Staffs from "./pages/Admin/Users";
import Admins from "./components/tabs/Admins";
import AddUser from "./pages/Admin/AddUser";
import Users from "./pages/Admin/Users";
import Applicants from "./pages/Admin/Departments";
import Businesses from "./pages/Admin/Businesses";
import Announcements from "./pages/Admin/Announcements";
import Applicant from "./pages/Admin/Applicant";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
            {
                path: '/',
                element: <Dasboard/>
            },
            {
                path: '/documents',
                element: <Documents/>
            },
            {
                path: '/applicants',
                element: <Applicants/>
            },
            {
                path: '/settings',
                element: <Settings/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/registered-businesses',
                element: <Businesses/>
            },
            {
                path: '/announcements',
                element: <Announcements/>
            },
            {
                path: '/applicant/view/:id',
                element: <Applicant/>
            },
        ]
    }
])

export default router;