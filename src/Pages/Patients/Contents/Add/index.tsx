import { Grid, Typography } from "@mui/material";

function AddPatient() {
  return (
    <Grid container direction="column" gap={3}>
      <Typography variant="h4"> New patient</Typography>
      <Typography variant="h5"> Personal</Typography>
    </Grid>
  );
}

export default AddPatient;
