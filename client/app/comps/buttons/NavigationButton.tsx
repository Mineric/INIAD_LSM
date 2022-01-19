import * as React from 'react';
import Link from 'next/link'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

export default function NavigationButton() {

  return (
    <Link href="/todo">
      <Fab variant="extended" size="small" style={{ padding: '13px', backgroundColor: '#007FFF', color: 'white' }}>

        <NoteAltIcon sx={{ mr: 1 }} style={{ color: 'white' }} />
        Todo
      </Fab>
    </Link>
  );
}
