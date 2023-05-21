import { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Box,
  FormLabel,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FormContainer } from "../styled";
import EditableList from "../Components/CustomMultiList";
import MedicationInput from "../Components/MedicationInput";

import { DataFormat } from "..";

import {
  CategoryValuePair,
  lifestyleChangesList,
  adherenceList,
} from "Data/data";

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  const [lifestylechanges, setLifestylechanges] = useState<CategoryValuePair[]>(
    []
  );
  const [adherence, setAdherence] = useState("");

  useEffect(() => {
    data.set({ ...data.get, symptoms: lifestylechanges, adherence: adherence });
  }, [lifestylechanges]);

  return (
    <>
      <FormContainer>
        <EditableList
          title="Lifestyle Changes"
          choices={lifestyleChangesList}
          chosen={{ get: lifestylechanges, set: setLifestylechanges }}
          listType="simple"
        />
        <FormControl>
          <InputLabel size="small" id="adherence-label">
            Adherence
          </InputLabel>
          <Select
            size="small"
            label="Adherence"
            labelId="adherence-label"
            value={adherence}
            onChange={(e) => setAdherence(e.target.value)}
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
