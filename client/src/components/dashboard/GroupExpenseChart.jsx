import { Box, Grid } from "@mui/material"

export const GroupExpenseChart = () => {
    return (
        <Grid container spacing={2} justifyContent={'center'}
            alignItems={'center'}
        >
            <Grid xs={12}>
                <Box sx={{
                    p: 5,
                    bgcolor: (theme) => theme.palette['info'].lighter ,
                    borderRadius: 2
                }}>
                    <Grid container>
                        Group Expense Graph
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}
