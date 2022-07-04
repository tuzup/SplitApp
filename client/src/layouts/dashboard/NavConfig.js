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
    path: configData.USER_GROUPS_URL,
    icon: getIcon('clarity:group-solid'),
  },
  {
    title: 'Create Group',
    path: configData.CREATE_GROUP_URL,
    icon: getIcon('fa6-solid:users-gear'),
  },
  {
    title: 'About',
    path: configData.ABOUT_URL,
    icon: getIcon('fluent:info-12-filled'),
  },
];

export default navConfig;
