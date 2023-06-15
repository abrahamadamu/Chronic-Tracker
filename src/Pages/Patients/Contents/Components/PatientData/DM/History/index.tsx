import { useState, useEffect } from "react";
import { FormContainer } from "../styled";
import EditableList from "../Components/CustomMultiList";

import { DataFormat } from "..";

import {
  symptomsList,
  riskfactorsList,
  CategoryValuePair,
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
  const [symptoms, setSymptoms] = useState<CategoryValuePair[]>(
    getCategoryValuePair((data.get?.symptoms as string[]) ?? [])
  );
  const [riskfactors, setRiskFactors] = useState<CategoryValuePair[]>(
    getCategoryValuePair((data.get?.riskfactors as string[]) ?? [])
  );

  const dataStates: Record<string, CategoryValuePair[] | CodeTextPair[]> = {
    symptoms,
    riskfactors,
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
          title="Symptoms"
          choices={symptomsList}
          chosen={{ get: symptoms, set: setSymptoms }}
        />
        <EditableList
          title="Risk Factors"
          choices={riskfactorsList}
          chosen={{ get: riskfactors, set: setRiskFactors }}
          listType="simple"
        />
      </FormContainer>
    </>
  );
}

export default History;
