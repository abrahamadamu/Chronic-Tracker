import { useState } from "react";
import { TextField } from "@mui/material";

import { FormContainer } from "../styled";
import EditableList from "../Components/EditableList";

import { DataFormat } from "..";

import { oralList, skinList, CategoryValuePair, CodeTextPair } from "Data/data";

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  const [oral, setOral] = useState<CategoryValuePair[]>([]);
  const [skin, setSkin] = useState<CodeTextPair[]>([]);

  return (
    <>
      <FormContainer>
        <EditableList
          title="Oral/Dental"
          choices={oralList}
          chosen={{ get: oral, set: setOral }}
          listType="simple"
        />
        <EditableList
          title="Skin and Injection Site"
          choices={skinList}
          chosen={{ get: skin, set: setSkin }}
          listType="simple"
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
