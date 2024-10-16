import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Box, Grid2 } from '@mui/material';
import Posts from './Posts';
import Users from './Users';
import Quotes from './Quotes';

export default function ButtonUsage() {
  const [alignment, setAlignment] = useState('posts');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Grid2
      container 
      direction="column"
      sx={{
        justifyContent:"center",
        alignItems:"center", 
        margin:"auto",
        padding:"15px",
      }}   
    >
      <ToggleButtonGroup
        value={alignment}
        onChange={handleChange}
        exclusive
        aria-label="Content Selection"
      >
        <Grid2 
          container
          direction={{xs:"column", sm:"row"}}
        >
          <ToggleButton 
            sx={{
              fontWeight: "600",
              border: "solid 3px darkcyan",
              background: "darkgray"
            }} 
            value="posts"
          >
            Posts
          </ToggleButton>
          <ToggleButton 
            value="quotes"
            sx={{
              fontWeight: "600",
              border: "solid 3px darkcyan",
              background: "darkgray"
            }} 
          >
            Quotes
          </ToggleButton>
          <ToggleButton 
            value="users"
            sx={{
              fontWeight: "600",
              border: "solid 3px darkcyan",
              background: "darkgray"
            }} 
          >
            Users
          </ToggleButton>
        </Grid2>
      </ToggleButtonGroup>

      <Box sx={{ mt: '20px' }}>
        {alignment === 'posts' && <Posts />}
        {alignment === 'quotes' && <Quotes />}
        {alignment === 'users' && <Users />}
      </Box>
    </Grid2>
  );
}
