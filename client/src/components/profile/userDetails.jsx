import { Stack, TextField } from '@mui/material'
import React from 'react'

export default function UserDetails() {
return (
<Stack spacing={3}>
    <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
        <TextField disabled id="outlined-disabled" label="First Name" defaultValue="Sunny" sx={{width:"100%"}} />
        <TextField disabled id="outlined-disabled" label="Last Name" defaultValue="George" sx={{width:"100%"}} />
    </Stack>
    <TextField disabled id="outlined-disabled" label="Email address" defaultValue="s4sunnygeorge@gmail.com"
        sx={{width:"100%"}} />
</Stack>
)
}