import { Button, Modal, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import Iconify from "../../Iconify"
import useResponsive from '../../../theme/hooks/useResponsive';
import { currencyFind } from '../../../utils/helper';
import BalanceSettlement from "./balanceSettlement";
import React from 'react'
import { useState } from "react";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 2,
    p: 4,
    borderRadius : 1
  };
  
const SettlementCard = ({mySettle, currencyType}) => {
    const mdUp = useResponsive('up', 'md');
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if(reload)
        window.location.reload()
        else{
        setOpen(false)
        }
    
    };

  return (
    <Box>
    <Stack
        pt={2}
        px={{ xs: 0, md: 6 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
    >

        <Typography variant='body2' noWrap sx={{
            width: '100%',
            fontSize: 17,
            ...(!mdUp && {
                fontSize: 10
            })
        }}>
            {mySettle[0].split('@')[0]}
        </Typography>

        <Iconify icon="akar-icons:arrow-right" sx={{ width: '100%', ...(!mdUp && { fontSize: 10 }) }} />


        <Typography variant='body2' noWrap
            sx={{
                width: '100%',
                fontSize: 17,
                ...(!mdUp && {
                    fontSize: 10
                })
            }}
        >
            {mySettle[1].split('@')[0]}
        </Typography>
        <Typography variant='body2' noWrap
            sx={{
                width: '120%',
                fontWeight: 800,
                color: (theme) => theme.palette['error'].dark,
                ...(!mdUp && {
                    fontSize: 10
                })
            }}
        >
            :  &nbsp; {currencyFind(currencyType)} {mySettle[2]}
        </Typography>

        <Button onClick={handleOpen}>Settle</Button>
        <Modal
            open={open}
            onClose={handleClose}  
        >
            <Box sx={style} width={mdUp ? '50%' : '90%'}>
               <BalanceSettlement currencyType={currencyType} settleTo={mySettle[1]} settleFrom={mySettle[0]} amount={mySettle[2]} handleClose={handleClose} setReload={setReload}/>
            </Box>
        </Modal>

    </Stack>
</Box>
  )
}

export default SettlementCard