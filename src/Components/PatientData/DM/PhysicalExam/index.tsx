import { useState, useEffect, useContext } from "react";

import { FormContainer } from "../styled";
import EditableList from "../Components/CustomMultiList";

import { DataFormat } from "..";

import { patientDataContext } from "../../contexts";

import {
  CategoryValuePair,
  CodeTextPair,
  oralList,
  skinList,
  musculoskeletalList,
  neurologicList,
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
  const [neurologic, setNeurologic] = useState<CategoryValuePair[]>(
    getCategoryValuePair(patientData.get?.dm?.neurologic as string[])
  );

  const dataStates: Record<string, CategoryValuePair[] | CodeTextPair[]> = {
    oral,
    skin,
    musculoskeletal,
    neurologic,
  };

  useEffect(() => {
    let newData = patientData.get?.dm;
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
          title="Neurologic and Dilated eye exam"
          choices={neurologicList}
          chosen={{ get: neurologic, set: setNeurologic }}
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
