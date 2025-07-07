import styled from '@emotion/styled';
import { Box, Button, Card, CardContent, Grid, Link, Stack, Typography } from '@mui/material'

import React, { useState, useEffect } from 'react'
import { getUserGroupsService } from '../../services/groupServices';
import Loading from '../loading'
import dataConfig from '../../config.json';
import { Link as RouterLink } from 'react-router-dom';
import MiniGroupCard from '../groups/miniGroupCard';



const CategoryStyle = styled('div')(({ theme }) => ({
    zIndex: 9,
    width: 35,
    height: 32,
    position: 'absolute',
    left: 22,
    top: 130,
    background: "red",
    borderRadius: 50
  }));
  
const profile = JSON.parse(localStorage.getItem('profile'))
const emailId = profile?.emailId


const FavouriteGroups = () => {
    const [loading, setLoading] = useState(false)
    const [group, setGroup] = useState()
    const [colors] = useState(['primary', 'secondary', 'error', 'warning', 'info', 'success']);

    const checkActive = (split) => {
        for (var key in split) {
          if (split.hasOwnProperty(key)) {
            if (Math.round(split[key]) != 0)
              return true
          }
        }
    }
    useEffect(() => {
        const getUserFavGroups = async () => {
          setLoading(true)
          const response_group = await getUserGroupsService(profile)
          setGroup(response_group.data.groups)
          setLoading(false)          
        }
        getUserFavGroups()
      }, []);
    return (
        <>{loading ? <Loading /> :
            <Box sx={{
                p: 5,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 5,
            }}>
                <Typography variant="h6" mb={2}>
                    Groups
                </Typography>
                <Grid container spacing={4}>

                {group?.map(myGroup => {
                    return (
                        <Grid item xs={12} md={12} lg={6} key={myGroup?._id}>
                            <Link component={RouterLink}
                                to={dataConfig.VIEW_GROUP_URL + myGroup?._id}
                                sx={{ textDecoration: 'none' }}
                            >
                                <MiniGroupCard
                                    groupId={myGroup?._id}
                                    title={myGroup?.groupName}
                                    description={myGroup?.groupDescription}
                                    groupMembers={myGroup?.groupMembers}
                                    share={myGroup?.split[0][emailId]}
                                    currencyType={myGroup?.groupCurrency}
                                    groupCategory={myGroup?.groupCategory}
                                    isGroupActive={checkActive(myGroup?.split[0])}
                                    color='info' />
                            </Link>
                        </Grid>
                    );
                })}
                </Grid>

            </Box>}
        </>
    )
}

export default FavouriteGroups