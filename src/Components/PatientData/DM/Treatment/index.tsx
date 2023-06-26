import { useState, useEffect, useContext } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { FormContainer } from "../styled";
import EditableList from "../Components/CustomMultiList";
import MedicationList from "../Components/Medication/MedicationList";

import { patientDataContext } from "../../contexts";

import { DataFormat } from "..";

import {
  CategoryValuePair,
  lifestyleChangesList,
  adherenceList,
  CodeTextPair,
} from "Data/data";

import { getCodeTextPair, getCodes } from "Data/datautil";

function History({ id }: { id: string }) {
  const patientData = useContext(patientDataContext);

  const [lifestylechanges, setLifestylechanges] = useState<CodeTextPair[]>(
    getCodeTextPair(patientData.get?.dm?.lifestylechanges as string[])
  );

  const dataStates: Record<string, CodeTextPair[]> = {
    lifestylechanges,
  };

  useEffect(() => {
    if (!patientData.get) return;

    let newData = patientData.get?.dm;
    Object.keys(dataStates).forEach((stateName) => {
      const codes = getCodes(dataStates[stateName]);
      if (codes.length > 0) {
        newData = { ...newData, [stateName]: codes };
      } else {
        delete newData[stateName];
      }
    });
    patientData.set({
      ...patientData.get,
      dm: { newData },
    });
  }, Object.values(dataStates));

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
        <EditableList
          title="Lifestyle Changes"
          choices={lifestyleChangesList}
          chosen={{ get: lifestylechanges, set: setLifestylechanges }}
          listType="simple"
        />

        <MedicationList />

        <TextField
          label="Medication Side Effects"
          size="small"
          value={getValue("medicationsideeffects")}
          onChange={(e) => setValue("medicationsideeffects", e.target.value)}
          multiline
          minRows={3}
        />

        <FormControl>
          <InputLabel size="small" id="adherence-label">
            Adherence
          </InputLabel>
          <Select
            size="small"
            label="Adherence"
            labelId="adherence-label"
            value={patientData.get?.dm?.adherence}
            onChange={(e) => setValue("medicaladherence", e.target.value)}
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
