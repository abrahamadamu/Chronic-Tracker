import { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FormContainer } from "../styled";
import EditableList from "../Components/CustomMultiList";
import MedicationList from "../Components/Medication/MedicationList";

import { DataFormat } from "..";

import {
  CategoryValuePair,
  lifestyleChangesList,
  adherenceList,
  CodeTextPair,
} from "Data/data";

import { getCategoryValuePair, getCodeTextPair, getCodes } from "Data/datautil";

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  const [lifestylechanges, setLifestylechanges] = useState<CodeTextPair[]>(
    getCodeTextPair(data.get?.lifestylechanges as string[])
  );

  const dataStates: Record<string, CodeTextPair[]> = {
    lifestylechanges,
  };

  useEffect(() => {
    let newData = data.get;
    Object.keys(dataStates).forEach((stateName) => {
      const codes = getCodes(dataStates[stateName]);
      if (codes.length > 0) {
        newData = { ...newData, [stateName]: codes };
      } else {
        delete newData[stateName];
      }
    });
    data.set({ ...newData });
  }, Object.values(dataStates));

  return (
    <>
      <FormContainer>
        <EditableList
          title="Lifestyle Changes"
          choices={lifestyleChangesList}
          chosen={{ get: lifestylechanges, set: setLifestylechanges }}
          listType="simple"
        />

        <MedicationList />

        <FormControl>
          <InputLabel size="small" id="adherence-label">
            Adherence
          </InputLabel>
          <Select
            size="small"
            label="Adherence"
            labelId="adherence-label"
            value={data.get?.adherence}
            onChange={(e) =>
              data.set({ ...data.get, adherence: e.target.value })
            }
          >
            {adherenceList?.map((adherence) => (
              <MenuItem key={adherence.code} value={adherence.code}>
                {adherence.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormContainer>
    </>
  );
}

export default History;
