import { Box, Grid, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { convertToCurrency } from '../../utils/helper'
import Iconify from '../Iconify'

export const SummaryCards = ({ userTotalExp }) => {
    const LabelIconStyle = styled('div')(({ theme }) => ({
        borderRadius: 60,
        width: 60,
        height: 60,
    }))
    return (
        <Grid container spacing={2}
            justifyContent={'center'}
            alignItems={'center'}>
             <Grid item xs={12} md={12}> {/*Change md to 4  */}
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
                        <Typography variant="caption2"
                            sx={{ color: (theme) => theme.palette['primary'].dark }}>
                            Total
                        </Typography>
                        <Typography variant="h5"
                            sx={{ color: (theme) => theme.palette['primary'].darker }}>
                            ₹ {userTotalExp ? convertToCurrency(userTotalExp) : 0}
                        </Typography>
                    </Box>
                </Stack>
            </Grid>

            {/* <Grid item xs={12} md={4}

            >
                <Stack spacing={2} direction='row' sx={{
                    bgcolor: (theme) => theme.palette['success'].light,
                    borderRadius: 2,
                    p: 3
                }} >
                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['success'].dark, py: '18px' }}>
                        <Iconify icon="mdi:cash-plus" sx={{ width: '100%', height: '100%', color: 'white' }} />
                    </LabelIconStyle>
                    <Box>
                        <Typography variant="caption2"
                            sx={{ color: (theme) => theme.palette['success'].darker }}
                        >
                            You are owed <br />
                        </Typography>
                        <Typography variant="h5"
                            sx={{ color: (theme) => theme.palette['success'].darker }}>
                            ₹ 5,000
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
                        <Typography variant="caption2"
                            sx={{ color: (theme) => theme.palette['error'].dark }}
                        >
                            You owe <br />
                        </Typography>
                        <Typography variant="h5"
                            sx={{ color: (theme) => theme.palette['error'].darker }}>
                                ₹ 350
                        </Typography>
                    </Box>
                </Stack>
            </Grid> */}
        </Grid>

    )
}
