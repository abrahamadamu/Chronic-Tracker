import { Grid, Typography, Button, TextField, Paper } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function Login() {
  return (
    <Grid
      container
      sx={{ width: "100vw", height: "100vh", backgroundColor: "#0002" }}
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={4} sx={{ padding: "40px 60px", borderRadius: "10px" }}>
        <Grid
          container
          width="fit-content"
          direction="column"
          alignItems="center"
          gap={1}
        >
          <AccountCircle sx={{ fontSize: "90px" }} />
          <Typography variant="h5">Account Login</Typography>
          <br />
          {/* <Typography>Username</Typography> */}
          <TextField
            variant="standard"
            size="small"
            label="Username"
            placeholder="Enter Username"
          />
          {/* <Typography>Password</Typography> */}
          <TextField
            variant="standard"
            size="small"
            label="Password"
            placeholder="Enter Password"
            type="password"
          />
          <Typography color="red" width="100%" fontSize="15px">
            Unable to login
          </Typography>
          <br />
          <Button variant="contained">Login</Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;
