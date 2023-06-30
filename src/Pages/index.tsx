import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Grid, CircularProgress } from "@mui/material";

import Patients from "./Patients";
import Login from "./Auth/Login";

import Auth from "Services/auth";

function Pages() {
  const [authCheck, setAuthCheck] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setAuthCheck(await Auth.checkAuth());
    })();
  }, []);

  return authCheck === undefined ? (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", width: "100vw" }}
    >
      <CircularProgress />
    </Grid>
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
