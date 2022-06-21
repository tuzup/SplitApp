import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import Logo from '../components/Logo';


// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

const StyleBox = styled(Box)(({theme})=> ({
    background: theme.palette.mode === 'dark' ? '#1A2027' : '#f9fafb',
    borderRadius: 5,
    width: "35%",
    height: "100%",
    padding: 10,
    display: {
        xs: "none",
        sm: "block" 
    }

}))

export default function LogoOnlyLayout() {
  return (
    <>
    <HeaderStyle>
        <Logo />
    </HeaderStyle>
    <Outlet/>
    </>
  );
}
