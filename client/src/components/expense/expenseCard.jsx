import { Grid, Box, styled, Typography, autocompleteClasses, Popover, MenuList, MenuItem, ListItemIcon, ListItemText, Modal, Stack, Button } from '@mui/material'
import React, { useState } from 'react'
import useResponsive from '../../theme/hooks/useResponsive';
import PropTypes from 'prop-types';
import { convertToCurrency, currencyFind, getMonthMMM } from '../../utils/helper';
import Iconify from '../Iconify';
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../config.json';
import { deleteExpenseService } from '../../services/expenseServices';


const DateBoxStyle = styled('div')(({ theme }) => ({
    width: 85,
    height: 85,
    borderRadius: 50,
    padding: 5,
    background: theme.palette['warning'].lighter,
    color: theme.palette['warning'].darker
}));

ExpenseCard.propTypes = {
    expenseName: PropTypes.string,
    expenseAmount: PropTypes.number,
    expensePerMember: PropTypes.number,
    expenseOwner: PropTypes.string,
    currencyType: PropTypes.string
}

const modelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1
};


export default function ExpenseCard({ expenseId, expenseName, expenseAmount, expensePerMember, expenseOwner, expenseDate, currencyType }) {
    const mdUp = useResponsive('up', 'md');
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteConfirmOpen = () =>{
        setDeleteConfirm(true)
      }
      const deleteConfirmClose = () =>{
        setDeleteConfirm(false)
      }

      const apiDeleteCall = async() => {
        await deleteExpenseService({id: expenseId})
        window.location.reload()
        deleteConfirmClose()
      }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Grid container
            alignItems="center"
            justifyContent="space-between"
            sx={{
                boxShadow: 5,
                borderRadius: 1,
                pl: 1,
                py: 1
            }}
        >
            <Grid item xs={2}>
                <DateBoxStyle>
                    <Typography variant="body2" sx={{

                        fontSize: 28,
                        top: 7,
                        left: 20,
                        position: 'relative'
                    }}>
                        <b>{new Date(expenseDate).getDate().zeroPad()}</b>
                    </Typography>
                    <Typography variant="body" sx={{
                        fontSize: 18,
                        left: 20,
                        bottom: 8,
                        position: 'relative'
                    }}>
                        {getMonthMMM(expenseDate)}
                    </Typography>
                </DateBoxStyle>
            </Grid>
            <Grid item xs={5} ml={1}>
                <Typography noWrap variant='h6'
                    color={(theme) => theme.palette['primary'].dark}
                >
                    {expenseName}
                </Typography>
                <Typography variant='body2'
                    color={(theme) => theme.palette['primary'].dark}
                    sx={{
                        fontSize: 12
                    }}
                >
                    Total : {currencyFind(currencyType)} {convertToCurrency(expenseAmount)}
                </Typography>
                <Typography noWrap variant='body2'
                    sx={{
                        fontSize: 9
                    }}
                >
                    Paid by, <br />{expenseOwner}
                </Typography>

            </Grid>
            <Grid item xs={3}>
                <Typography
                    color={(theme) => theme.palette['error'].dark}
                    sx={{
                        fontSize: 13
                    }}>
                    Per preson
                </Typography>
                <Typography
                    color={(theme) => theme.palette['error'].dark}
                >
                    <b>{currencyFind(currencyType)} {convertToCurrency(expensePerMember)}</b>
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Box sx={{
                    p: 0,
                    mt: -5
                }}>
                    <Iconify aria-describedby={id} icon="charm:menu-meatball" onClick={handleClick} />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <MenuList>
                            <MenuItem component={RouterLink}
                                to={dataConfig.VIEW_EXPENSE_URL + expenseId}>
                                <ListItemIcon>
                                    <Iconify icon="carbon:view-filled" />
                                </ListItemIcon>
                                <ListItemText>View</ListItemText>
                            </MenuItem>
                            <MenuItem component={RouterLink}
                                to={dataConfig.EDIT_EXPENSE_URL + expenseId}>
                                <ListItemIcon>
                                    <Iconify icon="dashicons:edit-large" />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={deleteConfirmOpen} sx={{ color: (theme) => theme.palette['error'].main }}>
                                <ListItemIcon>
                                    <Iconify sx={{ color: (theme) => theme.palette['error'].main }} icon="fluent:delete-20-filled" />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                        </MenuList>
                    </Popover>
                    <Modal
                        open={deleteConfirm}
                        onClose={deleteConfirmClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modelStyle} width={mdUp ? 400 : '90%'}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Confirm expense deletion
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Are you sure you want to delete the expense?
                            </Typography>
                            <Stack mt={2} spacing={2} direction={'row'}>
                                <Button startIcon={<Iconify icon='fluent:delete-dismiss-24-filled' />} variant="outlined" color="error" sx={{ width: '100%' }}
                                    onClick={apiDeleteCall}
                                >
                                    Delete
                                </Button>
                                <Button startIcon={<Iconify icon='material-symbols:cancel' />} variant="outlined" color="primary" sx={{ width: '100%' }}
                                    onClick={deleteConfirmClose}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </Box>
            </Grid>
        </Grid>
    )
}
