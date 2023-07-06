import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Grid, CircularProgress, Typography, IconButton } from "@mui/material";
import { Replay } from "@mui/icons-material";

import Patients from "./Patients";
import Login from "./Auth/Login";

import Auth from "Services/auth";

function Pages() {
  const navigate = useNavigate();

  const [authCheck, setAuthCheck] = useState<boolean | undefined | null>(
    undefined
  );

  useEffect(() => {
    (async () => {
      Auth.checkAuth()
        .then((auth) => {
          if (auth) {
            setAuthCheck(auth);
          } else {
            console.log({ auth });
            navigate("/login");
          }
        })
        .catch((e) => {
          setAuthCheck(null);
        });
    })();
  }, []);

  return authCheck === undefined || authCheck === null ? (
    authCheck === undefined ? (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", width: "100vw" }}
      >
        <CircularProgress />
      </Grid>
    ) : (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", width: "100vw" }}
        direction="column"
      >
        <Typography variant="h5" color="gray" textAlign="center">
          Unable to load page
        </Typography>
        <Grid container direction="row" sx={{ width: "fit-content" }}>
          <Typography variant="h5" color="gray" textAlign="center">
            Try reloading
          </Typography>
          <IconButton onClick={() => window.location.replace("/login")}>
            <Replay />
          </IconButton>
        </Grid>
      </Grid>
    )
  ) : (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        {(() => {
          if (Auth.readAccessToken()) {
            return (
              <>
                <Route path="/" element={<Navigate to="/patients" />} />
                <Route path="/:URL_mainpage/*" element={<MainPages />} />
              </>
            );
          } else {
            return <Route path="/*" element={<Navigate to="/login" />} />;
          }
        })()}
      </Routes>
    </>
  );
}

function MainPages() {
  const pages = [{ path: "patients", page: <Patients /> }];
  const { URL_mainpage } = useParams();

  return (() => {
    for (const page of pages) {
      if (page.path === URL_mainpage) return page.page;
    }
    return <></>;
  })();
}

export default Pages;
