// component
import Iconify from '../../components/Iconify';

import configData from '../../config.json'

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: configData.DASHBOARD_URL,
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'groups',
    path: '/dashboard/user',
    icon: getIcon('clarity:group-solid'),
  },
  {
    title: 'add expense',
    path: '/dashboard/products',
    icon: getIcon('fluent:form-new-28-filled'),
  },
  {
    title: 'Create Group',
    path: '/dashboard/blog',
    icon: getIcon('fa6-solid:users-gear'),
  },
  {
    title: 'login',
    path: configData.LOGIN_URL,
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
