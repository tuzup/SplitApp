import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getGroupSettleService } from '../../../services/groupServices';
import { currencyFind } from '../../../utils/helper';
import AlertBanner from '../../AlertBanner';
import Iconify from '../../Iconify';
import Loading from '../../loading'

export const GroupSettlements = ({currencyType}) => {
    const params = useParams();
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [loading, setLoading] = useState(true)
    const [groupSettlement, setGroupSettlemet] = useState()
    useEffect(() => {
        const getGroupSettlement = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.groupId
            }
            const group_settle = await getGroupSettleService(groupIdJson, setAlert, setAlertMessage)
            setGroupSettlemet(group_settle?.data?.data)
            setLoading(false)
        }
        getGroupSettlement()
    }, [])

    return (
        <>
            {loading ? <Loading /> :
                <Box sx={{ p: 3 }}>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Grid container spacing={2}>
                        {groupSettlement?.map(mySettle => (
                            <>
                            {mySettle[2] > 0 && 
                            <>
                                <Grid item xs={3}>
                                    <Typography variant='body2'>
                                        {mySettle[0]}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Iconify icon="akar-icons:arrow-right" />
                                </Grid>
                                <Grid item xs={3}>
                                    {mySettle[1]} 
                                </Grid>
                                <Grid item xs={3}>
                                :  &nbsp; {currencyFind(currencyType)} {mySettle[2]}
                                </Grid>
                                </>
                                } 
                            </>
                        ))}
                    </Grid>
                </Box>
            }
        </>

    )
}
