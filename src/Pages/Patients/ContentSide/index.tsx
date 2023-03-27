import { ReactNode } from "react";
import { Grid } from "@mui/material";
import { Container, ContentBox } from "./styled";

function ContentSide({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Grid container justifyContent="center" paddingTop="70px">
        <ContentBox elevation={3}>{children}</ContentBox>
      </Grid>
    </Container>
  );
}

export default ContentSide;
