import { Box, Grid } from "@mui/material"

export const CategoryExpenseChart = () => {
    return (
                <Box sx={{
                    p: 5,
                    bgcolor: (theme) => theme.palette['warning'].lighter ,
                    borderRadius: 2
                }}>
                    <Grid container>
                        Category Expense Graph
                    </Grid>
                </Box>
    )
}
