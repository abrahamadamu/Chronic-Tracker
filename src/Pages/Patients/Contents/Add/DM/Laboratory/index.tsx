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
          label="FSB / HBA1C"
          placeholder="FSB / HBA1C"
          value={data.get.fsbhba1c}
          onChange={(e) => data.set({ ...data.get, fsbhba1c: e.target.value })}
        />
        <TextField
          label="Urine Analysis"
          placeholder="U/A (Protein Ketone)"
          value={data.get.ua}
          onChange={(e) => data.set({ ...data.get, ua: e.target.value })}
        />
        <TextField
          label="Cr"
          placeholder="cr"
          value={data.get.cr}
          onChange={(e) => data.set({ ...data.get, cr: e.target.value })}
        />
        <TextField
          label="Total Cholesterol"
          placeholder="Cholesterol"
          value={data.get.cholesterol}
          onChange={(e) =>
            data.set({ ...data.get, cholesterol: e.target.value })
          }
        />
      </FormContainer>
    </>
  );
}

export default History;
