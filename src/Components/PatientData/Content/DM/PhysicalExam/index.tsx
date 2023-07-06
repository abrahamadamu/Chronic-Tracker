import { useState, useEffect, useContext } from "react";
import { TextField, Typography } from "@mui/material";

import { FormContainer } from "../styled";
import EditableList from "../Components/CustomMultiList";

import { DataFormat } from "..";

import { patientDataContext } from "../../../contexts";

import {
  CategoryValuePair,
  CodeTextPair,
  oralList,
  skinList,
  musculoskeletalList,
  physical_othersList,
} from "Data/data";
import { getCategoryValuePair, getCodeTextPair, getCodes } from "Data/datautil";

function History({ id }: { id: string }) {
  const patientData = useContext(patientDataContext);

  const [oral, setOral] = useState<CategoryValuePair[]>(
    getCategoryValuePair(patientData.get?.dm?.oral as string[])
  );
  const [skin, setSkin] = useState<CodeTextPair[]>(
    getCodeTextPair(patientData.get?.dm?.skin as string[])
  );
  const [musculoskeletal, setMusculoSkeletal] = useState<CodeTextPair[]>(
    getCodeTextPair(patientData.get?.dm?.musculoskeletal as string[])
  );
  const [physical_others, setPhysical_others] = useState<CategoryValuePair[]>(
    getCategoryValuePair(patientData.get?.dm?.physical_others as string[])
  );

  const dataStates: Record<string, CategoryValuePair[] | CodeTextPair[]> = {
    oral,
    skin,
    musculoskeletal,
    physical_others,
  };

  useEffect(() => {
    if (!patientData.get) return;

    let newData = patientData.get.dm;

    Object.keys(dataStates).forEach((stateName) => {
      const codes = getCodes(dataStates[stateName]);
      if (codes.length > 0) {
        newData = { ...newData, [stateName]: codes };
      } else {
        delete newData[stateName];
      }
    });
    patientData.set({ ...patientData.get, dm: { ...newData } });
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
        <EditableList
          title="Musculoskeletal Exam/ Foot exam"
          choices={musculoskeletalList}
          chosen={{ get: musculoskeletal, set: setMusculoSkeletal }}
          listType="simple"
        />

        <EditableList
          title="Others"
          choices={physical_othersList}
          chosen={{ get: physical_others, set: setPhysical_others }}
        />

        <TextField
          label="Dilated Eye Exam"
          size="small"
          value={getValue("dialatedeyeexam")}
          onChange={(e) => setValue("dialatedeyeexam", e.target.value)}
          multiline
          minRows={3}
        />
        <Typography sx={{ marginTop: "20px", gridColumn: "1/-1" }}>
          Neurologic
        </Typography>
        <TextField
          label="Motor"
          size="small"
          value={getValue("motor")}
          onChange={(e) => setValue("motor", e.target.value)}
          multiline
          minRows={3}
        />
        <TextField
          label="Sensory"
          size="small"
          value={getValue("sensory")}
          onChange={(e) => setValue("sensory", e.target.value)}
          multiline
          minRows={3}
        />
        <TextField
          label="Eye Exam"
          size="small"
          value={getValue("eyeexam")}
          onChange={(e) => setValue("eyeexam", e.target.value)}
          multiline
          minRows={3}
        />
        {/* <TextField
          label="Weight (Kg)"
          placeholder="Enter weight"
          value={patientData.get?.dm.weight}
          onChange={(e) => data.set({ ...patientData.get?.dm, weight: e.target.value })}
          type="number"
        /> */}
      </FormContainer>
    </>
  );
}

export default History;
