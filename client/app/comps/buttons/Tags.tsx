import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Tags() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={2}>
      <Chip label="All" onClick={handleClick} variant="outlined" style={{color:"#f5f5f7"}}/>
      <Chip label="Software"  onClick={handleClick} style={{color:"#f5f5f7"}}/>
      <Chip label="AI"  onClick={handleClick} style={{color:"#f5f5f7"}}/>
      <Chip label="Business"  onClick={handleClick} style={{color:"#f5f5f7"}}/>
      <Chip label="Engineering" onClick={handleClick} style={{color:"#f5f5f7"}}/>
      <Chip label="Science"  onClick={handleClick} style={{color:"#f5f5f7"}}/>
      <Chip label="Knowledge"  onClick={handleClick} style={{color:"#f5f5f7"}}/>
      <Chip label="Physics" onClick={handleClick} style={{color:"#f5f5f7"}} />
    </Stack>
  );
}