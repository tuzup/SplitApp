import { Box, Button, Grid, styled, Typography } from '@mui/material'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpDetailsService } from "../../services/expenseServices";
import useResponsive from "../../theme/hooks/useResponsive";
import { convertToCurrency, currencyFind } from '../../utils/helper';
import Loading from "../loading";
import AlertBanner from '../AlertBanner';

export const ViewExpense = () => {
    const navigate = useNavigate();
    const params = useParams();
    const mdUp = useResponsive('up', 'md');
    const expenseId = params.expenseId
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [expenseDetails, setExpenseDetails] = useState()

    const TextStyle = styled('span')(({ theme }) => ({
        marginLeft: 5,
        padding: 6,
        background: theme.palette['primary'].lighter,
        color: theme.palette['primary'].darker,
        borderRadius: 5
    }));

    useEffect(() => {
        const getExpenseDetails = async () => {
            setLoading(true)
            const expenseIdJson = {
                id: expenseId
            }
            const response_exp = await getExpDetailsService(expenseIdJson, setAlert, setAlertMessage)
            setExpenseDetails(response_exp?.data?.expense)
            setLoading(false)
        }

        getExpenseDetails()
    }, [])

    return (
        <>
            {loading ? <Loading /> :

                <Box sx={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    ...(mdUp && { width: 700 })
                }}
                >
                    <AlertBanner severity='error' alertMessage={alertMessage} showAlert={alert} />
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        View Expense
                    </Typography>

                    <Grid container spacing={3} >
                        <Grid item xs={12} >
                            <Typography>
                                Name :
                                <TextStyle>
                                    {expenseDetails?.expenseName}</TextStyle>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            Description :
                            <TextStyle>
                                {expenseDetails?.expenseDescription}
                            </TextStyle>
                        </Grid>

                        <Grid item xs={12} >

                            Owner :
                            <TextStyle>
                                {expenseDetails?.expenseOwner}
                            </TextStyle>
                        </Grid>

                        <Grid item xs={12}>
                            Members :

                            {expenseDetails?.expenseMembers.map((member) => (
                                <TextStyle>
                                    {member}
                                    &nbsp;
                                </TextStyle>
                            ))}


                        </Grid>

                        <Grid item xs={6} >

                            Amount :
                            <TextStyle>
                                {currencyFind(expenseDetails?.expenseCurrency) + " " + convertToCurrency(expenseDetails?.expenseAmount)}
                            </TextStyle>
                        </Grid>
                        <Grid item xs={6} >

                            Category :
                            <TextStyle>
                                {expenseDetails?.expenseCategory}
                            </TextStyle>
                        </Grid>
                        <Grid item xs={12}>

                            Date :
                            <TextStyle>
                                {expenseDetails?.expenseDate}
                            </TextStyle>
                        </Grid>

                        {mdUp && <Grid item xs={0} md={6} />}
                        <Grid item xs={6} md={3}>
                            <Button fullWidth size="large" variant="outlined" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Button fullWidth size="large" variant="contained">
                                Edit Expense
                            </Button>
                        </Grid>

                    </Grid>
                </Box>}
        </>
    )
}
