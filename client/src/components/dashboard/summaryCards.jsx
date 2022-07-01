import { Box, Grid } from '@mui/material'
import React from 'react'

export const SummaryCards = () => {
    return (
        <Grid container spacing={2}
            justifyContent={'center'}
            alignItems={'center'}>
            <Grid xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box sx={{
                                p: 5,
                                bgcolor: (theme) => theme.palette['info'].lighter,
                                borderRadius: 1
                            }}>
                                Total Expense
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box sx={{
                                p: 5,
                                bgcolor: (theme) => theme.palette['success'].light,
                                borderRadius: 1
                            }}>
                                You are oewed
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Box sx={{
                                p: 5,
                                bgcolor: (theme) => theme.palette['error'].lighter,
                                borderRadius: 1
                            }}>
                                You owe
                            </Box>
                        </Grid>
                    </Grid>
            </Grid>


        </Grid>

    )
}
