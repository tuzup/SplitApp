// @mui
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Box, AvatarGroup, Avatar, Stack, Grid } from '@mui/material';
// utils
// components
import Iconify from '../Iconify';
import gravatarUrl from 'gravatar-url';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

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


GroupCards.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  groupMembers: PropTypes.array,
  share: PropTypes.number,
  currencyType: PropTypes.string,
  isGroupActive: PropTypes.bool,
  sx: PropTypes.object,
};

export default function GroupCards({ title, description, groupMembers, share, currencyType,isGroupActive, icon, color = 'primary', sx, ...other }) {

  const currencyFind = (currencyType) => {
    switch (currencyType) {
      case "INR":
        return '₹'
      case "USD":
        return '$'
      case "EUR":
        return "€"
      default:
        return '₹'
    }
  }

  return (
    <Card
      sx={{
        p: 0,
        boxShadow: 5,
        borderRadius: 2,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >

      <Box
        component="span"
        sx={{
          width: 80,
          height: 36,
          display: 'inline-block',
          bgcolor: 'currentColor',
          mask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
          WebkitMask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
          zIndex: 9,
          top: 125,
          position: 'absolute',
          color: 'background.paper'
        }}
      />
      <CategoryStyle 
        sx={{bgcolor: (theme) => theme.palette[color].lighter,
          py: '6px',
          px: '9px'
        }}
      >
         <Iconify icon="ic:sharp-flight-takeoff" color={(theme) => theme.palette[color].darker}
         />
      </CategoryStyle>

      <Box pt={6} pl={2} pb={3}
        sx={{
          bgcolor: (theme) => theme.palette[color].lighter,
          color: (theme) => theme.palette[color].darker
        }}
      >
        <Typography variant="h3" fontSize={30} sx={{ opacity: 0.72 }}>
          {title?.length <= 15 ? title : title?.slice(0, 15) + '...'}
        </Typography>
        <Typography variant="subtitle3" fontSize={14} color={'text.secondary'}>
          {description?.length <= 35 ? description : description?.slice(0, 35) + '...'} &nbsp;</Typography>
      </Box>
      <CardContent
        sx={{
          pt: 3,
          px: 1
        }}

      >
        <Stack direction="row" spacing={2} p={1} mt={1}>
          <Typography sx={{
            bgcolor: isGroupActive ?  (theme) => theme.palette['error'].lighter : (theme) => theme.palette['success'].lighter    ,
            p: 1,
            borderRadius: 1,
            color: isGroupActive ? (theme) => theme.palette['error'].darker : (theme) => theme.palette['success'].darker
          }}>
            {isGroupActive ? (<b>Not Settled</b>)  : (<b>Settled</b>) }
          </Typography>

          <Typography sx={{
            bgcolor: share < 0 ? (theme) => theme.palette['error'].lighter : (theme) => theme.palette['success'].lighter,
            p: 1,
            borderRadius: 1,
            color: share < 0 ? (theme) => theme.palette['error'].darker : (theme) => theme.palette['success'].darker
          }}>
            <b> Your Share : &nbsp;
              {currencyFind(currencyType)} {Math.abs(Math.floor(share))}</b>
          </Typography>
        </Stack>
        <Grid container direction="row" spacing={1} p={1}>
          <Grid item md={6} xs={12}>
            <Stack direction="row" width={'100%'}>
              <Typography justifyContent={'center'} py={1} mr={1}>
                Category {" "}
              </Typography>
              <Box sx={{
                bgcolor: (theme) => theme.palette['warning'].lighter,
                p: 1,
                borderRadius: 1,
                color: (theme) => theme.palette['warning'].darker,
              }}>
                Trip
              </Box>
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <AvatarGroup max={3} sx={{ width: '100%' }}>
              {groupMembers.map(member => (
                <Avatar alt={member.toUpperCase()} src={gravatarUrl(member, { size: 350 })} />
              ))}
            </AvatarGroup>
          </Grid>
        </Grid>

      </CardContent>

    </Card>
  );
}