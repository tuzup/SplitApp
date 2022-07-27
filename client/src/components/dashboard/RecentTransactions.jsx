
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { getRecentUserExpService } from '../../services/expenseServices'
import AlertBanner from '../AlertBanner'
import ExpenseCard from '../expense/expenseCard'
import Loading from '../loading'


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
            setLoading(false)

        }
        getRecentExp()


    }, [])

    return (
        <>
        {loading ? <Loading/> : 
        <Box sx={{
            boxShadow: 5,
            bgcolor: 'background.paper',
            borderRadius: 2,
        }}>
            <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
            <Typography variant="h6" p={2} >
                Your Recent transactions,
            </Typography>
            {recentExp?.map(myExpense => (

                <ExpenseCard
                    key={myExpense?._id}
                    expenseId={myExpense?._id}
                    expenseName={myExpense?.expenseName}
                    expenseAmount={myExpense?.expenseAmount}
                    expensePerMember={myExpense?.expensePerMember}
                    expenseOwner={myExpense?.expenseOwner}
                    expenseDate={myExpense?.expenseDate}
                    currencyType={myExpense?.expenseCurrency}
                />
            ))}
        </Box>}
        </>
    )
}
