import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import Api from "Services/api";

import PatientData from "Components/PatientData";
import { FormDataType } from "Components/PatientData/contexts";

function AddPatient() {
  const [formData, setFormData] = useState<FormDataType | undefined>({
    dm: {},
    personal: {},
    visit: {},
  });

  function saveAction(): Promise<any> {
    console.log({ formData });
    // return new Promise((r) => r(3));
    return Api.post("/patients/save", formData)
      .then((response) => {
        if (response.status >= 300 || response.status < 200) {
          throw new Error(response.data());
        }
        if (!formData) return false;

        const data = response.data;

        const newFormData = {
          ...formData,
          patientid: data.patientid,
          visitid: data.visitid,
        };
        setFormData(newFormData);
        console.log({ newFormData });

        return true;
      })
      .catch((e) => {
        alert(e);
      });
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
