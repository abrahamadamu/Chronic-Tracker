import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "40px 70px",
}));
