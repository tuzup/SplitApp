
import { Box, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { getRecentUserExpService } from '../../services/expenseServices'
import ExpenseCard from '../expense/expenseCard'


export const RecentTransactions = () => {
    const [loading, setLoading] = useState(true)
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()
    const [recentExp, setRecentExp] = useState()
    const profile = JSON.parse(localStorage.getItem('profile'))
    useEffect(() => {
        const getRecentExp = async () => {
            setLoading(true)
            const userIdJson = {
                user: profile.emailId
            }
            const recent_exp = await getRecentUserExpService(userIdJson, setAlert, setAlertMessage)
            recent_exp && setRecentExp(recent_exp?.data?.expense)

        }
        getRecentExp()


    }, [])

    return (
        <Box sx={{
            boxShadow: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
        }}>
            <Typography variant="h6" p={2} >
                Your Recent transactions,
            </Typography>
            {recentExp?.map(myExpense => (

                <ExpenseCard
                    expenseId={myExpense?._id}
                    expenseName={myExpense?.expenseName}
                    expenseAmount={myExpense?.expenseAmount}
                    expensePerMember={myExpense?.expensePerMember}
                    expenseOwner={myExpense?.expenseOwner}
                    expenseDate={myExpense?.expenseDate}
                    currencyType={myExpense?.expenseCurrency}
                />
            ))}


        </Box>
    )
}
