import { useState } from "react";
import { TextField } from "@mui/material";

import { FormContainer } from "../styled";
import EditableList from "../Components/EditableList";

import { DataFormat } from "..";

import { oralList, CategoryValuePair } from "Data/data";

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  const [oral, setOral] = useState<CategoryValuePair[]>([]);

  return (
    <>
      <FormContainer>
        <EditableList
          title="Oral/Dental"
          choices={oralList}
          chosen={{ get: oral, set: setOral }}
        />
        {/* <TextField
          label="Weight (Kg)"
          placeholder="Enter weight"
          value={data.get.weight}
          onChange={(e) => data.set({ ...data.get, weight: e.target.value })}
          type="number"
        /> */}
      </FormContainer>
    </>
  );
}

export default History;
