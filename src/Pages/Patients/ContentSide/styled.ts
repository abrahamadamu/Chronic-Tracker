import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";

const Container = styled(Grid)(({ theme }) => ({
  flexGrow: "1",
}));

const ContentBox = styled(Paper)(({ theme }) => ({
  minWidth: "90%",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "white",
}));

export { Container, ContentBox };
