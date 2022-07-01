import { Box, Grid } from "@mui/material"

export const CategoryExpenseChart = () => {
    return (
        <Grid container spacing={2} justifyContent={'center'}
            alignItems={'center'}
        >
            <Grid xs={12}>
                <Box sx={{
                    p: 5,
                    bgcolor: (theme) => theme.palette['warning'].lighter ,
                    borderRadius: 2
                }}>
                    <Grid container>
                        Category Expense Graph
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}
