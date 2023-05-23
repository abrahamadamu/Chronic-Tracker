import { TextField, Typography } from "@mui/material";

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
          label="FBS (in mg/dl)"
          placeholder="FBS (in mg/dl)"
          value={data.get.fbs}
          onChange={(e) => data.set({ ...data.get, fbs: e.target.value })}
          type="number"
        />
        <TextField
          label="RBS (in mg/dl)"
          placeholder="RBS (in mg/dl)"
          value={data.get.rbs}
          onChange={(e) => data.set({ ...data.get, rbs: e.target.value })}
          type="number"
        />
        <TextField
          label="HBA1C"
          placeholder="HBA1C"
          value={data.get.hba1c}
          onChange={(e) => data.set({ ...data.get, hba1c: e.target.value })}
        />

        <TextField
          label="Urine Protein"
          placeholder="U/A Protein"
          value={data.get.uaprotein}
          onChange={(e) => data.set({ ...data.get, uaprotein: e.target.value })}
        />
        <TextField
          label="Urine Ketone"
          placeholder="U/A Ketone"
          value={data.get.uaketone}
          onChange={(e) => data.set({ ...data.get, uaketone: e.target.value })}
        />
        <TextField
          label="Urine Glucose"
          placeholder="U/A Glucose"
          value={data.get.uaglucose}
          onChange={(e) => data.set({ ...data.get, uaglucose: e.target.value })}
        />

        <TextField
          label="HDL (in mg/dl)"
          placeholder="HDL (in mg/dl)"
          value={data.get.hdl}
          onChange={(e) => data.set({ ...data.get, hdl: e.target.value })}
          type="number"
        />
        <TextField
          label="LDL (in mg/dl)"
          placeholder="LDL (in mg/dl)"
          value={data.get.ldl}
          onChange={(e) => data.set({ ...data.get, ldl: e.target.value })}
          type="number"
        />
        <TextField
          label="Triglycerides (in mg/dl)"
          placeholder="Triglycerides (in mg/dl)"
          value={data.get.triglycerides}
          onChange={(e) =>
            data.set({ ...data.get, triglycerides: e.target.value })
          }
          type="number"
        />
        <TextField
          label="Total Cholesterol  (in mg/dl)"
          placeholder="Total Cholesterol  (in mg/dl)"
          value={data.get.cholesterol}
          onChange={(e) =>
            data.set({ ...data.get, cholesterol: e.target.value })
          }
          type="number"
        />

        <TextField
          label="Cr  (in mg/dl)"
          placeholder="cr (in mg/dl)"
          value={data.get.cr}
          onChange={(e) => data.set({ ...data.get, cr: e.target.value })}
          type="number"
        />
        <TextField
          label="BUN"
          placeholder="BUN"
          value={data.get.bun}
          onChange={(e) => data.set({ ...data.get, bun: e.target.value })}
        />

        <TextField
          label="Estimated GFR"
          placeholder="Estimated GFR"
          value={"CALCULATED"}
          disabled
        />
      </FormContainer>
    </>
  );
}

export default History;
