import { Box, Grid } from "@mui/material"
import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupCategoryExpService, getUserCategoryExpService } from '../../services/expenseServices';
import AlertBanner from '../AlertBanner';
import Loading from '../loading';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'
import { convertToCurrency, currencyFind } from '../../utils/helper';
import useResponsive from "../../theme/hooks/useResponsive";
export const CategoryExpenseChart = () => {
    
    const mdUp = useResponsive('up', 'md');
    const params = useParams();
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [loading, setLoading] = useState(true)
    const [categoryExp, setCategoryExp] = useState()
    const profile = JSON.parse(localStorage.getItem("profile"))

    const data = {
        labels: categoryExp?.map(category => (category._id)),
        datasets: [
            {
                label: 'Category Expenses',
                data: categoryExp?.map(category => (category.amount)),
                fill: true,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderWidth: 1,
                //borderColor: ["red", "green", "Blue", "Yellow", "Orange", "Violet"]
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {   
            datalabels: {
                display:false,
                formatter: (value) => {
                  return convertToCurrency(value) ;
                }
              },
            legend: {
                display: true,
                position: mdUp? 'right' : 'bottom',
                labels: {
                    padding: 10
                },
            },
        }
    };


    useEffect(() => {
        const getGroupCategoryExpense = async () => {
            setLoading(true)
            const userIdJson = {
                user: profile.emailId
            }
            const category_exp =
                await getUserCategoryExpService(userIdJson, setAlert, setAlertMessage)
            setCategoryExp(category_exp.data.data)
            setLoading(false)
        }
        getGroupCategoryExpense()

    }, [])

    return (
        <>
        {loading ? <Loading /> :
        <Box sx={{
            p: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 5
        }}>
              <Typography variant="h6" mb={2}>
                Category Expense Chart
            </Typography>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Box height={500}>
                    <Doughnut data={data} options={options} plugins={[ChartDataLabels]}/>
                    </Box>                   
        </Box>}
        </>
    )
}
