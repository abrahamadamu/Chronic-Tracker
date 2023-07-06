import { useContext } from "react";
import { TextField } from "@mui/material";

import { FormContainer } from "../styled";

import { patientDataContext } from "../../../contexts";

import { DataFormat } from "..";

function History({ id }: { id: string }) {
  const patientData = useContext(patientDataContext);

  function setValue(key: string, value: string | number, number?: boolean) {
    if (!key) return;
    patientData.set((prevData) => {
      if (!prevData) return;

      return {
        ...prevData,
        dm: {
          ...prevData?.dm,
          [key]: number ? Number(value) : value,
        },
      };
    });
  }
  function getValue(key: string) {
    if (!key) return;
    if (!patientData.get?.dm) return;

    return patientData.get?.dm[key];
  }

  return (
    <>
      <FormContainer>
        <TextField
          label="Height (m)"
          placeholder="Enter height"
          value={getValue("height")}
          onChange={(e) => setValue("height", e.target.value, true)}
          type="number"
        />
        <TextField
          label="Weight (Kg)"
          placeholder="Enter weight"
          value={getValue("weight")}
          onChange={(e) => setValue("weight", e.target.value, true)}
          type="number"
        />
        <TextField
          label="BMI (Kg/m2)"
          placeholder="To be calculated"
          value={(() => {
            const height = Number(getValue("height"));
            if (Number.isNaN(height) || height === 0)
              return "Enter height first";
            const weight = Number(getValue("weight"));
            if (Number.isNaN(weight) || weight === 0)
              return "Enter weight first";

            return Math.round((100 * weight) / height ** 2) / 100;
          })()}
          disabled
        />
        <TextField
          label="Waist Circumference (cm)"
          placeholder="Enter Waist Circumference"
          value={getValue("waist")}
          onChange={(e) => setValue("waist", e.target.value, true)}
          type="number"
        />
        <TextField
          label="BP Systolic (mmHg)"
          placeholder="Enter BP"
          value={getValue("bpsystolic")}
          onChange={(e) => setValue("bpdiastolic", e.target.value, true)}
          type="number"
        />
        <TextField
          label="BP Diastolic (mmHg)"
          placeholder="Enter BP"
          value={getValue("bpdiastolic")}
          onChange={(e) => setValue("bpdiastolic", e.target.value, true)}
          type="number"
        />
      </FormContainer>
    </>
  );
}

export default History;
