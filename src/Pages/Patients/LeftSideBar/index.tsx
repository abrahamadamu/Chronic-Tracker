import { List, ListItemButton, Typography } from "@mui/material";
import { LeftBar } from "./styled";

function LeftSideBar({
  leftMenus,
  curLeftMenu,
}: {
  leftMenus: string[];
  curLeftMenu: { get: string; set: (p: string) => void };
}) {
  return (
    <LeftBar>
      <Typography variant="h4" textAlign="center" color="white">
        Records
      </Typography>
      <br />
      <br />
      <List>
        {leftMenus.map((menu) => (
          <LeftBarItem key={menu} current={curLeftMenu} text={menu} />
        ))}
      </List>
    </LeftBar>
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

export default LeftSideBar;
