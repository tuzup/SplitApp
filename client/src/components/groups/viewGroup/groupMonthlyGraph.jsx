import { Box, Container, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupDailyExpService, getGroupMonthlyExpService } from '../../../services/expenseServices';
import AlertBanner from '../../AlertBanner';
import Loading from '../../loading';
import { Line } from "react-chartjs-2";
import 'chart.js/auto'
import { monthNamesMMM } from '../../../utils/helper';

const GroupMonthlyGraph = () => {
    const params = useParams();
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [loading, setLoading] = useState(true)
    const [monthlyExp, setMonthlyExp] = useState()
    const [dailyExp, setDailyExp] = useState()
    const [montlyView, setMonthlyView] = useState(false)

    const toggleMonthlyView = () => {
        setMonthlyView(!montlyView)
    } 

    const data = {
        labels: montlyView ?
            monthlyExp?.map(monthly => (monthNamesMMM[monthly._id.month-1])) :
            dailyExp?.map(daily => (monthNamesMMM[daily._id.month-1] + "-"  + daily._id.date)),
        datasets: [
            {
                label: 'Monthly Expenses',
                data: montlyView ? monthlyExp?.map(monthly => (monthly.amount)) :
                    dailyExp?.map(daily => (daily.amount)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true
            }
        ]
    }

    const options = {
        tension: 0.2,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: "Monthly expense graph",
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
        const getGroupMonthlyExpense = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.groupId
            }
            const monthly_exp =
                await getGroupMonthlyExpService(groupIdJson, setAlert, setAlertMessage)
            const daily_exp = await getGroupDailyExpService(groupIdJson, setAlert, setAlertMessage)
            setMonthlyExp(monthly_exp.data.data)
            setDailyExp(daily_exp.data.data)
            setLoading(false)
        }
        getGroupMonthlyExpense()

    }, [])
    return (
        <>
            {loading ? <Loading /> :
                <>
                    <Box height={350} mb={5}>
                        <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                        
                        <Line data={data} options={options} />
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked onClick={toggleMonthlyView} />} label="Daily view" />
                        </FormGroup>
                    </Box>
                    <Typography variant='subtitle'>
                        <center>{montlyView ? <>Monthly expense graph</> : <>Daily expense graph</>} </center>
                    </Typography>
                </>
            }
        </>

    )
}

export default GroupMonthlyGraph