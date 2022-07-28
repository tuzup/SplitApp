import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getGroupSettleService } from '../../../services/groupServices';
import useResponsive from '../../../theme/hooks/useResponsive';

import AlertBanner from '../../AlertBanner';
import Iconify from '../../Iconify';
import Loading from '../../loading'
import SettlementCard from './settlementCard';
import UserBalanceChart from './userBalanceChart';


export const GroupSettlements = ({ currencyType }) => {
    const params = useParams();
    const [noSettle, setNoSettle] = useState(true)
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [loading, setLoading] = useState(true)
    const [groupSettlement, setGroupSettlemet] = useState()

    const mdUp = useResponsive('up', 'md');
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
                <Box sx={{ pb: 3 }}>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Grid container spacing={2}>
                    {groupSettlement?.map((mySettle, index) => (
                        <>
                            {mySettle[2] > 0 &&
                                <Grid item xs={12} md={6} key={index}>
                                    {noSettle && setNoSettle(false)}
                                    <SettlementCard  mySettle={mySettle} currencyType={currencyType} /> 
                                </Grid>
                            }
                            </>
                        
                    ))}
                    </Grid>

                    {noSettle ?
                        <Grid container
                        direction="column"
                        style={{ 
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          minHeight: '200px' }}
                      >
                        <Iconify icon="icon-park-twotone:doc-success"  sx={{color: (theme) => theme.palette['success'].dark, fontSize: 100}} />
                        <Typography fontSize={18} textAlign={'center'} my={1}>
                        No Settlement requiered !
                        </Typography>
                        </Grid>
                         : <UserBalanceChart/>}


                        

                </Box>
            }
        </>

    )
}
