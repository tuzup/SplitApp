import { Box, Button, Container, Divider, Fab, Grid, Link, Stack, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupDetailsService, getGroupExpenseService } from '../../../services/groupServices';
import AlertBanner from '../../AlertBanner';
import Iconify from '../../Iconify';
import Loading from '../../loading';
import useResponsive from '../../../theme/hooks/useResponsive';
import { convertToCurrency, currencyFind, categoryIcon } from '../../../utils/helper';
import ExpenseCard from '../../expense/expenseCard';
import GroupCategoryGraph from './groupCategoryGraph';
import GroupMonthlyGraph from './groupMonthlyGraph';
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../../config.json';
import { GroupSettlements } from '../settlement';

const profile = JSON.parse(localStorage.getItem('profile'))
const emailId = profile?.emailId
var showCount = 10
export default function ViewGroup() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState({});
    const [groupExpense, setGroupExpense] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertExpense, setAlertExpense] = useState(false);
    const [alertExpenseMessage, setAlertExpenseMessage] = useState('');
    const [showAllExp, setShowAllExp] = useState(false);
    const [expFocus, setExpFocus] = useState(false);
    const [expenses, setExpenses] = useState()
    const [viewSettlement, setViewSettlement] = useState(0)


    const toggleAllExp = () => {
        setExpenses(groupExpense?.expense?.slice(0, showCount))
        if (showCount >= groupExpense?.expense?.length)
            setShowAllExp(true)
        setExpFocus(true)
        showCount += 5
    }


    const toggleExpView = () => {
        setViewSettlement(0)
    }

    const toggleSettleView = () => {
        setViewSettlement(1)
    }

    const toggleMySettleView = () => {
        setViewSettlement(2)
    }

    const mdUp = useResponsive('up', 'md');

    const findUserSplit = (split) => {
        if (split) {
            split = split[0]
            return split[emailId]
        }
        return 0
    }

    useEffect(() => {
        const getGroupDetails = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.groupId
            }
            const response_group = await getGroupDetailsService(groupIdJson, setAlert, setAlertMessage)
            const response_expense = await getGroupExpenseService(groupIdJson, setAlertExpense, setAlertExpenseMessage)

            response_group && setGroup(response_group?.data?.group)
            response_expense && setGroupExpense(response_expense?.data)
            response_expense?.data?.expense && setExpenses(response_expense?.data?.expense?.slice(0, 5))
            if (response_expense?.data?.expense?.length <= 5 || !response_expense)
                setShowAllExp(true)
            setLoading(false)
        }
        getGroupDetails()
    }, []);

    const CategoryStyle = styled('span')(({ theme }) => ({
        top: 22,
        left: -57,
        zIndex: 10,
        width: 35,
        height: 32,
        borderRadius: 50,
        position: 'relative'
    }));

    const LabelIconStyle = styled('div')(({ theme }) => ({
        borderRadius: 60,
        width: 60,
        height: 60,


    }))
    return (

        <Container>
            {loading ? <Loading /> :
                <>
                    <Box sx={{
                        bgcolor: (theme) => theme.palette['primary'].lighter,
                        borderRadius: 2,
                        p: 2,
                        color: (theme) => theme.palette['primary'].darker,
                        pb: 3
                    }}>

                        <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />

                        <Link component={RouterLink}
                            to={dataConfig.EDIT_GROUP_URL + group?._id}>
                            <Iconify icon="akar-icons:edit" sx={{ float: 'right', fontSize: 18 }} />
                        </Link>
                        <Typography variant="h4" pb={1}>
                            {group?.groupName}
                        </Typography>
                        <Typography variant="subtitle2">
                            {group?.groupDescription}
                        </Typography>

                        <Typography mt={1} variant="body2" sx={{ color: 'text.secondary' }}>
                            Created by &nbsp;
                            <Box component={'span'} sx={{ color: (theme) => theme.palette['primary'].darker }}>
                                {group?.groupOwner}
                            </Box>
                        </Typography>
                        {/* <Button sx={{mt: 2}} variant="outlined" color='warning'>
                        <Iconify icon='akar-icons:star' color={(theme) => theme.palette['warning'].main} fontSize={22} />
                        &nbsp; Add to Favourites
                        </Button> */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    bgcolor: (theme) => theme.palette['warning'].lighter,
                                    p: 1,
                                    borderRadius: 1,
                                    color: (theme) => theme.palette['warning'].darker
                                }}>
                                Category : &nbsp;
                                {group?.groupCategory}
                            </Typography>
                            <Fab component={RouterLink}
                                to={dataConfig.ADD_EXPENSE_URL + group?._id}
                                color="primary" aria-label="add"
                                variant="extended"
                                sx={{
                                    textDecoration: 'none',
                                    ...(!mdUp && {
                                        margin: 0,
                                        top: 'auto',
                                        right: 20,
                                        bottom: 20,
                                        left: 'auto',
                                        position: 'fixed'
                                    }),
                                }}>
                                <Iconify icon='eva:file-add-fill' sx={{
                                    height: 22,
                                    ...(mdUp && {
                                        mr: 1,
                                        width: 22
                                    }),
                                    ...(!mdUp && {
                                        width: '100%'
                                    })
                                }} />
                                {mdUp &&
                                    <>Add Expense</>}
                            </Fab>
                        </Stack>
                        <Box
                            sx={{
                                mb: -4,
                                ml: -2,
                                width: 80,
                                height: 36,
                                display: 'inline-block',
                                bgcolor: 'currentColor',
                                mask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
                                WebkitMask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
                                zIndex: 9,
                                color: 'background.paper'
                            }}
                        />
                        <CategoryStyle
                            sx={{
                                bgcolor: (theme) => theme.palette['primary'].lighter,
                                py: '6px',
                                px: '9px'
                            }}
                        >
                            <Iconify icon={categoryIcon(group?.groupCategory)} color={(theme) => theme.palette['primary'].darker}
                            />
                        </CategoryStyle>
                    </Box>

                    <Box sx={{
                        mt: -2, p: 2,
                        bgcolor: 'white',
                        minHeight: 50,
                        width: '100%'

                    }}>
                        <Grid container spacing={3} mt={'1px'}
                            sx={{
                                ...(mdUp && { px: 6 })
                            }}
                        >

                            <Grid item xs={12} md={4}>
                                <Stack spacing={2} direction='row'
                                    sx={{
                                        bgcolor: (theme) => theme.palette['primary'].lighter,
                                        borderRadius: 2,
                                        p: 3
                                    }}>
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['primary'].dark, py: '18px' }}>
                                        <Iconify icon=":nimbus:invoice" sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="h6"
                                            sx={{ color: (theme) => theme.palette['primary'].dark }}>
                                            Total expense
                                        </Typography>
                                        <Typography variant="h5"
                                            sx={{ color: (theme) => theme.palette['primary'].darker }}>
                                            {currencyFind(group?.groupCurrency)} {groupExpense.total ? convertToCurrency(groupExpense.total) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}

                            >
                                <Stack spacing={2} direction='row' sx={{
                                    bgcolor: (theme) => theme.palette['success'].lighter,
                                    borderRadius: 2,
                                    p: 3
                                }} >
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['success'].dark, py: '18px' }}>
                                        <Iconify icon="mdi:cash-plus" sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="h6"
                                            sx={{ color: (theme) => theme.palette['success'].dark }}
                                        >
                                            You are owed <br />
                                        </Typography>
                                        <Typography variant="h5"
                                            sx={{ color: (theme) => theme.palette['success'].darker }}>
                                            {currencyFind(group?.groupCurrency)} {findUserSplit(group?.split) > 0 ? convertToCurrency(findUserSplit(group?.split)) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Stack spacing={2} direction='row' sx={{
                                    bgcolor: (theme) => theme.palette['error'].lighter,
                                    borderRadius: 2,
                                    p: 3
                                }} >
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['error'].dark, py: '18px' }}>
                                        <Iconify icon="mdi:cash-minus" sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="h6"
                                            sx={{ color: (theme) => theme.palette['error'].dark }}
                                        >
                                            You owe <br />
                                        </Typography>
                                        <Typography variant="h5"
                                            sx={{ color: (theme) => theme.palette['error'].darker }}>
                                            {currencyFind(group?.groupCurrency)} {findUserSplit(group?.split) < 0 ? convertToCurrency(Math.abs(findUserSplit(group?.split))) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>

                        </Grid>
                        <Stack
                            pt={4}
                            px={{ xs: 0, md: 6 }}
                            divider={<Divider orientation="vertical" flexItem />}
                            direction="row"
                            justifyContent='space-evenly'
                            alignItems="center"
                            spacing={1}
                        >
                            <Typography variant="subtitle" onClick={toggleExpView} noWrap sx={{
                                cursor: 'pointer', fontSize: 18,
                                width: '100%',
                                textAlign: 'center',
                                ...(viewSettlement === 0 && {
                                    fontWeight: 800,
                                    borderRadius: 1,
                                    px: 1,
                                    color: (theme) => theme.palette['info'].dark,
                                    bgcolor: (theme) => theme.palette['primary'].lighter,
                                    py: '5px',
                                }),
                                ...(!mdUp && {
                                    fontSize: 11
                                })
                            }}>
                                Group Expenses
                            </Typography>

                            <Typography variant="subtitle" onClick={toggleSettleView} noWrap sx={{
                                cursor: 'pointer', fontSize: 18,
                                width: '100%',
                                textAlign: 'center',
                                ...(viewSettlement === 1 && {
                                    fontWeight: 800,
                                    borderRadius: 1,
                                    px: 1,
                                    color: (theme) => theme.palette['info'].dark,
                                    bgcolor: (theme) => theme.palette['primary'].lighter,
                                    py: '5px',
                                }),
                                ...(!mdUp && {
                                    fontSize: 11
                                })
                            }}>
                                Group Balance
                            </Typography>

                            <Typography variant="subtitle" onClick={toggleMySettleView} noWrap sx={{
                                cursor: 'pointer', fontSize: 18,
                                width: '100%',
                                textAlign: 'center',
                                ...(viewSettlement === 2 && {
                                    fontWeight: 800,
                                    borderRadius: 1,
                                    px: 1,
                                    color: (theme) => theme.palette['info'].dark,
                                    bgcolor: (theme) => theme.palette['primary'].lighter,
                                    py: '5px',
                                }),
                                ...(!mdUp && {
                                    fontSize: 11
                                })
                            }}>
                                My Balance
                            </Typography>
                        </Stack>
                        <Grid container mt={2} rowSpacing={2} columnSpacing={{ xs: 1, md: 2 }}
                            justifyContent={'center'}
                            alignItems={'center'}
                            sx={{
                                ...(mdUp && { px: 6 })
                            }}
                        >
                            {viewSettlement == 2 && 
                            <Typography>
                                My Balance - Under development 
                            </Typography>
                            }
                            {viewSettlement === 1 &&
                                <Grid item md={12} xs={12}>
                                    <GroupSettlements currencyType={group?.groupCurrency} />
                                </Grid>
                            }
                            {viewSettlement === 0 &&
                                <>
                                    {alertExpense ?
                                        <Grid container
                                            direction="column"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                minHeight: '200px'
                                            }}
                                        >
                                            <Typography variant="body2" fontSize={18} textAlign={'center'}>
                                                No expense present for this group! Record your first group expense now <br />
                                                <Link component={RouterLink}
                                                    to={dataConfig.ADD_EXPENSE_URL + group?._id}>
                                                    Add Expense
                                                </Link>
                                            </Typography>
                                        </Grid>
                                        : <>
                                            <Grid item xs={12} md={expFocus ? 12 : 6}>
                                                <Grid container spacing={2}>

                                                    {expenses?.map(myExpense => (
                                                        <Grid item xs={12} md={expFocus ? 6 : 12} key={myExpense?._id}>
                                                            <ExpenseCard
                                                                expenseId={myExpense?._id}
                                                                expenseName={myExpense?.expenseName}
                                                                expenseAmount={myExpense?.expenseAmount}
                                                                expensePerMember={myExpense?.expensePerMember}
                                                                expenseOwner={myExpense?.expenseOwner}
                                                                expenseDate={myExpense?.expenseDate}
                                                                currencyType={group?.groupCurrency}
                                                            />
                                                        </Grid>))}

                                                    {!showAllExp && <Grid item xs={12}>
                                                        <Button onClick={toggleAllExp}>View More</Button>
                                                    </Grid>}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={6} >
                                                <GroupCategoryGraph currencyType={group?.groupCurrency} />
                                            </Grid>
                                            <Grid item xs={12} md={expFocus || viewSettlement ? 6 : 12}>
                                                <GroupMonthlyGraph />
                                            </Grid>
                                        </>
                                    }
                                </>
                            }

                        </Grid>
                    </Box>

                </>}
        </Container>
    )
}
