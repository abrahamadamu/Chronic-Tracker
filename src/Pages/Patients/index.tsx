import { useState } from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Container from "./ContentSide";
import LeftSideBar, { LeftMenuType } from "./LeftSideBar";

import AddPatient from "./Contents/Add";

const leftMenus: LeftMenuType[] = [
  { id: "addnew", name: "Add new", component: <AddPatient /> },
  { id: "explore", name: "Explore", component: <></> },
  { id: "settings", name: "Settings", component: <></> },
];

function Patients() {
  return (
    <Grid container direction="row" wrap="nowrap">
      <LeftSideBar leftMenus={leftMenus} />
      <Container>
        <Routes>
          <Route path="" element={<Navigate to={leftMenus[0].id} />} />
          <Route path=":URL_patientleftmenu/*" element={<ParamChecker />} />
        </Routes>
      </Container>
    </Grid>
  );
}

function ParamChecker() {
  const { URL_patientleftmenu } = useParams();

  for (const menu of leftMenus) {
    if (menu.id === URL_patientleftmenu) {
      return <>{menu.component}</>;
    }
  }
  return <></>;
}

export default Patients;
