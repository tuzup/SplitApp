import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {  Stack,  TextField, IconButton, InputAdornment,  Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../Iconify';
import { register } from '../../services/auth';

import useResponsive from '../../theme/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const smUp = useResponsive('up', 'sm');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    emailId: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
    .min(8, 'Password should be 8 characters minimum'),
    firstName: Yup.string().required('First Name is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      remember: true,
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      //User Register Service call - Upon success user is redirected to dashboard 
      //Register fail snackbar displays error
      await register(values, setShowAlert, setAlertMessage)
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
    {!smUp &&
    <Snackbar
      open={showAlert}
      autoHideDuration={6000}
       >
         <Alert severity="error" sx={{ width: '100%' }}>
         {alertMessage}
        </Alert>
      </Snackbar>
    }
        <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          
          <Stack spacing={3}>
            <Stack spacing={3} direction="row"
            alignItems="center" justifyContent="space-between"
            >
            <TextField
            disabled
            id="outlined-disabled"
            label="First Name"
            defaultValue="Sunny"
            sx={{width:"100%"}}
            />
              <TextField
            disabled
            id="outlined-disabled"
            label="Last Name"
            defaultValue="George"
            sx={{width:"100%"}}
            />
            
          
              </Stack>

            <TextField
              disabled
              id="outlined-disabled"
              label="Email address"
              defaultValue="s4sunnygeorge@gmail.com"
              sx={{width:"100%"}}
              />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider></>
  );
}
