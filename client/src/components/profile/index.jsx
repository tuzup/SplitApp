import { Container, Stack, Typography, Box, Avatar, Grid, Link, TextField, Button, ModalManager, Modal, Snackbar, Alert } from '@mui/material'
import gravatarUrl from 'gravatar-url'
import Iconify from '../Iconify'
import useResponsive from '../../theme/hooks/useResponsive' 
import UserDetails from './userDetails'
import { useState } from 'react'
import { deleteUser} from '../../services/auth'
import ChangePassword from './changePassword'

const user = JSON.parse(localStorage.getItem('profile'))

const modelStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius : 1
};


export default function Profile() {
  const mdUp = useResponsive('up', 'md');
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");

  const [changePass, setChangePass] = useState(false)
  const [editUser, setEditUser] = useState(false)

  const handleAlertClose = () =>{
      setShowAlert(false)
  }

  const deleteConfirmOpen = () =>{
    setDeleteConfirm(true)
  }
  const deleteConfirmClose = () =>{
    setDeleteConfirm(false)
  }
  const showPassUpdate = () => {
    setChangePass(true)
  }
  const hidePassUpdate = () => {
    setChangePass(false)
  }
  const showEditUser = () => {
    setEditUser(true)
  }
  const hideEditUser = () => {
    setEditUser(false)
  }

  const apiDeleteCall = async() => {
    await deleteUser(user, setShowAlert, setAlertMessage) 
  }

return (
<Container>
  <Typography variant="h5" component="h1">
    User Profile
  </Typography>

  <Grid container spacing={3} p={4}>
    <Grid item xs={12} md={4} align="center">
      {user&&
      <Avatar src={gravatarUrl(user?.emailId, {size: 200})} alt="photoURL" sx={{ width: 240, height: 240 }} />}
      <Typography variant="body2" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
        *The profile picture is taken from Gravitar{' '} <br />
        <Link variant="subtitle3" component={'a'} href="https://en.gravatar.com/support/faq/" target="_blank">
        Know how to set gravitar profile pic!
        </Link>
      </Typography>
    </Grid>
    <Grid item xs={12} md={6} sx={{mt: 4}}>
    {changePass && (
      <ChangePassword hidePassUpdate={hidePassUpdate} emailId = {user.emailId}
        showHomeAlert={setShowAlert} homeAlertMessage={setAlertMessage} 
        />
        
    )}
    {(!editUser && !changePass)  && 
    (<>
    {!mdUp &&
          <Snackbar
            open={showAlert}
            autoHideDuration={6000}
            onClose={handleAlertClose}
          >
         <Alert severity="success" sx={{ width: '100%' }}>
         {alertMessage}
        </Alert>
      </Snackbar>}
      {(mdUp && showAlert) && 
      <Box mb={3}>
      <Alert severity="success" sx={{ width: '100%' }} >
      {alertMessage}
     </Alert>
     </Box>
      }
    <UserDetails/>
      <Grid container spacing={3} mt={1} px={mdUp ? 0 : 5}>
        <Grid item xs={12} md={3}
         order={{xs:3, md:1}}
        >
          <Button startIcon={<Iconify icon='fluent:delete-dismiss-24-filled'/>} variant="outlined" color="error" sx={{width:"100%"}} 
          onClick={deleteConfirmOpen}
          >
            Delete
          </Button>
          <Modal
          open={deleteConfirm}
          onClose={deleteConfirmClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box  sx={modelStyle} width={mdUp? 400 : '90%'}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm user deletion 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delte the user account?
          </Typography>
          <Stack mt={2} spacing={2} direction={'row'}>
          <Button startIcon={<Iconify icon='fluent:delete-dismiss-24-filled'/>} variant="outlined" color="error" sx={{ width:'100%'}}
          onClick={apiDeleteCall}
          >
            Delete Account
          </Button>
          <Button startIcon={<Iconify icon='material-symbols:cancel'/>} variant="outlined" color="primary" sx={{ width:'100%'}}
          onClick={deleteConfirmClose}
          >
            Cancel
          </Button>
          </Stack>
        </Box>
          </Modal>
        </Grid>
        <Grid item xs={12} md={5}
         order={{xs:2, md:2}}
        >
          <Button startIcon={<Iconify icon='mdi:form-textbox-password'/>} variant="outlined" color="warning" sx={{width:"100%"}} 
          onClick = {showPassUpdate}
          >
            Change Password
          </Button>
        </Grid>
        <Grid item xs={12} md={4} 
        order={{xs:1, md:3}}
        >
          <Button startIcon={<Iconify icon='clarity:edit-solid'/>} variant="outlined" sx={{width:"100%"}} 
          onClick={showEditUser}
          >
            Edit Details
          </Button>
        </Grid>
      </Grid>
      </>
      )}
    </Grid>
  </Grid>

</Container>
)
}