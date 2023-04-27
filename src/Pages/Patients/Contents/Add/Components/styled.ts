import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SubContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignContent: "baseline",
  gap: "10px 20px",
}));
