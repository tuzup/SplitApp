import {useRoutes} from 'react-router-dom';

//Layouts 
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

//Pages 
import Login from './components/login';
import Register from './components/register'
import Page404 from './components/Page404';


export default function Router() {
  return useRoutes([
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