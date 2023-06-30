import { useState } from "react";

import { Grid, Typography, Button, TextField, Paper } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import Auth from "Services/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  function login() {
    setError("");

    if (!username) {
      return setError("Please enter username");
    }
    if (!password) {
      return setError("Please enter a password");
    }

    setLoggingIn(true);
    try {
      Auth.login({ username, password })
        .then((success) => {
          if (success) {
            document.location.replace("/");
          } else {
            setError("Invalid Credentials");
          }
        })
        .catch((e) => {
          setError("Invalid Credentials");
        })
        .finally(() => {
          setLoggingIn(false);
        });
    } catch (e) {
      setError("Error happened while logging in");
      setLoggingIn(false);
    }
  }

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
            autoFocus
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                login();
              }
            }}
          />
          {/* <Typography>Password</Typography> */}
          <TextField
            variant="standard"
            size="small"
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                login();
              }
            }}
          />
          {error && (
            <Typography color="red" width="100%" fontSize="15px">
              {error}
            </Typography>
          )}
          <br />
          <Button variant="contained" onClick={login} disabled={loggingIn}>
            Login
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;
