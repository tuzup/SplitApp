import { Grid, CardActionArea, CardContent, CardMedia, Typography, Container, Card, Box, Link, alpha, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserGroupsService } from "../../services/groupServices";
import Iconify from "../Iconify";
import Loading from "../loading";
import GroupCards from "./groupCards";
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../config.json';

const profile = JSON.parse(localStorage.getItem('profile'))
const emailId = profile?.emailId

export default function Group() {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState([]);
  const [color] = useState(['primary', 'secondary', 'error', 'warning', 'info', 'success']);

  useEffect(() => {
    const getUserGroups = async () => {
      setLoading(true)
      const response_group = await getUserGroupsService(profile)
      setGroup(response_group.data.groups)
      setLoading(false)
    }
    getUserGroups()
  }, []);

  const checkActive = (split) => {
    for (var key in split) {
      if (split.hasOwnProperty(key)) {
        if (Math.round(split[key]) != 0)
          return true
      }
    }
    return false
  }
  return (
    <Container>
      {loading ? <Loading /> :
        <>
          <Fab component={RouterLink}
            to={dataConfig.CREATE_GROUP_URL} color="primary" aria-label="add" sx={{
              margin: 0,
              top: 'auto',
              right: 20,
              bottom: 20,
              left: 'auto',
              position: 'fixed'
            }}>
            <Iconify icon="fluent:people-team-add-20-filled" sx={{
              width: '100%',
              height: 20
            }} />
          </Fab>
          <Typography variant="h3" pb={2}>
            Your Groups,
          </Typography>
          <Grid container spacing={4} >

            {group?.map(myGroup => (
              <Grid item xs={12} md={6} lg={6} key={myGroup?._id}>
                <Link component={RouterLink}
                to={dataConfig.VIEW_GROUP_URL+myGroup?._id}
                sx={{ textDecoration: 'none' }}
              >
                <GroupCards
                  title={myGroup?.groupName}
                  description={myGroup?.groupDescription}
                  groupMembers={myGroup?.groupMembers}
                  share={myGroup?.split[0][emailId]}
                  currencyType={myGroup?.groupCurrency}
                  groupCategory={myGroup?.groupCategory}
                  isGroupActive={checkActive(myGroup?.split[0])}
                  color={color[Math.floor(Math.random() * 5)]}
                />
                </Link>
              </Grid>
            ))}
            <Grid item xs={12} md={6} lg={6}>
              <Link component={RouterLink}
                to={dataConfig.CREATE_GROUP_URL}
                sx={{ textDecoration: 'none' }}
              >
                <Card
                  sx={{
                    p: 0,
                    boxShadow: 10,
                    borderRadius: 2,
                    backgroundImage: (theme) =>
                      `linear-gradient(169deg, ${alpha(theme.palette['primary'].light, 0.6)} 0%, ${alpha(
                        theme.palette['primary'].darker,
                        0.55
                      )} 70%)`,
                    minHeight: 310
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={310}
                  >
                    <Grid item xs={'auto'} md={'auto'} >
                      <Iconify icon="fluent:people-team-add-20-filled" color={'#fff'} sx={{
                        width: '100%',
                        height: 50
                      }} />
                      <Typography variant="h4" fontSize={28} color='#fff' sx={{
                        width: '100%', textDecoration: 'none'
                      }}>
                        Create new group!
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </>}
    </Container>
  )
}
