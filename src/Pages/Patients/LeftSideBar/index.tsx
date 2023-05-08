import { ReactNode } from "react";
import { NavLink, useParams } from "react-router-dom";
import { List, ListItemButton, Typography } from "@mui/material";
import { LeftBar } from "./styled";

type LeftMenuType = {
  id: string;
  name: string;
  component: ReactNode;
};

function LeftSideBar({ leftMenus }: { leftMenus: LeftMenuType[] }) {
  const { URL_mainpage } = useParams();

  return (
    <LeftBar>
      <Typography variant="h4" textAlign="center" color="white">
        Records
      </Typography>
      <br />
      <br />
      <List>
        {leftMenus.map((menu) => (
          <NavLink
            key={menu.id}
            to={menu.id}
            style={{ color: "unset", textDecoration: "none" }}
          >
            {({ isActive }) => <LeftBarItem isActive={isActive} item={menu} />}
          </NavLink>
        ))}
      </List>
    </LeftBar>
  );
}

function LeftBarItem({
  item,
  isActive,
}: {
  item: LeftMenuType;
  isActive: boolean;
}) {
  const selectedStyles = isActive
    ? { backgroundColor: "white", color: "primary.main" }
    : {};

  return (
    <ListItemButton
      sx={{
        paddingY: "12px",
        "&:hover": isActive
          ? {
              backgroundColor: "white",
            }
          : {},
        transition: "all 200mx",
        color: "white",
        ...selectedStyles,
      }}
    >
      <Typography color="inherit">{item.name}</Typography>
    </ListItemButton>
  );
}

export default LeftSideBar;
export type { LeftMenuType };
