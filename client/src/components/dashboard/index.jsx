import { Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserExpenseService } from "../../services/expenseServices"
import { getUserGroupsService } from "../../services/groupServices"
import Loading from "../loading"
import { CalenderExpenseGraph } from "./CalenderExpenseGraph"
import { CategoryExpenseChart } from "./CategoryExpenseGraph"
import { EndMessage } from "./endMessage"
import { GroupExpenseChart } from "./GroupExpenseChart"
import { RecentTransactions } from "./RecentTransactions"
import { SummaryCards } from "./summaryCards"
import { WelcomeMessage } from "./welcomeMessage"
import { Link as RouterLink } from 'react-router-dom';
import configData from '../../config.json'
import AlertBanner from "../AlertBanner"
import FavouriteGroups from "./FavouriteGroups"


export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    const profile = JSON.parse(localStorage.getItem("profile"))
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userExp, setUserExp] = useState()
    const [newUser, setNewUser] = useState(false)
    

    useEffect(() => {
        const getUserDetails = async () => {
            setLoading(true);
            const userIdJson = {
                user: profile.emailId
            }
            const response_expense = await getUserExpenseService(userIdJson, setAlert, setAlertMessage)
            setUserExp(response_expense.data);
            const response_group = await getUserGroupsService(profile)
            if (response_group.data.groups.length == 0)
                setNewUser(true)
            setLoading(false)

        }
        getUserDetails();


    }, [])

    return (
        <Container maxWidth={'xl'}>
            {loading ? <Loading /> :
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <WelcomeMessage />
                            </Grid>

                            {newUser ?
                                <Grid item xs={12}>
                                    <Grid container
                                        direction="column"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            minHeight: 'calc(50vh - 200px )',
                                        }}

                                    >
                                        <Typography variant="body2" fontSize={18} textAlign={'center'}>
                                            Seems to be new here! Create your first group and add expenses <br />
                                            <Link component={RouterLink}
                                                to={configData.CREATE_GROUP_URL}>
                                                Create Group
                                            </Link>
                                        </Typography>
                                    </Grid>
                                </Grid>

                                :
                                <>
                                    {/* <Grid item xs={12}>
                                        <SummaryCards userTotalExp={userExp?.total} />
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <FavouriteGroups />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CalenderExpenseGraph />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <CategoryExpenseChart />
                                    </Grid>
                                    {/* <Grid item xs={12} md={6}>
                                <CategoryExpenseChart />
                            </Grid> */}
                                </>
                            }
                        </Grid>

                    </Grid>
                    {!newUser &&
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <RecentTransactions />
                                </Grid>
                                <Grid item xs={12}>
                                    <GroupExpenseChart />
                                </Grid>
                                <Grid item md={12} xs={0}>
                                    <EndMessage />
                                </Grid>
                            </Grid>
                        </Grid>
                    }

                </Grid>

            }</Container>

    )
}
