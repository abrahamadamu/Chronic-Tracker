import { useState } from "react";
import { List, ListItemButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { LeftBar } from "./styled";

const leftMenus = ["Add new", "Explore", "Settings"];

function Patients() {
  const [curLeftMenu, setCurLeftMenu] = useState(leftMenus[0]);

  return (
    <Grid container>
      <LeftBar>
        <Typography variant="h4" textAlign="center" color="white">
          Records
        </Typography>
        <br />
        <br />
        <List>
          {leftMenus.map((menu) => (
            <LeftBarItem
              key={menu}
              current={{ get: curLeftMenu, set: setCurLeftMenu }}
              text={menu}
            />
          ))}
        </List>
      </LeftBar>
      <Grid>
        <h1>Content</h1>
      </Grid>
    </Grid>
  );
}

function LeftBarItem({
  text,
  current,
}: {
  text: string;
  current: { get: string; set: (v: string) => void };
}) {
  const selected = text === current.get;
  const selectedStyles = selected
    ? { backgroundColor: "white", color: "primary.main" }
    : {};

  return (
    <ListItemButton
      sx={{
        paddingY: "12px",
        "&:hover": selected
          ? {
              color: "black",
              backgroundColor: "white",
            }
          : {},
        transition: "all 200mx",
        color: "white",
        ...selectedStyles,
      }}
      onClick={() => current.set(text)}
    >
      <Typography color="inherit">{text}</Typography>
    </ListItemButton>
  );
}

export default Patients;
