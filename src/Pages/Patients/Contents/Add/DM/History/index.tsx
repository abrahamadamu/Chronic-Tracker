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
    (data.get?.symptoms as CategoryValuePair[]) ?? []
  );
  const [riskfactors, setRiskFactors] = useState<CategoryValuePair[]>(
    (data.get?.riskfactors as CategoryValuePair[]) ?? []
  );

  useEffect(() => {
    data.set({ ...data.get, symptoms, riskfactors });
  }, [symptoms, riskfactors]);

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
