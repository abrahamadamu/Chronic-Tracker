import { useState, useEffect } from "react";

import { FormContainer } from "../styled";
import EditableList from "../Components/CustomMultiList";

import { DataFormat } from "..";

import {
  CategoryValuePair,
  CodeTextPair,
  oralList,
  skinList,
  musculoskeletalList,
  neurologicList,
} from "Data/data";
import { getCategoryValuePair, getCodeTextPair, getCodes } from "Data/datautil";

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  const [oral, setOral] = useState<CategoryValuePair[]>(
    getCategoryValuePair(data.get?.oral as string[])
  );
  const [skin, setSkin] = useState<CodeTextPair[]>(
    getCodeTextPair(data.get?.skin as string[])
  );
  const [musculoskeletal, setMusculoSkeletal] = useState<CodeTextPair[]>(
    getCodeTextPair(data.get?.musculoskeletal as string[])
  );
  const [neurologic, setNeurologic] = useState<CategoryValuePair[]>(
    getCategoryValuePair(data.get?.neurologic as string[])
  );

  const dataStates: Record<string, CategoryValuePair[] | CodeTextPair[]> = {
    oral,
    skin,
    musculoskeletal,
    neurologic,
  };

  useEffect(() => {
    let newData = data.get;
    Object.keys(dataStates).forEach((stateName) => {
      newData = { ...newData, [stateName]: getCodes(dataStates[stateName]) };
    });
    data.set({ ...newData });
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
          value={data.get.weight}
          onChange={(e) => data.set({ ...data.get, weight: e.target.value })}
          type="number"
        /> */}
      </FormContainer>
    </>
  );
}

export default History;
