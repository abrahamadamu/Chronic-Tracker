import { useState } from "react";
import { backend } from "Config/data";

import { Grid, Typography } from "@mui/material";

import PatientData from "Components/PatientData";
import { FormDataType } from "Components/PatientData/contexts";

function AddPatient() {
  const [formData, setFormData] = useState<FormDataType>({
    dm: {},
    personal: {},
    visit: {},
  });

  function saveAction(): Promise<any> {
    console.log({ formData });
    // return new Promise((r) => r(3));
    return fetch(backend + "/patients/save", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.status >= 300 || response.status < 200) {
          throw new Error(await response.text());
        }
        return response.json().then((json) => {
          const newFormData = {
            ...formData,
            patientid: json.patientid,
            visitid: json.visitid,
          };
          setFormData(newFormData);
          console.log({ newFormData });

          return true;
        });
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
