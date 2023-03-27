import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FormContainer = styled(Box)(({ theme }) => ({
  padding: "0px 30px",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "40px 70px",
}));

export const SubContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignContent: "baseline",
  gap: "10px 20px",
}));
