import {useRoutes} from 'react-router-dom';

//Layouts 
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

//configfile import 
import configData from "./config.json"

//Pages 
import Login from './components/login';
import Register from './components/register'
import Page404 from './components/Page404';
import DashboardLayout from './layouts/dashboard';
import Profile from './components/profile';
import PageUserDeleted from './components/profile/PageUserDeleted';


export default function Router() {
  return useRoutes([
    {
      path: configData.DASHBOARD_HOME_URL,
      element: <DashboardLayout />,
      children: [
        {path:configData.DASHBOARD_URL},
        {path: configData.CREATE_GROUP_URL},
        {path:configData.ADD_EXPENSE_URL},
        {path:configData.USER_GROUPS_URL},
        {path:configData.ABOUT_URL},
        {path:configData.USER_PROFILE_URL,
          element: <Profile/>
        }
      ]
    },
    {
        path: configData.LOGIN_URL,
        element: <LogoOnlyLayout />,
        children: [
            {path: '', element: <Login/>},
            {path: configData.REGISTER_URL, element: <Register/> },
            {path: configData.USER_DELETED_URL, element: <PageUserDeleted/>}
        ]
    },
    {path: '*', element: <Page404/>}
  ])
}