import { Box, FormControlLabel, FormGroup, Grid, Switch, Typography } from "@mui/material"
import { Line } from "react-chartjs-2";
import 'chart.js/auto'
import { useEffect, useState } from "react";
import Loading from "../loading";
import { getUserDailyExpService, getUserMonthlyExpService } from "../../services/expenseServices";

export const CalenderExpenseGraph = () => {

    const [montlyView, setMonthlyView] = useState(false)
    const [loading, setLoading] = useState(true)
    const profile = JSON.parse(localStorage.getItem("profile"))
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [userMonthlyExp, setUserMonthlyExp] = useState()
    const [userDailyExp, setUserDailyExp] = useState()

    const toggleMonthlyView = () => {
        setMonthlyView(!montlyView)
    }

    const data = {
        labels: montlyView? userDailyExp?.map(daily => (daily._id.date + " / " + daily._id.month)):userMonthlyExp?.map(monthly => (monthly._id.month)),
        datasets: [
            {
                label:  montlyView? "Daily expense" : "Monthly expense",
                data: montlyView? userDailyExp?.map(daily => (daily.amount)):userMonthlyExp?.map(monthly => (monthly.amount)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true
            }
        ]
    }

    const options = {
        tension: 0.4,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: montlyView? "Daily expense graph" : "Monthly expense graph",
                font: { size: 18 },
                padding: 19,
                position: 'bottom'
            },
            datalabels: {
                display: 'true',
                formatter: (value) => {
                    return value + '%';
                }
            },
            legend: {
                display: false,
            },
        }
    };

    useEffect(() => {
    const getUserDetails = async() => {
        setLoading(true);
        const userIdJson = {
            user: profile.emailId
        }
        const response_group_monthly = await getUserMonthlyExpService(userIdJson)
        setUserMonthlyExp(response_group_monthly.data.data)
        const response_group_daily = await getUserDailyExpService(userIdJson)
        setUserDailyExp(response_group_daily.data.data)
        setLoading(false)

    }   
    getUserDetails();
        

    }, [])
    return (
        <>{loading? <Loading/> : 
        <Box sx={{
            p: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 5
        }}>
            <Typography variant="h6">
                Calender Expense Graph
            </Typography>
            
            <Box height={350} my={2}>
                <Line data={data} options={options} />
            </Box>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked onClick={toggleMonthlyView} />} label="Daily expense view" />
            </FormGroup>

        </Box>}
        </>
    )
}
