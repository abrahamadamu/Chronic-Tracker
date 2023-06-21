import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const LeftBar = styled(Grid)(({ theme }) => ({
  position: "sticky",
  top: "0",
  height: "100vh",
  width: "250px",
  minWidth: "250px",

  backgroundColor: theme.palette.primary.dark,
}));

export { LeftBar };
