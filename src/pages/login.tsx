import * as React from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";

const AuthenticationForm = dynamic(
  import("../client/components/AuthenticationForm")
);

const StyledBox = styled(Box)`
  max-width: 350px;
  width: 100%;
`;

export default function Login() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(login.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 12,
            mx: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AiOutlineUser />
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
