import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px 70px",
}));

export const DividerText = styled(Typography)(({ theme }) => ({
  marginTop: "20px",
  gridColumn: "1/-1",
}));
