import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Box, Button, Chip, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useResponsive from '../../theme/hooks/useResponsive';
import { currencyFind } from '../../utils/helper';
import { addExpenseService } from '../../services/expenseServices';
import configData from '../../config.json'
import { useParams } from 'react-router-dom'
import { getGroupDetailsService } from '../../services/groupServices';
import Loading from '../loading';
import { Link as RouterLink } from 'react-router-dom';
import AlertBanner from '../AlertBanner';


export default function AddExpense() {  
  const params = useParams();
  const mdUp = useResponsive('up', 'md');
  const profile = JSON.parse(localStorage.getItem('profile'))
  const currentUser = profile?.emailId
  const groupId = params.groupId
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  var [groupMembers,setGroupMembers] = useState()
  var [groupCurrency,setGroupCurrency] = useState()
 
  //Formink schema 
  const addExpenseSchema = Yup.object().shape({
    expenseName: Yup.string().required('Expense name is required'),
    expenseDescription: Yup.string(),
    expenseAmount: Yup.string().required('Amount is required'),
    expenseCategory: Yup.string().required('Category is required'),
    expenseType: Yup.string().required('Payment Method is required'),
    expenseMembers: Yup.array().min(1, 'Atleast one expense members is required')
  });

  const formik = useFormik({
    initialValues: {
      expenseName: '',
      expenseDescription: '',
      expenseAmount: '',
      expenseCategory: '',
      expenseDate: Date(),
      expenseMembers: [],
      expenseOwner: currentUser,
      groupId: groupId, 
      expenseType: "Cash"

    },
    validationSchema: addExpenseSchema,
    onSubmit: async () => {
      setLoading(true)
      if(await addExpenseService(values, setAlert, setAlertMessage))
       window.location = configData.VIEW_GROUP_URL+groupId
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  useEffect(() => {
    const getGroupDetails = async () => {
        setLoading(true)
        const groupIdJson = {
            id: params.groupId
        }
        const response_group = await getGroupDetailsService(groupIdJson, setAlert, setAlertMessage)
        setGroupCurrency(response_group?.data?.group?.groupCurrency)
        setGroupMembers(response_group?.data?.group?.groupMembers)
        formik.values.expenseMembers = response_group?.data?.group?.groupMembers
        setLoading(false)
    }
    getGroupDetails()
}, []);
  return (
    <>
    {loading? <Loading/> : 
      <Box sx={{
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius:2,
        ...(mdUp && { width: 700 })
      }}
      >
        <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Add Expense
        </Typography>
        <FormikProvider value={formik}>

          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ maxWidth: 800 }}>
              <Grid item xs={12} >
                <TextField fullWidth
                  type="text"
                  name="expenseName"
                  id="outlined-basic"
                  label="Expense Name"
                  variant="outlined"
                  {...getFieldProps('expenseName')}
                  error={Boolean(touched.expenseName && errors.expenseName)}
                  helperText={touched.expenseName && errors.expenseName}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  name="expenseDescription"
                  id="outlined-basic"
                  label="Expense Description"
                  variant="outlined"
                  {...getFieldProps('expenseDescription')}
                  error={Boolean(touched.expenseDescription && errors.expenseDescription)}
                  helperText={touched.expenseDescription && errors.expenseDescription}
                />
              </Grid>

              <Grid item xs={12} >
                <FormControl fullWidth
                  error={Boolean(touched.expenseOwner && errors.expenseOwner)}
                >
                  <InputLabel id="expense-owner">Expense Owner</InputLabel>
                  <Select
                    name='expenseOwner'
                    labelId="expense-owner"
                    id="demo-simple-select"
                    label="Expense Owner"
                    {...getFieldProps('expenseOwner')}
                  >
                    {groupMembers?.map((member) => (
                      <MenuItem
                        key={member}
                        value={member}
                      >
                        {member}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{touched.expenseOwner && errors.expenseOwner}</FormHelperText>

                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }} error={Boolean(touched.expenseMembers && errors.expenseMembers)}>
                  <InputLabel id="expense-members-label">Expense Members</InputLabel>
                  <Select
                    labelId="expense-members-label"
                    id="expense-members"
                    multiple
                    {...getFieldProps('expenseMembers')}
                    input={<OutlinedInput id="expense-members" label="Expense Members" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}>
                    {groupMembers?.map((member) => (
                      <MenuItem
                        key={member}
                        value={member}
                      >
                        {member}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{touched.expenseMembers&& errors.expenseMembers}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={6} >
                <TextField
                  fullWidth
                  name="expenseAmount"
                  id="outlined-basic"
                  type="number"

                  label="Expense Amount"
                  variant="outlined"
                  {...getFieldProps('expenseAmount')}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {currencyFind(groupCurrency)}
                      </InputAdornment>
                    ),
                  }}

                  error={Boolean(touched.expenseAmount && errors.expenseAmount)}
                  helperText={touched.expenseAmount && errors.expenseAmount}
                />
              </Grid>
              <Grid item xs={6} >
                <FormControl fullWidth
                  error={Boolean(touched.expenseCategory && errors.expenseCategory)}
                >
                  <InputLabel id="expense-category">Expense Category</InputLabel>
                  <Select
                    name='expenseCategory'
                    labelId="expense-category"
                    id="demo-simple-select"
                    label="Expense Category"
                    {...getFieldProps('expenseCategory')}
                  >
                    <MenuItem value={'Food & drink'}>Food & drink</MenuItem>
                    <MenuItem value={'Shopping'}>Shopping</MenuItem>
                    <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                    <MenuItem value={'Home'}>Home</MenuItem>
                    <MenuItem value={'Transportation'}>Transportation</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                  </Select>
                  <FormHelperText>{touched.expenseCategory && errors.expenseCategory}</FormHelperText>

                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl fullWidth
                  error={Boolean(touched.expenseType&& errors.expenseType)}
                >
                  <InputLabel id="expense-type">Payment Method</InputLabel>
                  <Select
                    name='expenseType'
                    labelId="expense-type"
                    id="demo-simple-select"
                    label="Payment Method"
                    {...getFieldProps('expenseType')}
                  >
                    <MenuItem value={'Cash'}>Cash</MenuItem>
                    <MenuItem value={'UPI Payment'}>UPI Payment</MenuItem>
                    <MenuItem value={'Card'}>Card</MenuItem>
                  </Select>
                  <FormHelperText>{touched.expenseType && errors.expenseType}</FormHelperText>

                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {mdUp ? 
                  <DesktopDatePicker
                  name="expenseDate"
                  label="Expense Date"
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} sx={{width: '100%'}}
                  />}
                  value={formik.values.expenseDate}
                  onChange={(value) => {
                  formik.setFieldValue('expenseDate', Date.parse(value));
                      }}
                />
                  :
                  <MobileDatePicker
                    name="expenseDate"
                    label="Expense Date"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} sx={{width: '100%'}}
                    />}
                    value={formik.values.expenseDate}
                    onChange={(value) => {
        		        formik.setFieldValue('expenseDate', Date.parse(value));
        		            }}
                        
                  />}
                </LocalizationProvider>
              </Grid>

              {mdUp && <Grid item xs={0} md={6} />}
              <Grid item xs={6} md={3}>
                <Button fullWidth size="large"variant="outlined" component={RouterLink} to={configData.VIEW_GROUP_URL+groupId}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Add Expense
                </LoadingButton>
              </Grid>
             
            </Grid>
          </Form>
        </FormikProvider>
      </Box> }
      </>                  
  )
}
