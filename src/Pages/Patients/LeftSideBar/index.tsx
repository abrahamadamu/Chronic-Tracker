import { ReactNode } from "react";
import { List, ListItemButton, Typography } from "@mui/material";
import { LeftBar } from "./styled";

type LeftMenuType = {
  id: string;
  name: string;
  component: ReactNode;
};

function LeftSideBar({
  leftMenus,
  curLeftMenu,
}: {
  leftMenus: LeftMenuType[];
  curLeftMenu: { get: LeftMenuType; set: (p: LeftMenuType) => void };
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
          <LeftBarItem key={menu.id} current={curLeftMenu} item={menu} />
        ))}
      </List>
    </LeftBar>
  );
}

function LeftBarItem({
  item,
  current,
}: {
  item: LeftMenuType;
  current: { get: LeftMenuType; set: (v: LeftMenuType) => void };
}) {
  const selected = item.id === current.get.id;
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
      onClick={() => current.set(item)}
    >
      <Typography color="inherit">{item.name}</Typography>
    </ListItemButton>
  );
}

export default LeftSideBar;
export type { LeftMenuType };
