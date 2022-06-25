import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment, Snackbar, Alert, Grid, Button, Input } from '@mui/material';

// component
import Iconify from '../Iconify';
import { updatePassword } from '../../services/auth';

import useResponsive from '../../theme/hooks/useResponsive';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import AlertBanner from '../AlertBanner';

// ----------------------------------------------------------------------

ChangePassword.propTypes = {
  emailId: PropTypes.string,
  hidePassUpdate: PropTypes.func,
  showHomeAlert: PropTypes.func,
  homeAlertMessage: PropTypes.func,
};

export default function ChangePassword({ hidePassUpdate, emailId, showHomeAlert, homeAlertMessage }) {
  const smUp = useResponsive('up', 'sm');


  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(" ");

  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const RegisterSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().required('New Password is required')
      .min(8, 'Password should be 8 characters minimum'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      emailId: emailId,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      //User Register Service call - Upon success user is redirected to dashboard
      //Register fail snackbar displays error
      const update_response = await updatePassword(values, setShowAlert, setAlertMessage, showHomeAlert, homeAlertMessage)
      {
        update_response &&
        hidePassUpdate()
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPasswordNew = () => {
    setShowPasswordNew((show) => !show);
  };

  const handleShowPasswordOld = () => {
    setShowPasswordOld((show) => !show);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((show) => !show);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

          <Stack spacing={3}>

            <AlertBanner showAlert={showAlert} alertMessage={alertMessage} severity='error' />

            <TextField name="oldPassword" fullWidth autoComplete="current-password" type={showPasswordOld ? 'text' : 'password'
            } label="Old Password" {...getFieldProps('oldPassword')} InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordOld} edge="end">
                    <Iconify icon={showPasswordOld ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }} error={Boolean(touched.oldPassword && errors.oldPassword)} helperText={touched.oldPassword &&
              errors.oldPassword} />

            <TextField name="newPassword" fullWidth autoComplete="current-password" type={showPasswordNew ? 'text' : 'password'
            } label="New Password" {...getFieldProps('newPassword')} InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordNew} edge="end">
                    <Iconify icon={showPasswordNew ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }} error={Boolean(touched.newPassword && errors.newPassword)} helperText={touched.newPassword &&
              errors.newPassword} />


            <TextField name="confirmPassword" fullWidth autoComplete="current-password" type={showPasswordConfirm ? 'text'
              : 'password'} label="Confirm Password" {...getFieldProps('confirmPassword')} InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPasswordConfirm} edge="end">
                      <Iconify icon={showPasswordConfirm ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }} error={Boolean(touched.confirmPassword && errors.confirmPassword)} helperText={touched.confirmPassword &&
                errors.confirmPassword} />
          </Stack>
          <Grid container spacing={2} mt={2} justifyContent={'center'}>
            <Grid item md={6} xs={11}>
              <Button startIcon={<Iconify icon='material-symbols:cancel' />} size="large" onClick={hidePassUpdate} variant="outlined" color={'error'}
                sx={{ width: '100%' }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item md={6} xs={11}>
              <LoadingButton startIcon={<Iconify icon='teenyicons:tick-circle-solid' />} fullWidth size="large" type='submit' variant="outlined" loading={isSubmitting}>
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}