import { Link as RouterLink } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Stack, Box } from '@mui/material';



// hooks
import useResponsive from '../../theme/hooks/useResponsive';
import Logo from '../Logo';

import RegisterForm from "./RegisterForm"
import Copyright from '../Copyright';

const RootStyle = styled('div')(({
    theme
}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({
    theme
}) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
  }));
  
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));

export default function Login() {
    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');
    return ( 
        <RootStyle>
        <HeaderStyle>
        <Box/>
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account?  {''}
              <Link variant="subtitle2" component={RouterLink} to="/">
                Login
              </Link>
            </Typography>
          )}
    </HeaderStyle>
        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Manage the expense more effectively with SplitApp !
            </Typography>
            <img src="/static/illustrations/illustration_register.png" alt="login" />
          </SectionStyle>
        )}
         <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
                Get started absolutely free.
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Open Source, Group expense splitting app!</Typography>

            <RegisterForm />
            {/* <AuthSocial />*/}

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?  {''}
                <Link variant="subtitle2" component={RouterLink} to="/">
                Login
                </Link>
              </Typography>
            )}

            <Stack spacing={3} sx={{mt: 5}}>
                <Copyright/>
            </Stack> 
          </ContentStyle>
        </Container>
        </RootStyle>
    )
}