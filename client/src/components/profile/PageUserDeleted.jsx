import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Stack } from '@mui/material';
import Copyright from '../Copyright';

import configData from '../../config.json'

const ContentStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
  }));


export default function PageUserDeleted() {
  return (
<Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Stack spacing={6} direction={'row'} sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Box>
          <Typography variant="h3" paragraph>
            User Account deleted !
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Thank you for using SplitApp! <br/>
          </Typography>
          </Box>
          <Box
            component="img"
            src="/static/illustrations/illustration_avatar.png"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
            </Stack>
          <Button to={configData.LOGIN_URL} size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>

          <Stack spacing={3} sx={{mt: 5}}>
                <Copyright/>
            </Stack> 
        </ContentStyle>
      </Container>
  )
}
