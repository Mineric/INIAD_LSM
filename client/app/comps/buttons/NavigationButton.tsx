import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

export default function NavigationButton() {
  return (
      <Fab variant="extended" size="small" style={{ padding: '13px', backgroundColor: '#007FFF', color: 'white'}}>
        <NoteAltIcon sx={{ mr: 1 }} style={{ color: 'white' }} />
        Notes
      </Fab>

  );
}
