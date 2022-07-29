import { DesktopDatePicker, LoadingButton, LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import useResponsive from '../../../theme/hooks/useResponsive';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { currencyFind } from "../../../utils/helper";
import Loading from "../../loading";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { settlementService } from "../../../services/groupServices";
import AlertBanner from "../../AlertBanner";
import { Box } from "@mui/system";
import Iconify from "../../Iconify";




const BalanceSettlement = ({ currencyType, settleTo, settleFrom, amount, handleClose, setReload }) => {
  const mdUp = useResponsive('up', 'md');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState()
  const [settleSuccess, setSettleSuccess] = useState(false)
  const params = useParams();

  //Formink schema 
  const settlementSchema = Yup.object().shape({
    settleTo: Yup.string().required('Settle to is required'),
    settleFrom: Yup.string().required('Settle from is required'),
    settleAmount: Yup.number().required('Amount is required').min(0, "Min is 0").max(amount, "Max is " + amount)
  });

  const formik = useFormik({
    initialValues: {
      settleTo: settleTo,
      settleFrom: settleFrom,
      settleAmount: amount,
      settleDate: Date(),
      groupId: params.groupId,
    },
    validationSchema: settlementSchema,
    onSubmit: async () => {
     
      setLoading(true)
      const response = await settlementService(values, setAlert, setAlertMessage)
    
      if(response?.data?.status === "Success"){
      setSettleSuccess(true)
      setReload(true)
      }
      setLoading(false)
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
    {loading? <Loading/> : 
    
    <>
    {settleSuccess ? 
      <Grid container
      direction="column"
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '200px' }}
    >
      <Iconify icon="icon-park-twotone:success" sx={{color: (theme) => theme.palette['success'].dark, fontSize: 100}} />
      <Typography variant="h4" textAlign={'center'} mt={2}>
          Settlement Successfull !
      </Typography>
      </Grid>
      : 
      <>
      <Typography id="modal-modal-title" variant="h6" component="h2" mb={4}>
        Settle Balance
      </Typography>
      <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
      
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="settleTo"
                id="outlined-basic"
                type="text"
                label="Settlement to"
                variant="outlined"
                disabled
                {...getFieldProps('settleTo')}
                error={Boolean(touched.settleTo && errors.settleTo)}
                helperText={touched.settleTo && errors.settleTo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="settleFrom"
                id="outlined-basic"
                type="text"
                label="Settlement from"
                variant="outlined"
                disabled
                {...getFieldProps('settleFrom')}
                error={Boolean(touched.settleFrom && errors.settleFrom)}
                helperText={touched.settleFrom && errors.settleFrom}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {mdUp ?
                  <DesktopDatePicker
                    name="settleDate"
                    label="Settlement Date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} sx={{ width: '100%' }}
                    />}
                    value={formik.values.settleDate}
                    onChange={(value) => {
                      formik.setFieldValue('settleDate', Date.parse(value));
                    }}

                  />
                  :
                  <MobileDatePicker
                    name="settleDate"
                    label="Settlement Date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} sx={{ width: '100%' }}
                    />}
                    value={formik.values.settleDate}
                    onChange={(value) => {
                      formik.setFieldValue('settleDate', Date.parse(value));
                    }}

                  />}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={8}>

              <TextField
                fullWidth
                name="settleAmount"
                id="outlined-basic"
                type="number"
                label="Settlement Amount"
                variant="outlined"
                min={5}
                {...getFieldProps('settleAmount')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {currencyFind(currencyType)}
                    </InputAdornment>
                  ),
                }}

                error={Boolean(touched.settleAmount && errors.settleAmount)}
                helperText={touched.settleAmount && errors.settleAmount}
              />
            </Grid>

            {mdUp && <Grid item xs={0} md={6} />}
            <Grid item xs={6} md={3}>
              <Button fullWidth size="large" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6} md={3}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                Settle
              </LoadingButton>
            </Grid>

          </Grid>
        </Form>
      </FormikProvider>
      </>
      }
    </>}
    </>
  )
}

export default BalanceSettlement