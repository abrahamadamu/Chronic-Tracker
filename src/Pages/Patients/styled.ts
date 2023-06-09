import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const LeftBar = styled(Grid)(({ theme }) => ({
  paddingTop: "10%",
  height: "100vh",
  width: "250px",

  backgroundColor: theme.palette.primary.main,
}));

const ContentSide = styled(Grid)(({ theme }) => ({
  flexGrow: "1",
  backgroundColor: "#dfe9f1",
}));

export { LeftBar, ContentSide };
