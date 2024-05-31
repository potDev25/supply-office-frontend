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
import GuestLayout from "./components/Layout/GuestLayout";
import Landingpage from "./pages/Guest/Landingpage";

const guest_router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Landingpage/>
            }
        ]
    },
])

export default guest_router;