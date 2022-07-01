import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useState } from "react"
import Loading from "../loading"
import { CalenderExpense, CalenderExpenseGraph } from "./CalenderExpenseGraph"
import { CategoryExpenseChart } from "./CategoryExpenseGraph"
import { GroupExpenseChart } from "./GroupExpenseChart"
import { SummaryCards } from "./summaryCards"
import { WelcomeMessage } from "./welcomeMessage"


export default function Dashboard() {
    const [loading, setLoading] = useState(false)
    return (
        <Container maxWidth={'xl'}>
            {loading ? <Loading /> :
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} mt={2}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <WelcomeMessage/>
                            </Grid>
                            <Grid item xs={12}>
                                <SummaryCards/>
                            </Grid>
                            <Grid item xs={12}>
                                <CalenderExpenseGraph/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <GroupExpenseChart/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CategoryExpenseChart/>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            boxShadow: 5,
                            borderRadius: 2,
                            p: 5,
                            minHeight: 850
                        }}>
                            <Typography variant="subtitle2" pb={2} >
                                Your Recent transactions,
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

            }</Container>

    )
}
