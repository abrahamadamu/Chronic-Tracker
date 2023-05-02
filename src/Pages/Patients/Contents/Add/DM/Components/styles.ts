import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const ModalWindow = styled(Grid)(({ theme }) => ({
  padding: " 20px",
  width: "unset",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "5px",
}));

export { ModalWindow };
