import { Grid,Box, styled, Typography, autocompleteClasses } from '@mui/material'
import React from 'react'
import useResponsive from '../../../theme/hooks/useResponsive';
import PropTypes from 'prop-types';
import { convertToCurrency, currencyFind, getMonthMMM } from '../../../utils/helper';

const DateBoxStyle = styled('div')(({ theme }) => ({
    width:85,
    height:85,
    borderRadius: 50,
    padding:5,
    background: theme.palette['warning'].lighter,
    color: theme.palette['warning'].darker
}));

ExpenseCard.propTypes = {
    expenseName : PropTypes.string,
    expenseAmount: PropTypes.number,
    expenseOwner: PropTypes.string,
    expenseDate: PropTypes.instanceOf(Date),
    currencyType: PropTypes.string
}

export default function ExpenseCard({expenseName, expenseAmount, expenseOwner, expenseDate, currencyType}) {
    const mdUp = useResponsive('up', 'md');
  return (
    <Grid container
    alignItems="center"
    sx={{
        boxShadow: 5,
        borderRadius: 1,
        pl:1,
        py:1
    }}
    >
        <Grid item xs={4} md={2}>
            <DateBoxStyle>
                <Typography variant="body2" sx={{
                    fontSize:28,
                    top:7,
                    left:20,
                    position: 'relative'
                }}>
                    <b>{new Date(expenseDate).getDate().zeroPad()}</b>
                </Typography>
                <Typography variant="body" sx={{
                    fontSize: 18,
                    left:20,
                    bottom: 8,
                    position: 'relative'
                }}>
                    {getMonthMMM(expenseDate)}
                </Typography>
            </DateBoxStyle>
        </Grid>
        <Grid item xs={7}
        sx={{
            ...(mdUp && {marginLeft: 2})
        }}
        
        >
            <Typography variant='h6'
            color={(theme)=>theme.palette['primary'].dark}
            >
                {expenseName}
            </Typography>
            <Typography variant='body2'
            color={(theme)=>theme.palette['error'].dark}
            sx={{
                fontSize:17
            }}
            >
               {currencyFind(currencyType)} {convertToCurrency(expenseAmount)}
            </Typography>
            <Typography variant='body2'
            sx={{
                fontSize:9
            }}
            >
               Paid by, {expenseOwner}
            </Typography>

        </Grid>
    </Grid>
  )
}
