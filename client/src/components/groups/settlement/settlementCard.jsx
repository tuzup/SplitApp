import { Avatar, Button, Grid, Modal, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Iconify from "../../Iconify"
import useResponsive from '../../../theme/hooks/useResponsive';
import { convertToCurrency, currencyFind } from '../../../utils/helper';
import BalanceSettlement from "./balanceSettlement";
import React from 'react'
import { useState } from "react";
import configData from '../../../config.json'
import gravatarUrl from 'gravatar-url';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 2,
    p: 4,
    borderRadius: 1
};

const SettlementCard = ({ mySettle, currencyType }) => {
    const xsUp = useResponsive('up', 'sm');
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if (reload)
            window.location.reload()
        else {
            setOpen(false)
        }

    };

    return (
        <Stack direction="row" spacing={1} justifyContent="space-evenly"
            alignItems="center"
            sx={{
                bgcolor: (theme) => theme.palette['warning'].lighter,
                p: 3,
                borderRadius: 2,
                boxShadow: 4,
            }}
        >
            <Avatar src={gravatarUrl(mySettle[0], { size: 200, default: configData.USER_DEFAULT_LOGO_URL })} alt="photoURL" sx={{ width: 56, height: 56 }}/>
            <Stack spacing={0}>
                <Typography variant='body' noWrap sx={{fontWeight: 600, ...(!xsUp && {fontSize: 12})}}>
                    {mySettle[0].split('@')[0]}
                </Typography>
                    
                <Typography variant='body' noWrap sx={{...(!xsUp && {fontSize: 12})}}>
                   to <Typography variant='subtitle' sx={{fontWeight: 600}}>{mySettle[1].split('@')[0]}</Typography>
                </Typography>

                {!xsUp && 
                <>
                <Typography variant='body2' sx={{fontSize: 10, mt: '3px', color: (theme) => theme.palette['error'].dark}}>
                Settlement Amount
            </Typography>
            <Typography variant='body2' noWrap
                sx={{
                    fontWeight: 900,
                    color: (theme) => theme.palette['error'].dark,
                }}
            >
                {currencyFind(currencyType)} {convertToCurrency(mySettle[2])}
            </Typography>
            </>
                }
            </Stack>
            {xsUp && 
            <Stack spacing={0} alignItems="center">
            <Typography variant='body2' sx={{fontSize: 10  ,color: (theme) => theme.palette['error'].dark}}>
                Settlement Amount
            </Typography>
            <Typography variant='body2' noWrap
                sx={{
                    fontWeight: 900,
                    color: (theme) => theme.palette['error'].dark,
                }}
            >
                {currencyFind(currencyType)} {convertToCurrency(mySettle[2])}
            </Typography>
            </Stack>}

            <Button onClick={handleOpen}>Settle</Button>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} width={xsUp ? '50%' : '90%'}>
                    <BalanceSettlement currencyType={currencyType} settleTo={mySettle[1]} settleFrom={mySettle[0]} amount={mySettle[2]} handleClose={handleClose} setReload={setReload} />
                </Box>
            </Modal>
        </Stack>
    )
}

export default SettlementCard