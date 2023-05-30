import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import { FormContainer } from "../styled";

import { DataFormat } from "..";

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  return (
    <>
      <FormContainer>
        <TextField
          label="Weight (Kg)"
          placeholder="Enter weight"
          value={data.get.weight}
          onChange={(e) => data.set({ ...data.get, weight: e.target.value })}
          type="number"
        />
        <TextField
          label="BMI (Kg/m2)"
          placeholder="To be calculated"
          value={(() => {
            const height = Number(data.get.height);
            if (Number.isNaN(height) || height === 0)
              return "Enter height first";
            const weight = Number(data.get.weight);
            if (Number.isNaN(weight) || weight === 0)
              return "Enter weight first";

            return Math.round((100 * weight) / height ** 2) / 100;
          })()}
          disabled
        />
        <TextField
          label="BP (mmHg)"
          placeholder="Enter BP"
          value={data.get.bloodpressure}
          onChange={(e) =>
            data.set({ ...data.get, bloodpressure: e.target.value })
          }
        />
      </FormContainer>
    </>
  );
}

export default History;
