import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function AvatarButton() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar style={{backgroundColor: 'rgb(0, 127, 255)', color:'white'}}>M</Avatar>} label="Avatar" />
    </Stack>
  );
}