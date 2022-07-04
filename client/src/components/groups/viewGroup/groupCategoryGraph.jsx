import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupCategoryExpService } from '../../../services/expenseServices';
import AlertBanner from '../../AlertBanner';
import Loading from '../../loading';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'
import { convertToCurrency, currencyFind } from '../../../utils/helper';

const GroupCategoryGraph = (currencyType) => {
    const params = useParams();
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [loading, setLoading] = useState(true)
    const [categoryExp, setCategoryExp] = useState()

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
        
        plugins: {   
            datalabels: {
                color:'error',
                formatter: (value) => {
                  return currencyFind(currencyType) + ' ' + convertToCurrency(value) ;
                }
              },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 18
                },
            },
        }
    };


    useEffect(() => {
        const getGroupCategoryExpense = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.groupId
            }
            const category_exp =
                await getGroupCategoryExpService(groupIdJson, setAlert, setAlertMessage)
            setCategoryExp(category_exp.data.data)
            setLoading(false)
        }
        getGroupCategoryExpense()

    }, [])
    return (
        <>
            {loading ? <Loading /> :
                <>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <Doughnut data={data} options={options} plugins={[ChartDataLabels]}/>
                    {/* <Doughnut data={data} options={options} plugins={[ChartDataLabels]}/> */}
                    <Typography variant='subtitle' p={3}>
                        <center>Category Expense chart</center>
                    </Typography>
                </>}
        </>

    )
}

export default GroupCategoryGraph