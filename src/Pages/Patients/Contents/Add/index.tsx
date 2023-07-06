import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import Api from "Services/api";

import PatientData, { saveData } from "Components/PatientData";
import { FormDataType } from "Components/PatientData/contexts";

function AddPatient() {
  const [formData, setFormData] = useState<FormDataType | undefined>({
    dm: {},
    personal: {},
    visit: {},
  });

  async function saveAction() {
    let result;
    try {
      result = await saveData(formData);
      setFormData(result);
    } catch (e) {}

    return !!result;
  }

  return (
    <Grid container direction="column" gap={3}>
      <Typography variant="h4"> New patient</Typography>
      <PatientData
        formData={{ get: formData, set: setFormData }}
        saveAction={saveAction as () => Promise<any>}
      />
    </Grid>
  );
}

export default AddPatient;
