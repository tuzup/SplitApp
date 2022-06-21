import {useRoutes} from 'react-router-dom';

//Layouts 
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

//Pages 
import Login from './components/Login';


export default function Router() {
  return useRoutes([
    {
        path: '/',
        element: <LogoOnlyLayout />,
        children: [
            {path: 'login', element: <Login/>}
        ]
    }
  ])
}