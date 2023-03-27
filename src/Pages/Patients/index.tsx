import { useState } from "react";
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
  const [curLeftMenu, setCurLeftMenu] = useState<LeftMenuType>(leftMenus[0]);

  return (
    <Grid container direction="row" wrap="nowrap">
      <LeftSideBar
        leftMenus={leftMenus}
        curLeftMenu={{ get: curLeftMenu, set: setCurLeftMenu }}
      />
      <Container>
        {(() => {
          for (const menu of leftMenus) {
            if (menu.id === curLeftMenu.id) {
              return menu.component;
            }
          }
          return <></>;
        })()}
      </Container>
    </Grid>
  );
}

export default Patients;
