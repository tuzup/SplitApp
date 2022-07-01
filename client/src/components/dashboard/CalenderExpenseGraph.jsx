import { Box, Grid} from "@mui/material"

export const CalenderExpenseGraph = () => {
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
                            Calender Expense Graph
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}
