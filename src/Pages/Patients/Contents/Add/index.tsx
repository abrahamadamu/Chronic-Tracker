import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import PatientData from "../Components/PatientData";

function AddPatient() {
  const [formData, setFormData] = useState<Record<string, any>>({});

  return (
    <Grid container direction="column" gap={3}>
      <Typography variant="h4"> New patient</Typography>
      <PatientData formData={{ get: formData, set: setFormData }} />
    </Grid>
  );
}

export default AddPatient;
