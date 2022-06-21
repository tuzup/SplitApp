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


export default function Router() {
  return useRoutes([
    {
      path: configData.DASHBOARD_URL,
      element: <DashboardLayout />
    },
    {
        path: '/',
        element: <LogoOnlyLayout />,
        children: [
            {path: '', element: <Login/>},
            {path: '/register', element: <Register/> },
        ]
    },
    {path: '*', element: <Page404/>}
  ])
}