import { useState } from "react";
import Grid from "@mui/material/Grid";

import Container from "./ContentSide";
import LeftSideBar from "./LeftSideBar";

const leftMenus = ["Add new", "Explore", "Settings"];

function Patients() {
  const [curLeftMenu, setCurLeftMenu] = useState(leftMenus[0]);

  return (
    <Grid container justifyContent="stretch">
      <LeftSideBar
        leftMenus={leftMenus}
        curLeftMenu={{ get: curLeftMenu, set: setCurLeftMenu }}
      />
      <Container />
    </Grid>
  );
}

export default Patients;
