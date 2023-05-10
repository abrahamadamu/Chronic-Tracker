import { useState, useEffect } from "react";
import { FormContainer } from "../styled";
import EditableList from "../Components/EditableList";

import { DataFormat } from "..";

import {
  symptomsList,
  riskfactorsList,
  CategoryValuePair,
  CodeTextPair,
} from "Data/data";

function History({
  data,
  id,
}: {
  id: string;
  data: { get: DataFormat; set: (v: DataFormat) => void };
}) {
  const [symptoms, setSymptoms] = useState<CategoryValuePair[]>([]);
  const [riskfactors, setRiskFactors] = useState<CategoryValuePair[]>([]);

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
