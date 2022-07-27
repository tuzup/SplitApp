import { Container, Stack, Typography, Box, Avatar, Grid, Link, TextField, Button, ModalManager, Modal, Snackbar, Alert } from '@mui/material'
import gravatarUrl from 'gravatar-url'
import Iconify from '../Iconify'
import useResponsive from '../../theme/hooks/useResponsive' 
import UserDetails from './userDetails'
import { useState } from 'react'
import { deleteUser, getUser} from '../../services/auth'
import ChangePassword from './changePassword'
import { useEffect } from 'react'
import Loading from '../loading'
import EditForm from './editUser'
import AlertBanner from '../AlertBanner'
import configData from '../../config.json'


const profile = JSON.parse(localStorage.getItem('profile'))

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
  
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  
  useEffect(() =>{
    const getUserDetails = async () => {
      setLoading(true)
      const response = await getUser(profile, setShowAlert, setAlertMessage)
      setUser(response.data.user)
      setLoading(false)
    }
    getUserDetails()
  },[]);
return (
<Container>
  {loading ?  <Loading/>: 
  <> 
  <Typography variant="h5" component="h1">
    User Profile
  </Typography>

  <Grid container spacing={3} p={4}>
    <Grid item xs={12} md={4} align="center">
      {user.emailId && 
      <Avatar src={gravatarUrl(user.emailId, {size: 350, default: configData.USER_DEFAULT_LOGO_URL})} alt="photoURL" sx={{ width: 240, height: 240 }} />}
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

    {editUser && 
      <EditForm hideEditUser={hideEditUser} emailId = {user.emailId} firstName = {user.firstName} lastName = {user.lastName} 
showHomeAlert={setShowAlert} homeAlertMessage={setAlertMessage} 
      />
    }

    {(!editUser && !changePass)  && 
    (<>
    <AlertBanner showAlert={showAlert} alertMessage={alertMessage} severity='success' autoHideDuration={5000}
            onCloseHandle={handleAlertClose}/>

    <UserDetails firstName={user.firstName} lastName={user.lastName} emailId={user.emailId}/>
      <Grid container spacing={3} mt={1} justifyContent={'center'}>
        <Grid item xs={11} md={3}
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
        <Grid item xs={11} md={5}
         order={{xs:2, md:2}}
        >
          <Button startIcon={<Iconify icon='mdi:form-textbox-password'/>} variant="outlined" color="warning" sx={{width:"100%"}} 
          onClick = {showPassUpdate}
          >
            Change Password
          </Button>
        </Grid>
        <Grid item xs={11} md={4} 
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
  </>
}

</Container>
)
}