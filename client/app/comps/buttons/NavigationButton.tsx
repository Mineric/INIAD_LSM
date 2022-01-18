import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';


export default function NavigationButton() {
  return (
      <Fab variant="extended" size="small" style={{ backgroundColor: '#007FFF', color: 'white'}}>
        <NavigationIcon sx={{ mr: 1 }} style={{ color: 'white' }} />
        Navigate
      </Fab>

  );
}
