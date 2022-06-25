import { Grid, CardActionArea, CardContent, CardMedia, Typography, Container, Card, Box, Link, alpha } from "@mui/material";
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
        if (split[key] != 0)
          return true
      }
    }
    return false
  }
  return (
    <Container>
      {loading ? <Loading /> :
        <>
          <Typography variant="h3" pb={2}>
            Your Groups,
          </Typography>
          <Grid container spacing={4}>

            {group?.map(myGroup => (
              <Grid item xs={12} md={4}>
                <GroupCards
                  title={myGroup?.groupName}
                  description={myGroup?.groupDescription}
                  groupMembers={myGroup?.groupMembers}
                  share={myGroup?.split[0][emailId]}
                  currencyType={myGroup?.currencyType}
                  isGroupActive={checkActive(myGroup?.split[0])}
                  color={color[Math.floor(Math.random() * 5)]}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={4}>
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
                      `linear-gradient(169deg, ${alpha(theme.palette.grey[900], 0.6)} 0%, ${alpha(
                        theme.palette.grey[900],
                        0.45
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