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
                path: '/departments',
                element: <Departments/>
            },
            {
                path: '/settings',
                element: <Settings/>
            },
            {
                path: '/users',
                element: <Users/>
            },
        ]
    }
])

export default router;