import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box sx={{ p: 2, textAlign: 'end', backgroundColor: '#f5f5f5'}}>
      <IconButton href="https://facebook.com" target="_blank"><FacebookIcon /></IconButton>
      <IconButton href="https://x.com" target="_blank"><XIcon /></IconButton>
      <IconButton href="https://instagram.com" target="_blank"><InstagramIcon /></IconButton>
    </Box>
  );
};

export default Footer;
