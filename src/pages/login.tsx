import AuthenticationForm from "../client/components/AuthenticationForm";
import * as React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AiOutlineUser } from '@react-icons/all-files/ai/AiOutlineUser';

const StyledBox = styled(Box)`
 max-width:350px;
 width:100%;
`;

export default function Login() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(login.jpeg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 12,
            mx: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AiOutlineUser/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <StyledBox sx={{ mt: 1 }}>
          <AuthenticationForm />
          </StyledBox>
        </Box>
      </Grid>
    </Grid>
  );
}