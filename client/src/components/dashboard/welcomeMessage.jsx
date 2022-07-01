import { Box, Button, Grid, Typography } from "@mui/material"

export const WelcomeMessage = () => {
    return (
        <Grid container spacing={2} justifyContent={'center'}
            alignItems={'center'}
        >
            <Grid xs={12}>
                <Box sx={{
                    p: 5,
                    bgcolor: (theme) => theme.palette['success'].light ,
                    borderRadius: 2
                }}>
                    <Grid container>
                    <Grid item lg={6} md={6} xs={12}>

                        <Typography variant="h5" pb={2}>
                            Hello there, Welcome back!
                        </Typography>
                        <Typography variant="body2" pb={2} >
                            Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way.
                        </Typography>
                        <Button variant="contained"
                            sx={{
                                bgcolor: (theme) => theme.palette['success'].dark,
                            }}
                        >
                            View Groups
                        </Button>
                    </Grid>
                    <Grid item lg={5} md={6} xs={12}>
                        <img src="/static/illustrations/dashboard-card.png" alt="dashboard" />
                    </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}
