import React from 'react';
import Paper from '@mui/material/Paper/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Footer() {
  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my:1
          }}
        >
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©2022. SVTex Limited
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}