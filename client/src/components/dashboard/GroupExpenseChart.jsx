import { Box, Grid } from "@mui/material"

export const GroupExpenseChart = () => {
    return (
                <Box sx={{
                    p: 5,
                    bgcolor: (theme) => theme.palette['info'].lighter ,
                    borderRadius: 2
                }}>
                    <Grid container>
                        Group Expense Graph
                    </Grid>
                </Box>
    )
}
