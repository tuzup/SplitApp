import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getGroupSettleService } from '../../../services/groupServices';
import useResponsive from '../../../theme/hooks/useResponsive';

import AlertBanner from '../../AlertBanner';
import Loading from '../../loading'
import SettlementCard from './settlementCard';


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

                    {groupSettlement?.map((mySettle, index) => (
                        <Box key={index}>
                            {mySettle[2] > 0 &&
                                <>
                                    {noSettle && setNoSettle(false)}
                                    <SettlementCard  mySettle={mySettle} currencyType={currencyType} />
                                </>
                            }
                        </Box>
                    ))}

                    {noSettle &&
                        <Typography fontSize={18} textAlign={'center'} py={10}>
                            No Settlement requiered !
                        </Typography>}

                </Box>
            }
        </>

    )
}
