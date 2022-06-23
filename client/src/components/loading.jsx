import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";


export default function Loading() {

  return (
    <Box 
    style={{ margin: 0,
        position: 'absolute',
        top: '45%',
        left: '50%' }}
  >
    <CircularProgress size={60} sx={{marginLeft: '25%'}}/>
    <Typography variant="h3" color={'text.secondary'}>
        Loading...
    </Typography>
    </Box>
  )
}
