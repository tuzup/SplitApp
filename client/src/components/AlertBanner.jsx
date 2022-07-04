
import { Box, Snackbar, Alert } from '@mui/material'
import PropTypes from 'prop-types';
import useResponsive from '../theme/hooks/useResponsive';


AlertBanner.propTypes = {
    showAlert : PropTypes.bool,
    alertMessage: PropTypes.string,
    severity: PropTypes.string,
    autoHideDuration: PropTypes.number,
    onCloseHandle: PropTypes.func,
}

export default function AlertBanner({showAlert, alertMessage, severity='error', autoHideDuration, onCloseHandle }) {
    const mdUp = useResponsive('up', 'md');
  return (
    <>
    {!mdUp &&
        <Snackbar
          open={showAlert}
          autoHideDuration={autoHideDuration}
          onClose={onCloseHandle}
        >
       <Alert severity={severity} sx={{ width: '100%' }}>
       {alertMessage}
      </Alert>
    </Snackbar>}
    {(mdUp && showAlert) && 
    <Box mb={3}>
    <Alert severity={severity} sx={{ width: '100%' }} >
    {alertMessage}
    </Alert>
    </Box>
    }
    </>
  )
}


