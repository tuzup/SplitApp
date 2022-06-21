import {useRoutes} from 'react-router-dom';

//Layouts 
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

//Pages 
import Login from './components/login';
import Register from './components/register'


export default function Router() {
  return useRoutes([
    {
        path: '/',
        element: <LogoOnlyLayout />,
        children: [
            {path: '', element: <Login/>},
            {path: '/register', element: <Register/> }
        ]
    }
  ])
}